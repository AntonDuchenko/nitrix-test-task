import { Request, Response } from "express";
import {
  getAllApartments,
  createAppartmnent,
  getOneAppartment,
  deleteAppartmentById,
  updateAppartmentById,
} from "../services/appartment.service";
import codeStatuses from "../constants";
import { uploadToS3 } from "../services/upload.service";

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
    const { file, body } = req;

    if (!file) {
      return;
    }

    const photo_url = (await uploadToS3(
      file,
      process.env.AWS_S3_BUCKET_NAME || "",
    )) as AWS.S3.ManagedUpload.SendData;

    const newAppartment = await createAppartmnent({
      ...body,
      photo_url: photo_url.Location,
    });

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
