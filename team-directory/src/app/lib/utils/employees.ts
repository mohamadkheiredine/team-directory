import { Employee } from "@/app/models/employees/read";
import fs from "fs";
import path from "path";
import { checkAuth } from "../../../../middleware";

const filePath = path.join(process.cwd(), "data", "employees.json");

export function getAllEmployees() {
  try {
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const employees = JSON.parse(jsonData);
    return employees;
  } catch (error) {
    console.error("Error reading employees.json:", error);
    return [];
  }
}

export function createEmployee(employee: Employee, req: Request) {
  // Read the existing employees
  if (!checkAuth(req)) {
    throw new Error("Unauthorized");
  }
  
  let employees: Employee[] = [];
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf-8');
    employees = JSON.parse(data) as Employee[];
  }
  employees.push(employee);

  // Write back to the JSON file
  fs.writeFileSync(filePath, JSON.stringify(employees, null, 2), 'utf-8');
}

export function getLatestId(): number {
  if (!fs.existsSync(filePath)) {
    return 0; // No employees yet
  }

  const data = fs.readFileSync(filePath, 'utf-8');
  const employees = JSON.parse(data) as { id: number }[];

  if (employees.length === 0) return 0;

  // Return the highest ID
  return Math.max(...employees.map(e => e.id));
}