import { Router } from "express";
import {
  create,
  getAll,
  update,
  remove,
} from "../controllers/record.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
  createRecordSchema,
  updateRecordSchema,
} from "../validators/record.validator";

const router = Router();

// Create → ADMIN only
router.post(
  "/",
  authenticate,
  authorizeRoles("ADMIN"),
  validate(createRecordSchema),
  create
);

// Read → ANALYST + ADMIN
router.get(
  "/",
  authenticate,
  authorizeRoles("ADMIN", "ANALYST"),
  getAll
);

// Update → ADMIN only
router.patch(
  "/:id",
  authenticate,
  authorizeRoles("ADMIN"),
  validate(updateRecordSchema),
  update
);

// Delete → ADMIN only
router.delete(
  "/:id",
  authenticate,
  authorizeRoles("ADMIN"),
  remove
);

export default router;