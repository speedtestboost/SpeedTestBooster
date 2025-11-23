// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  speedTests;
  currentUserId;
  currentTestId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.speedTests = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentTestId = 1;
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async createSpeedTest(insertTest) {
    const id = this.currentTestId++;
    const test = {
      ...insertTest,
      id,
      timestamp: /* @__PURE__ */ new Date()
    };
    this.speedTests.set(id, test);
    return test;
  }
  async getSpeedTests(sessionId, limit = 10) {
    const tests = Array.from(this.speedTests.values()).filter((test) => test.sessionId === sessionId).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, limit);
    return tests;
  }
  async deleteAllSpeedTests(sessionId) {
    const testsToDelete = Array.from(this.speedTests.entries()).filter(([_, test]) => test.sessionId === sessionId).map(([id, _]) => id);
    testsToDelete.forEach((id) => this.speedTests.delete(id));
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var speedTests = pgTable("speed_tests", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  downloadSpeed: real("download_speed").notNull(),
  uploadSpeed: real("upload_speed").notNull(),
  ping: real("ping").notNull(),
  jitter: real("jitter").notNull(),
  serverLocation: text("server_location").notNull(),
  connectionType: text("connection_type").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertSpeedTestSchema = createInsertSchema(speedTests).omit({
  id: true,
  timestamp: true
});

// server/routes.ts
async function registerRoutes(app2) {
  app2.post("/api/speed-tests", async (req, res) => {
    try {
      console.log("Received speed test data:", req.body);
      if (!req.body.sessionId) {
        req.body.sessionId = req.headers["x-session-id"] || "default";
      }
      const testData = insertSpeedTestSchema.parse(req.body);
      const test = await storage.createSpeedTest(testData);
      res.json(test);
    } catch (error) {
      console.error("Speed test validation error:", error);
      res.status(400).json({ error: "Invalid test data", details: error instanceof Error ? error.message : "Unknown error" });
    }
  });
  app2.get("/api/speed-tests", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 10;
      const sessionId = req.query.sessionId || req.headers["x-session-id"] || "default";
      const tests = await storage.getSpeedTests(sessionId, limit);
      res.json(tests);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve speed tests" });
    }
  });
  app2.delete("/api/speed-tests", async (req, res) => {
    try {
      const sessionId = req.query.sessionId || req.headers["x-session-id"] || "default";
      await storage.deleteAllSpeedTests(sessionId);
      res.json({ message: "All speed tests deleted" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete speed tests" });
    }
  });
  app2.get("/api/network-info", async (req, res) => {
    try {
      const forwardedFor = req.headers["x-forwarded-for"];
      const realIp = req.headers["x-real-ip"];
      const remoteAddress = req.connection.remoteAddress;
      const userAgent = req.headers["user-agent"] || "Unknown";
      let ipAddress = forwardedFor?.split(",")[0]?.trim() || realIp || remoteAddress || "127.0.0.1";
      if (ipAddress.includes(",")) {
        const ips = ipAddress.split(",").map((ip) => ip.trim());
        ipAddress = ips.find(
          (ip) => ip.match(/^\d+\.\d+\.\d+\.\d+$/) && !ip.startsWith("127.") && !ip.startsWith("10.") && !ip.startsWith("192.168.") && !ip.startsWith("172.")
        ) || ips.find((ip) => ip.match(/^\d+\.\d+\.\d+\.\d+$/)) || ips[0];
      }
      if (!ipAddress.match(/^\d+\.\d+\.\d+\.\d+$/)) {
        ipAddress = "127.0.0.1";
      }
      let locationInfo = {
        serverLocation: "Global Edge",
        isp: "Unknown ISP"
      };
      if (!ipAddress.startsWith("127.") && !ipAddress.startsWith("10.") && !ipAddress.startsWith("192.168.")) {
        try {
          const response = await fetch(`http://ip-api.com/json/${ipAddress}?fields=status,country,regionName,city,isp,org`);
          const data = await response.json();
          if (data.status === "success") {
            locationInfo = {
              serverLocation: `${data.city || "Unknown"}, ${data.regionName || "Unknown"}, ${data.country || "Unknown"}`,
              isp: data.isp || data.org || "Unknown ISP"
            };
          }
        } catch (error) {
          console.warn("Failed to fetch location info:", error);
        }
      }
      res.json({
        ipAddress,
        userAgent,
        connectionType: "WiFi",
        ...locationInfo
      });
    } catch (error) {
      console.error("Network info error:", error);
      res.json({
        ipAddress: "127.0.0.1",
        userAgent: req.headers["user-agent"] || "Unknown",
        connectionType: "WiFi",
        serverLocation: "Global Edge",
        isp: "Unknown ISP"
      });
    }
  });
  app2.get("/api/speed-test/download/:size", (req, res) => {
    const size = parseInt(req.params.size);
    const maxSize = 100 * 1024 * 1024;
    if (isNaN(size) || size <= 0 || size > maxSize) {
      return res.status(400).json({ error: "Invalid size parameter" });
    }
    console.log(`Serving speed test download: ${size} bytes`);
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Length", size.toString());
    res.setHeader("Access-Control-Allow-Origin", "*");
    const chunkSize = 1024 * 1024;
    const pregenChunk = Buffer.alloc(chunkSize);
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
      process.nextTick(sendChunk);
    };
    sendChunk();
  });
  app2.post("/api/speed-test/upload", (req, res) => {
    let bytesReceived = 0;
    const startTime = Date.now();
    console.log("Starting upload speed test");
    req.on("data", (chunk) => {
      bytesReceived += chunk.length;
    });
    req.on("end", () => {
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1e3;
      const mbps = bytesReceived * 8 / (duration * 1e3 * 1e3);
      console.log(`Upload test completed: ${bytesReceived} bytes in ${duration.toFixed(2)}s = ${mbps.toFixed(2)} Mbps`);
      res.json({
        bytesReceived,
        duration,
        mbps: Math.round(mbps * 100) / 100
      });
    });
    req.on("error", (error) => {
      console.error("Upload test error:", error);
      res.status(500).json({ error: "Upload test failed" });
    });
  });
  app2.get("/api/speed-test/ping", (req, res) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({ timestamp: Date.now() });
  });
  app2.post("/api/indexnow", async (req, res) => {
    try {
      const { urls } = req.body;
      if (!urls || !Array.isArray(urls) || urls.length === 0) {
        return res.status(400).json({ error: "URLs array is required" });
      }
      const indexNowPayload = {
        host: "speedtestboost.com",
        key: "a1b2c3d4e5f6",
        keyLocation: "https://speedtestboost.com/a1b2c3d4e5f6.txt",
        urlList: urls.map((url) => {
          if (url.startsWith("http://") || url.startsWith("https://")) {
            return url;
          }
          return `https://speedtestboost.com${url.startsWith("/") ? url : "/" + url}`;
        })
      };
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
var vite_config_default = defineConfig({
  plugins: [
    react()
    // Replit-specific plugins removed for local development
    // You can add them back when deploying to Replit if needed
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  const host = process.env.NODE_ENV === "development" ? "localhost" : "0.0.0.0";
  server.listen({
    port,
    host,
    reusePort: process.env.NODE_ENV !== "development"
  }, () => {
    log(`serving on ${host}:${port}`);
    log(`Environment: ${process.env.NODE_ENV || "development"}`);
    log(`Database: ${process.env.DATABASE_URL ? "Connected" : "Not configured"}`);
  });
})();
var index_default = app;
export {
  index_default as default
};
