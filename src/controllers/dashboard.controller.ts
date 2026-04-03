import { Request, Response } from "express";
import {
  getSummary,
  getCategoryBreakdown,
  getMonthlyTrends,
  getRecentActivity,
} from "../services/dashboard.service";

export const summary = async (req: Request, res: Response) => {
  try {
    const data = await getSummary();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const categories = async (req: Request, res: Response) => {
  try {
    const data = await getCategoryBreakdown();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const trends = async (req: Request, res: Response) => {
  try {
    const data = await getMonthlyTrends();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const recent = async (req: Request, res: Response) => {
  try {
    const data = await getRecentActivity();
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};