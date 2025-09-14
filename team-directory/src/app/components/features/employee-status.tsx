import { Badge } from "../shared/badge";
import { Employee } from "@/app/models/employees/read";
import { capitalize } from "@/app/lib/utils/string";

type Props = {
  employee: Employee;
};

const EmployeeStatus = ({ employee }: Props) => {
  const { status } = employee;
  const statusColors: Record<Employee["status"], string> = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-red-100 text-red-800"
  };

  return (
    <>
      <Badge className={`rounded-sm uppercase text-[10px] ${statusColors[status]}`}>
        {capitalize(status)}
      </Badge>
    </>
  );
};

export default EmployeeStatus;