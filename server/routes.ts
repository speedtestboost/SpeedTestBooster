import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSpeedTestSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Speed test routes
  app.post("/api/speed-tests", async (req, res) => {
    try {
      const testData = insertSpeedTestSchema.parse(req.body);
      const test = await storage.createSpeedTest(testData);
      res.json(test);
    } catch (error) {
      res.status(400).json({ error: "Invalid test data" });
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
      // Get client IP and basic network info
      const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'Unknown';
      const userAgent = req.headers['user-agent'] || 'Unknown';
      
      res.json({
        ipAddress: clientIp,
        userAgent,
        connectionType: 'WiFi', // This would normally be detected
        serverLocation: 'New York, NY',
        isp: 'Unknown ISP'
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to get network info" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
