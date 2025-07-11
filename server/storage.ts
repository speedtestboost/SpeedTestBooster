import { users, speedTests, type User, type InsertUser, type SpeedTest, type InsertSpeedTest } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Speed test methods
  createSpeedTest(test: InsertSpeedTest): Promise<SpeedTest>;
  getSpeedTests(limit?: number): Promise<SpeedTest[]>;
  deleteAllSpeedTests(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private speedTests: Map<number, SpeedTest>;
  private currentUserId: number;
  private currentTestId: number;

  constructor() {
    this.users = new Map();
    this.speedTests = new Map();
    this.currentUserId = 1;
    this.currentTestId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createSpeedTest(insertTest: InsertSpeedTest): Promise<SpeedTest> {
    const id = this.currentTestId++;
    const test: SpeedTest = { 
      ...insertTest, 
      id, 
      timestamp: new Date() 
    };
    this.speedTests.set(id, test);
    return test;
  }

  async getSpeedTests(limit: number = 10): Promise<SpeedTest[]> {
    const tests = Array.from(this.speedTests.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
    return tests;
  }

  async deleteAllSpeedTests(): Promise<void> {
    this.speedTests.clear();
  }
}

export const storage = new MemStorage();
