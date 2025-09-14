import { z } from "zod";

const employeeStatusEnum = z.enum(["active", "inactive"]);

export const employeeSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  title: z.string(),
  email: z.string().email(),
  status: employeeStatusEnum,
});

type EmployeeStatus = z.infer<typeof employeeStatusEnum>;
const EMPLOYEE_STATUSES: EmployeeStatus[] = employeeStatusEnum.options;

export { EMPLOYEE_STATUSES };

export type Employee = z.infer<typeof employeeSchema>;