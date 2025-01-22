import express, { json } from "express";
import "dotenv/config";
import appartmentsRouter from "./routers/appartment.router";
import connectDB from "./db";

function createServer() {
  connectDB();

  const app = express();
  app.use(json());
  app.use("/appartments", appartmentsRouter);

  return app;
}

export default createServer;
