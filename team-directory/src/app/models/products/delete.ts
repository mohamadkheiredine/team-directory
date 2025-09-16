import { z } from "zod";

const deleteProductPayloadSchema = z.object({
  id: z.preprocess(
    (value) => (value === "" ? undefined : Number(value)),
    z.number().min(1, { message: "ID must be a positive number" })
  ),
});

type DeleteProductPayload = z.infer<typeof deleteProductPayloadSchema>;

export {
  deleteProductPayloadSchema,
  type DeleteProductPayload,
}