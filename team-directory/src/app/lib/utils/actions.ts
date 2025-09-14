"use server";

import { FormState } from "@/app/models/form-state";
import { redirect } from "next/navigation";
import { createEmployeePayloadSchema } from "@/app/models/employees/create";
import { createEmployee, getLatestId } from "./employees";
import { Employee } from "@/app/models/employees/read";

export async function createEmployeeAction(
  _: FormState,
  data: FormData
): Promise<FormState> {
  try {
    const formData = Object.fromEntries(data);

    // Validate the incoming form data
    const parsed = createEmployeePayloadSchema.safeParse(formData);

    if (!parsed.success) {
      const fields: Record<string, string> = {};
      for (const key of Object.keys(formData)) {
        fields[key] = JSON.stringify(formData[key]);
      }
      return {
        message: "Invalid form data",
        fields,
        issues: parsed.error.issues.map(
          (issue) => `${issue.path.join(".")}: ${issue.message}`
        ),
      };
    }

    const latestId = getLatestId();
    const newEmployee: Employee = {  id: latestId + 1, ...parsed.data };
    createEmployee(newEmployee);
  } catch (error) {
    console.error("Error creating employee:", error);
    return {
      success: false,
      message: "Failed to create employee.",
      issues: [error instanceof Error ? error.message : String(error)],
    };
  }

  redirect("/employees");
}
