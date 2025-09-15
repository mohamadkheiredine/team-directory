import { z } from "zod";

const deleteEmployeePayloadSchema = z.object({
  id: z.preprocess(
    (value) => (value === "" ? undefined : Number(value)),
    z.number().min(1, { message: "ID must be a positive number" })
  ),
});

type DeleteEmployeePayload = z.infer<typeof deleteEmployeePayloadSchema>;

export {
  deleteEmployeePayloadSchema,
  type DeleteEmployeePayload,
}