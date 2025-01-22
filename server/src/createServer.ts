import express, { json } from "express";
import appartmentsRouter from "./routers/appartmentsRouter";

function createServer() {
  const app = express();
  app.use(json());
  app.use("/appartments", appartmentsRouter);

  return app;
}

export default createServer;
