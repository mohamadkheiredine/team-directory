import { z } from "zod";

const createEmployeeFormSchema = z.object({
  name: z.string(),
  title: z.string(),
  email: z.string().email(),
  status: z.enum(["active", "inactive"]),
});

const createEmployeePayloadSchema = z.object({
  name: z.string(),
  slug: z.string(),
  title: z.string(),
  email: z.string().email(),
  status: z.enum(["active", "inactive"]),
});

type CreateEmployeePayload = z.infer<typeof createEmployeePayloadSchema>;
type CreateEmployeeFormPayload = z.infer<typeof createEmployeeFormSchema>;

export {
  createEmployeeFormSchema,
  createEmployeePayloadSchema,
  type CreateEmployeeFormPayload,
  type CreateEmployeePayload,
};