import { z } from "zod";

const editProductPayloadSchema = z.object({
  id: z.preprocess(
    (value) => (value === "" ? undefined : Number(value)),
    z.number().min(1, { message: "ID must be a positive number" })
  ),
  name: z.string().min(1, { message: "Name is required" }),
  sku: z.string().min(1, { message: "SKU is required" }),
  price: z.preprocess(
    (value) => (value === "" ? undefined : Number(value)),
    z.number().min(0, { message: "Price must be a positive number" })
  ),
  stock: z.preprocess(
    (value) => (value === "" ? undefined : Number(value)),
    z.number().int().min(0, { message: "Stock must be a positive integer" })
  ),
});

const editProductFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  sku: z.string().min(1, { message: "SKU is required" }),
  price: z.number().min(0, { message: "Price must be a positive number" }),
  stock: z.number().int().min(0, { message: "Stock must be a positive integer" }),
});


type EditProductPayload = z.infer<typeof editProductPayloadSchema>;
type EditProductFormPayload = z.infer<typeof editProductFormSchema>;

export {
  editProductPayloadSchema,
  editProductFormSchema,
  type EditProductPayload,
  type EditProductFormPayload,
};
