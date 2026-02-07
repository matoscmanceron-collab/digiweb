import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import contactRouter from "./routes/contact";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Contact form route
  app.use('/api', contactRouter);

  return httpServer;
}
