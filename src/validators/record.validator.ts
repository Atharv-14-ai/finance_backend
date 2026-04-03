import { z } from "zod";

export const createRecordSchema = z.object({
  amount: z.number().positive(),
  type: z.enum(["INCOME", "EXPENSE"]),
  category: z.string().min(1),
  date: z.string(),
  notes: z.string().optional(),
});

export const updateRecordSchema = createRecordSchema.partial();