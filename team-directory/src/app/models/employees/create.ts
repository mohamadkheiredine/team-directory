import { z } from "zod";

const createEmployeeFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  email: z.string().email("Please enter a valid email address"),
  status: z.enum(["active", "inactive"], {
    error: "Status must be either 'active' or 'inactive'",
  }),
});

const createEmployeePayloadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  title: z.string().min(1, "Title is required"),
  email: z.string().email("Please enter a valid email address"),
  status: z.enum(["active", "inactive"], {
    error: "Status must be either 'active' or 'inactive'",
  }),
});

type CreateEmployeePayload = z.infer<typeof createEmployeePayloadSchema>;
type CreateEmployeeFormPayload = z.infer<typeof createEmployeeFormSchema>;

export {
  createEmployeeFormSchema,
  createEmployeePayloadSchema,
  type CreateEmployeeFormPayload,
  type CreateEmployeePayload,
};
