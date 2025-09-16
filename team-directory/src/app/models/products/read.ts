import z from "zod";

const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  sku: z.string(),
  price: z.number().min(0),
  stock: z.number().min(0),
  createdAt: z.string()
})

type Product = z.infer<typeof productSchema>;

export {
  productSchema,
  type Product
}