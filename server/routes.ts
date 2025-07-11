import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSpeedTestSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Speed test routes
  app.post("/api/speed-tests", async (req, res) => {
    try {
      console.log("Received speed test data:", req.body);
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
      const tests = await storage.getSpeedTests(limit);
      res.json(tests);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve speed tests" });
    }
  });

  app.delete("/api/speed-tests", async (req, res) => {
    try {
      await storage.deleteAllSpeedTests();
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

  const httpServer = createServer(app);
  return httpServer;
}
