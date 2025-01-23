import express, { json } from "express";
import "dotenv/config";
import cors from "cors";
import appartmentsRouter from "./routers/appartment.router";
import connectDB from "./db";

function createServer() {
  connectDB();

  const app = express();
  app.use(json());
  app.use(cors());
  app.use("/appartments", appartmentsRouter);

  return app;
}

export default createServer;
