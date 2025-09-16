import { z } from "zod";

const createProductFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  sku: z.string().min(1, "Sku is required"),
  price: z.number().min(1, "Price must be a positive number"),
  stock: z.number().min(0, "Stock must be a positive number"),
  // createdAt: z.string().min(1, "Created At is required"),
});

const createProductPayloadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  sku: z.string().min(1, "Sku is required"),
  price: z.preprocess(
    (value) => (value === "" ? undefined : Number(value)),
    z.number().min(1, { message: "Price must be a positive number" })
  ),
  stock: z.preprocess(
    (value) => (value === "" ? undefined : Number(value)),
    z.number().min(0, { message: "Stock must be a positive number" })
  ),
  // createdAt: z.string().min(1, "Created At is required"),
});

type CreateProductPayload = z.infer<typeof createProductPayloadSchema>;
type CreateProductFormPayload = z.infer<typeof createProductFormSchema>;

export {
  createProductFormSchema,
  createProductPayloadSchema,
  type CreateProductFormPayload,
  type CreateProductPayload,
};
