import { Request, Response } from "express";
import {
  getAllUsers,
  updateUserRole,
  updateUserStatus,
} from "../services/user.service";

export const getUsers = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.json(users);
};

export const changeRole = async (req: Request, res: Response) => {
  const user = await updateUserRole(req.params.id, req.body.role);
  res.json(user);
};

export const changeStatus = async (req: Request, res: Response) => {
  const user = await updateUserStatus(
    req.params.id,
    req.body.is_active
  );
  res.json(user);
};