import { z } from "zod";

export const updateRoleSchema = z.object({
  role: z.enum(["ADMIN", "ANALYST", "VIEWER"]),
});

export const updateStatusSchema = z.object({
  is_active: z.boolean(),
});