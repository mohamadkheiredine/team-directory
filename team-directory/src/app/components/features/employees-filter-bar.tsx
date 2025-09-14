"use client";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import DebouncedInput from "../shared/debounced-input";
import { cn } from "@/app/lib/utils/cn";
import { SortDropdown } from "../shared/sort-dropdown";

type EmployeeFilterBarProps = {
  columnFilters: ColumnFiltersState;
  updatedColumnFilter: (id: string, value: string | number | undefined) => void;
  onSortChange?: (sortState: SortingState) => void;
  className?: string;
};

export function EmployeesFilterBar({
  columnFilters,
  updatedColumnFilter,
  onSortChange,
  className,
}: Readonly<EmployeeFilterBarProps>) {
  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row items-start lg:items-center px-3 py-2 gap-2 border-b",
        className
      )}
    >
      <div className="flex items-center gap-1 w-full lg:max-w-sm">
        <DebouncedInput
          value={
            (columnFilters.find((filter) => filter.id === "name")
              ?.value as string) ?? ""
          }
          onChange={(val) => updatedColumnFilter("name", val)}
          debounce={500}
          placeholder="Search by name"
          className="flex-1"
        />

        <div className="block lg:hidden">
          <SortDropdown
            columns={[
              { id: "name", label: "Name" },
              { id: "title", label: "Title" },
              { id: "email", label: "Email" },
              { id: "status", label: "Status" },
            ]}
            value={null}
            onSelect={(col, dir) =>
              onSortChange?.([
                {
                  id: col,
                  desc: dir === "desc",
                },
              ])
            }
          />
        </div>
      </div>
    </div>
  );
}