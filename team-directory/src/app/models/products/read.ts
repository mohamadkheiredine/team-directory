import z from "zod";

const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  sku: z.string(),
  price: z.string(),
  stock: z.string(),
  createdAt: z.string()
})

type Product = z.infer<typeof productSchema>;

export {
  productSchema,
  type Product
}