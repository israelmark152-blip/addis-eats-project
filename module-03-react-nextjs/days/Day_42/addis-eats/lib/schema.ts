import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^(09|07)\d{8}$/, "Enter a valid Ethiopian phone number (e.g., 0912345678)"),
});

export type OrderInput = z.infer<typeof orderSchema>;