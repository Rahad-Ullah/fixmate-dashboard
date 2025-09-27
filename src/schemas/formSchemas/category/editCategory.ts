import { z } from "zod";

export const editCategoryFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .optional(),
});
