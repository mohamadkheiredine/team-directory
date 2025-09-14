import Link from "next/link";
import EmployeesTable from "../components/features/employee-table";

export default async function EmployeesPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/employees`);
  const employees = await res.json();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="flex justify-end">
        <Link href="/employees/new" className="inline-block mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          Add New Employee
        </Link>
      </div>
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
        <EmployeesTable employees={employees} />
      </div>
    </main>
  );
}
