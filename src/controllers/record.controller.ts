import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} from "../services/record.service";

export const create = async (req: AuthRequest, res: Response) => {
  try {
    const record = await createRecord(req.body, req.user!.userId);
    res.status(201).json(record);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getAll = async (req: AuthRequest, res: Response) => {
  try {
    const records = await getRecords(req.query);
    res.json(records);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const update = async (req: AuthRequest, res: Response) => {
  try {
    const record = await updateRecord(req.params.id, req.body);
    res.json(record);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const remove = async (req: AuthRequest, res: Response) => {
  try {
    await deleteRecord(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};