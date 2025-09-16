import { z } from "zod";

const createProductFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  sku: z.string().min(1, "Sku is required"),
  price: z.string().min(1, "Price is required"),
  stock: z.string().min(1, "Stock is required"),
});

const createProductPayloadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  sku: z.string().min(1, "Sku is required"),
  price: z.string().min(1, "Price is required"),
  stock: z.string().min(1, "Stock is required"),
});

type CreateProductPayload = z.infer<typeof createProductPayloadSchema>;
type CreateProductFormPayload = z.infer<typeof createProductFormSchema>;

export {
  createProductFormSchema,
  createProductPayloadSchema,
  type CreateProductFormPayload,
  type CreateProductPayload,
};
