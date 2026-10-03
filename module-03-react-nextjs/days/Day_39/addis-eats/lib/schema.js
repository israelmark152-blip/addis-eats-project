import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^(09|\+2519)\d{8}$/, "Use valid Ethiopian phone (09... or +2519...)"),
  dishId: z.string().min(1, "Dish ID is required")
});