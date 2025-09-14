import EmployeesTable from "../components/features/employee-table";

export default async function EmployeesPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/employees`);
  const employees = await res.json();

  // await new Promise((resolve) => setTimeout(resolve, 5000));
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
        <EmployeesTable employees={employees} />
      </div>
    </main>
  );
}
