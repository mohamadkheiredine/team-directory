import EmployeesTableLoading from "../components/features/employees-table-loading";
import { Skeleton } from "../components/shared/skeleton";

export default function EmployeesLoadingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="flex justify-end">
        <Skeleton className="inline-block mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition" />
      </div>
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
        <EmployeesTableLoading />
      </div>
    </main>
  )
}