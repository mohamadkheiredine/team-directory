"use server";

import { FormState } from "@/app/models/form-state";
import { redirect } from "next/navigation";
import { createEmployeePayloadSchema } from "@/app/models/employees/create";
import { createEmployee, deleteEmployee, editEmployee, getLatestId } from "../../data-layer/employees";
import { Employee } from "@/app/models/employees/read";
import { editEmployeePayloadSchema } from "@/app/models/employees/edit";
import { deleteEmployeePayloadSchema } from "@/app/models/employees/delete";

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

export async function editEmployeeAction(
  _: FormState,
  data: FormData
): Promise<FormState> {
  try {
    const formData = Object.fromEntries(data);

    // Validate the incoming form data
    const parsed = editEmployeePayloadSchema.safeParse(formData);

    if (!parsed.success) {
      const fields: Record<string, string> = {};
      for (const key of Object.keys(formData)) {
        fields[key] = JSON.stringify(formData[key]);
      }
      return {
        message: "Invalid form data",
        fields,
        issues: parsed.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`),
      };
    }

    // Update the employee
    await editEmployee(parsed.data.id, {
      ...parsed.data
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    return { success: false, message: "Failed to update employee.", issues: [error instanceof Error ? error.message : String(error)] };
  }

  redirect('/employees');
}


export async function deleteEmployeeAction(
  _: FormState,
  data: FormData
): Promise<FormState> {
  try {
    const formData = Object.fromEntries(data);
    const parsed = deleteEmployeePayloadSchema.safeParse(formData);

    if (!parsed.success) {
      const fields: Record<string, string> = {};
      for (const key of Object.keys(formData)) {
        fields[key] = JSON.stringify(formData[key]);
      }
      return {
        message: "Invalid form data",
        fields,
        issues: parsed.error.issues.map((issue) => issue.message),
      };
    }

    // Delete the employee
    await deleteEmployee(parsed.data.id);

  } catch (error) {
    console.error('Error deleting employee:', error);
    return { success: false, message: "Failed to delete employee.", issues: [error instanceof Error ? error.message : String(error)] };
  }

  redirect('/employees');
}
