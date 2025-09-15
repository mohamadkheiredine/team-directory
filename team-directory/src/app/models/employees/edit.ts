import { z } from "zod";

const editEmployeePayloadSchema = z.object({
  id: z.preprocess(
    (value) => (value === "" ? undefined : Number(value)),
    z.number().min(1, { message: "ID must be a positive number" })
  ),
  name: z.string().min(1, { message: "Name is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  slug: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  status: z.enum(["active", "inactive"], {
    message: "Status must be either 'active' or 'inactive'",
  }),
});

const editEmployeeFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  status: z.enum(["active", "inactive"], {
    message: "Status must be either 'active' or 'inactive'",
  }),
});

type EditEmployeePayload = z.infer<typeof editEmployeePayloadSchema>;
type EditEmployeeFormPayload = z.infer<typeof editEmployeeFormSchema>;

export {
  editEmployeePayloadSchema,
  editEmployeeFormSchema,
  type EditEmployeePayload,
  type EditEmployeeFormPayload,
};
