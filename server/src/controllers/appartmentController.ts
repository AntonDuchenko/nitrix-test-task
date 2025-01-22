import { Request, Response } from "express";
import {
  getAllApartments,
  createAppartmnent,
  getOneAppartment,
  deleteAppartmentById,
  updateAppartmentById,
} from "../services/appartmentsService";

export const getAppartments = async (_: Request, res: Response) => {
  try {
    const appartments = await getAllApartments();

    res.status(200).send(appartments);
  } catch (error) {
    handleError(error, res);
  }
};

export const createAppartment = async (req: Request, res: Response) => {
  try {
    const newAppartment = await createAppartmnent(req.body);

    res.status(201).send(newAppartment);
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteAppartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const appart = await getOneAppartment(id);

    if (!appart) {
      res.status(404).json({ error: "Appartment not found" });
    }

    const deletedAppartment = await deleteAppartmentById(id);

    res.status(200).send(deletedAppartment);
  } catch (error) {
    handleError(error, res);
  }
};

export const updateAppartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const appart = await getOneAppartment(id);

    if (!appart) {
      res.status(404).json({ error: "Appartment not found" });
    }

    const updatedAppartment = await updateAppartmentById(id, req.body);

    res.status(200).send(updatedAppartment);
  } catch (error) {
    handleError(error, res);
  }
};

const handleError = (error: unknown, res: Response) => {
  if (error instanceof Error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(500).json({ error: "Unknown error" });
  }
};
