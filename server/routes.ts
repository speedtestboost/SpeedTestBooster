import type { Express } from "express";
import { createServer, type Server } from "http";
import fs from "fs";
import path from "path";
import { storage } from "./storage";
import { insertSpeedTestSchema } from "@shared/schema";
import { z } from "zod";

/** Static SEO hub at client/public/site-index.html — must not fall through to SPA catch-all. */
function resolveSiteIndexHtmlPath(): string | undefined {
  const base = import.meta.dirname;
  const candidates = [
    path.join(base, "public", "site-index.html"),
    path.join(base, "..", "client", "public", "site-index.html"),
    path.join(base, "..", "dist", "public", "site-index.html"),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return undefined;
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.get(["/site-index", "/site-index/"], (_req, res, next) => {
    const file = resolveSiteIndexHtmlPath();
    if (!file) return next();
    res.type("html").sendFile(file, (err) => {
      if (err) next(err);
    });
  });

  // Speed test routes
  app.post("/api/speed-tests", async (req, res) => {
    try {
      console.log("Received speed test data:", req.body);
      
      // Ensure sessionId is present from header if not in body
      if (!req.body.sessionId) {
        req.body.sessionId = req.headers['x-session-id'] || 'default';
      }
      
      const testData = insertSpeedTestSchema.parse(req.body);
      const test = await storage.createSpeedTest(testData);
      res.json(test);
    } catch (error) {
      console.error("Speed test validation error:", error);
      res.status(400).json({ error: "Invalid test data", details: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  app.get("/api/speed-tests", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const sessionId = req.query.sessionId as string || req.headers['x-session-id'] as string || 'default';
      const tests = await storage.getSpeedTests(sessionId, limit);
      res.json(tests);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve speed tests" });
    }
  });

  app.delete("/api/speed-tests", async (req, res) => {
    try {
      const sessionId = req.query.sessionId as string || req.headers['x-session-id'] as string || 'default';
      await storage.deleteAllSpeedTests(sessionId);
      res.json({ message: "All speed tests deleted" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete speed tests" });
    }
  });

  // Network info endpoint
  app.get("/api/network-info", async (req, res) => {
    try {
      // Get client IP from various headers
      const forwardedFor = req.headers['x-forwarded-for'] as string;
      const realIp = req.headers['x-real-ip'] as string;
      const remoteAddress = req.connection.remoteAddress;
      const userAgent = req.headers['user-agent'] || 'Unknown';
      
      // Extract IPv4 address only
      let ipAddress = forwardedFor?.split(',')[0]?.trim() || realIp || remoteAddress || "127.0.0.1";

      if (ipAddress.startsWith("::ffff:")) {
        ipAddress = ipAddress.slice(7);
      }
      
      // Filter out IPv6 and keep only first public IPv4
      if (ipAddress.includes(',')) {
        const ips = ipAddress.split(',').map(ip => ip.trim());
        ipAddress = ips.find(ip => 
          ip.match(/^\d+\.\d+\.\d+\.\d+$/) && 
          !ip.startsWith('127.') && 
          !ip.startsWith('10.') && 
          !ip.startsWith('192.168.') && 
          !ip.startsWith('172.')
        ) || ips.find(ip => ip.match(/^\d+\.\d+\.\d+\.\d+$/)) || ips[0];
      }
      
      // Ensure IPv4 format
      if (!ipAddress.match(/^\d+\.\d+\.\d+\.\d+$/)) {
        ipAddress = "127.0.0.1";
      }
      
      // Get location and ISP info from IP
      let locationInfo = {
        serverLocation: "Global Edge",
        isp: "Unknown ISP"
      };
      
      // Try to get real location info for non-local IPs
      if (!ipAddress.startsWith('127.') && !ipAddress.startsWith('10.') && !ipAddress.startsWith('192.168.')) {
        try {
          const response = await fetch(`http://ip-api.com/json/${ipAddress}?fields=status,country,regionName,city,isp,org`);
          const data = await response.json();
          
          if (data.status === 'success') {
            locationInfo = {
              serverLocation: `${data.city || 'Unknown'}, ${data.regionName || 'Unknown'}, ${data.country || 'Unknown'}`,
              isp: data.isp || data.org || 'Unknown ISP'
            };
          }
        } catch (error) {
          console.warn('Failed to fetch location info:', error);
        }
      }
      
      res.json({
        ipAddress: ipAddress,
        userAgent,
        connectionType: 'WiFi',
        ...locationInfo
      });
    } catch (error) {
      console.error('Network info error:', error);
      res.json({
        ipAddress: "127.0.0.1",
        userAgent: req.headers['user-agent'] || 'Unknown',
        connectionType: 'WiFi',
        serverLocation: "Global Edge",
        isp: "Unknown ISP"
      });
    }
  });

  // Speed test download endpoint - serves random data for testing
  app.get("/api/speed-test/download/:size", (req, res) => {
    const size = parseInt(req.params.size);
    const maxSize = 100 * 1024 * 1024; // 100MB max
    
    if (isNaN(size) || size <= 0 || size > maxSize) {
      return res.status(400).json({ error: "Invalid size parameter" });
    }
    
    console.log(`Serving speed test download: ${size} bytes`);
    
    // Set headers for no caching and proper content type
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Length', size.toString());
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Use much larger chunks for maximum throughput
    const chunkSize = 1024 * 1024; // 1MB chunks for maximum bandwidth
    const pregenChunk = Buffer.alloc(chunkSize);
    
    // Fill with simple pattern data (fastest possible)
    for (let i = 0; i < chunkSize; i++) {
      pregenChunk[i] = i % 256;
    }
    
    let bytesWritten = 0;
    
    const sendChunk = () => {
      const remainingBytes = size - bytesWritten;
      if (remainingBytes <= 0) {
        res.end();
        return;
      }
      
      const currentChunkSize = Math.min(chunkSize, remainingBytes);
      const chunk = currentChunkSize === chunkSize ? pregenChunk : pregenChunk.slice(0, currentChunkSize);
      
      res.write(chunk);
      bytesWritten += currentChunkSize;
      
      // Send next chunk immediately for maximum throughput
      process.nextTick(sendChunk);
    };
    
    sendChunk();
  });

  // Speed test upload endpoint - receives data for testing
  app.post("/api/speed-test/upload", (req, res) => {
    let bytesReceived = 0;
    const startTime = Date.now();
    
    console.log("Starting upload speed test");
    
    req.on('data', (chunk) => {
      bytesReceived += chunk.length;
    });
    
    req.on('end', () => {
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000;
      const mbps = (bytesReceived * 8) / (duration * 1000 * 1000);
      
      console.log(`Upload test completed: ${bytesReceived} bytes in ${duration.toFixed(2)}s = ${mbps.toFixed(2)} Mbps`);
      
      res.json({
        bytesReceived,
        duration,
        mbps: Math.round(mbps * 100) / 100
      });
    });
    
    req.on('error', (error) => {
      console.error('Upload test error:', error);
      res.status(500).json({ error: 'Upload test failed' });
    });
  });

  // Ping test endpoint - simple response for latency measurement
  app.get("/api/speed-test/ping", (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({ timestamp: Date.now() });
  });

  // IndexNow endpoint for Bing real-time indexing
  app.post("/api/indexnow", async (req, res) => {
    try {
      const { urls } = req.body;
      
      if (!urls || !Array.isArray(urls) || urls.length === 0) {
        return res.status(400).json({ error: "URLs array is required" });
      }

      const indexNowPayload = {
        host: "speedtestboost.com",
        key: "a1b2c3d4e5f6",
        keyLocation: "https://speedtestboost.com/a1b2c3d4e5f6.txt",
        urlList: urls.map(url => {
          // If URL is already absolute, use it as-is; otherwise prepend domain
          if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
          }
          return `https://speedtestboost.com${url.startsWith('/') ? url : '/' + url}`;
        })
      };

      // Submit to Bing IndexNow API
      const response = await fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(indexNowPayload)
      });

      if (response.ok || response.status === 202) {
        console.log("IndexNow submission successful for URLs:", urls);
        res.json({ success: true, message: "URLs submitted to IndexNow", urls });
      } else {
        console.error("IndexNow submission failed:", response.status, response.statusText);
        res.status(response.status).json({ 
          error: "IndexNow submission failed", 
          status: response.status 
        });
      }
    } catch (error) {
      console.error("IndexNow error:", error);
      res.status(500).json({ error: "Failed to submit to IndexNow" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
