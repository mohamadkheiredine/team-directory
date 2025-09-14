"use client";

import { Select } from "../shared/select";
import { cn } from "@/app/lib/utils/cn";
import { EMPLOYEE_STATUSES } from "@/app/models/employees/read";
import { capitalize} from "@/app/lib/utils/string";

type StatusSelectProps = {
  value?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onRequestChangeSelected?: (selected: boolean) => void;
};

function EmployeeStatusSelect({
  value,
  disabled,
  onChange,
  placeholder,
  className,
}: Readonly<StatusSelectProps>) {
  // Detect when status changes
  const handleValueChange = (v: string) => {
    onChange(v);
  };

  return (
    <Select value={`${value ?? ""}`} onValueChange={handleValueChange}>
      <Select.Trigger
        disabled={disabled}
        className={cn("h-[36px] w-full", className)}
      >
        <Select.Value placeholder={placeholder} />
      </Select.Trigger>

      <Select.Content className="bg-gray-50">
        {EMPLOYEE_STATUSES.map((status) => (
          <Select.Item key={status} value={status}>
            {capitalize(status)}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  );
}

export default EmployeeStatusSelect;