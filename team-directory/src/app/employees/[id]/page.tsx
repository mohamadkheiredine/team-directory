import EmployeeView from "@/app/components/features/employee-view";
import { fetchEmployeeById } from "@/app/data-layer/employees";

interface EmployeeDetailsParams {
  params: Promise<{ id: number }>;
}

const EmployeeDetailsPage = async ({ params }: EmployeeDetailsParams) => {
  const { id } = await params;
  const employee = fetchEmployeeById(id);

  if (!employee) {
    return (
      <div className="p-2 md:p-4">
        <p>Employee not found.</p>
      </div>
    );
  }
  return (
    <div className="p-2 md:p-4">
      <EmployeeView employee={employee} />
    </div>
  );
};

export default EmployeeDetailsPage;