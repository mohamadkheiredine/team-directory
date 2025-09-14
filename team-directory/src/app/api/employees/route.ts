// app/api/employees/route.ts
import { NextResponse } from "next/server";
import { getAllEmployees } from "@/app/lib/utils/employees";

export async function GET() {
  const employees = getAllEmployees();
  return NextResponse.json(employees);
}
