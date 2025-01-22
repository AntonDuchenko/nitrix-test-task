import express from "express";
import {
  getAppartments,
  createAppartment,
  deleteAppartment,
  updateAppartment,
} from "../controllers/appartment.controller";

const appartmentsRouter = express.Router();

appartmentsRouter.get("/", getAppartments);
appartmentsRouter.post("/", createAppartment);
appartmentsRouter.delete("/:id", deleteAppartment);
appartmentsRouter.put("/:id", updateAppartment);

export default appartmentsRouter;
