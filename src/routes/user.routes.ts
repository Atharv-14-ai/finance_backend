import { Router } from "express";
import {
  getUsers,
  changeRole,
  changeStatus,
} from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
  updateRoleSchema,
  updateStatusSchema,
} from "../validators/user.validator";

const router = Router();

// Admin only
router.get("/", authenticate, authorizeRoles("ADMIN"), getUsers);

router.patch(
  "/:id/role",
  authenticate,
  authorizeRoles("ADMIN"),
  validate(updateRoleSchema),
  changeRole
);

router.patch(
  "/:id/status",
  authenticate,
  authorizeRoles("ADMIN"),
  validate(updateStatusSchema),
  changeStatus
);

export default router;