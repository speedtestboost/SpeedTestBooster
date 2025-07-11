import { pgTable, text, serial, integer, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const speedTests = pgTable("speed_tests", {
  id: serial("id").primaryKey(),
  downloadSpeed: real("download_speed").notNull(),
  uploadSpeed: real("upload_speed").notNull(),
  ping: real("ping").notNull(),
  jitter: real("jitter").notNull(),
  serverLocation: text("server_location").notNull(),
  connectionType: text("connection_type").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSpeedTestSchema = createInsertSchema(speedTests).omit({
  id: true,
  timestamp: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type SpeedTest = typeof speedTests.$inferSelect;
export type InsertSpeedTest = z.infer<typeof insertSpeedTestSchema>;
