import { Router } from "express";
import {
  summary,
  categories,
  trends,
  recent,
} from "../controllers/dashboard.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

// Analyst + Admin access
router.get("/summary", authenticate, authorizeRoles("ADMIN", "ANALYST"), summary);
router.get("/categories", authenticate, authorizeRoles("ADMIN", "ANALYST"), categories);
router.get("/trends", authenticate, authorizeRoles("ADMIN", "ANALYST"), trends);
router.get("/recent", authenticate, authorizeRoles("ADMIN", "ANALYST"), recent);

export default router;