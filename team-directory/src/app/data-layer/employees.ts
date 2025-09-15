import { Employee } from "@/app/models/employees/read";
import fs from "fs";
import path from "path";

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

export function createEmployee(employee: Employee) {
  // Read the existing employees  
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

export function fetchEmployeeById(id: number): Employee | null {
  try {
    if (!fs.existsSync(filePath)) return null;

    const jsonData = fs.readFileSync(filePath, "utf-8");
    const employees: Employee[] = JSON.parse(jsonData);

    const employee = employees.find(emp => Number(emp.id) === Number(id));
    return employee || null;
  } catch (error) {
    console.error("Error reading employees.json:", error);
    return null;
  }
}

export function editEmployee(id: number, updatedData: Partial<Employee>): Employee | undefined {
  try {
    if (!fs.existsSync(filePath)) return undefined;

    const jsonData = fs.readFileSync(filePath, "utf-8");
    const employees: Employee[] = JSON.parse(jsonData);

    // Find index of the employee
    const index = employees.findIndex(emp => emp.id === id);
    if (index === -1) return undefined; // not found

    // Update employee
    employees[index] = {
      ...employees[index],
      ...updatedData,
      id: employees[index].id, // make sure ID does not change
    };

    // Write back to JSON
    fs.writeFileSync(filePath, JSON.stringify(employees, null, 2), "utf-8");

    return employees[index];
  } catch (error) {
    console.error("Error editing employee:", error);
    return undefined;
  }
}

export function deleteEmployee(id: number): void {
  try {
    if (!fs.existsSync(filePath)) {
      console.error("employees.json file does not exist");
      return;
    }

    const jsonData = fs.readFileSync(filePath, "utf-8");
    const employees: Employee[] = JSON.parse(jsonData);

    const updatedEmployees = employees.filter(emp => emp.id !== id);

    fs.writeFileSync(filePath, JSON.stringify(updatedEmployees, null, 2), "utf-8");
  } catch (error) {
    console.error("Error deleting employee:", error);
  }
}