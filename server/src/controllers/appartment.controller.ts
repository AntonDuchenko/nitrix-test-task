import { Request, Response } from "express";
import {
  getAllApartments,
  createAppartmnent,
  getOneAppartment,
  deleteAppartmentById,
  updateAppartmentById,
} from "../services/appartment.service";
import codeStatuses from "../constants";

export const getAppartments = async (_: Request, res: Response) => {
  try {
    const appartments = await getAllApartments();

    res.status(codeStatuses.SUCCESS_CODE_STATUS).send(appartments);
  } catch (error) {
    handleError(error, res);
  }
};

export const createAppartment = async (req: Request, res: Response) => {
  try {
    const newAppartment = await createAppartmnent(req.body);

    res.status(codeStatuses.CREATED_CODE_STATUS).send(newAppartment);
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteAppartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const appart = await getOneAppartment(id);

    if (!appart) {
      res.status(codeStatuses.NOT_FOUND_CODE_STATUS).json({ error: "Appartment not found" });
    }

    const deletedAppartment = await deleteAppartmentById(id);

    res.status(codeStatuses.SUCCESS_CODE_STATUS).send(deletedAppartment);
  } catch (error) {
    handleError(error, res);
  }
};

export const updateAppartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const appart = await getOneAppartment(id);

    if (!appart) {
      res.status(codeStatuses.NOT_FOUND_CODE_STATUS).json({ error: "Appartment not found" });
    }

    const updatedAppartment = await updateAppartmentById(id, req.body);

    res.status(codeStatuses.SUCCESS_CODE_STATUS).send(updatedAppartment);
  } catch (error) {
    handleError(error, res);
  }
};

const handleError = (error: unknown, res: Response) => {
  if (error instanceof Error) {
    res.status(codeStatuses.INTERNAL_SERVER_ERROR_CODE_STATUS).json({ error: error.message });
  } else {
    res.status(codeStatuses.INTERNAL_SERVER_ERROR_CODE_STATUS).json({ error: "Unknown error" });
  }
};
