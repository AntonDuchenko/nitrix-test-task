import appartment from "../models/appartment";
import { AppartmentData } from "../types";

export const getAllApartments = async () => {
  return await appartment.find();
};

export const getOneAppartment = async (id: string) => {
  return await appartment.findById(id);
};

export const createAppartmnent = async (data: AppartmentData) => {
  return await appartment.create(data);
};

export const deleteAppartmentById = async (id: string) => {
  return await appartment.findByIdAndDelete(id);
};

export const updateAppartmentById = async (id: string, data: AppartmentData) => {
  return await appartment.findByIdAndUpdate(id, data, { new: true });
};
