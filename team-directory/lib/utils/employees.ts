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
