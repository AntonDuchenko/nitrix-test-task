import express from "express";
import {
  getAppartments,
  createAppartment,
  deleteAppartment,
  updateAppartment,
} from "../controllers/appartment.controller";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const appartmentsRouter = express.Router();

appartmentsRouter.get("/", getAppartments);
appartmentsRouter.post("/", upload.single("image"), createAppartment);
appartmentsRouter.delete("/:id", deleteAppartment);
appartmentsRouter.put("/:id", upload.single("image_url"), updateAppartment);

export default appartmentsRouter;
