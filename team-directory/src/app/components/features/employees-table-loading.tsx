"use client";
import DataGrid from "../shared/data-grid";
import { Skeleton } from "../shared/skeleton";
import { Employee } from "@/app/models/employees/read";
import { ColumnDef } from "@tanstack/react-table";

type GridAwareColumn<T> = ColumnDef<T> & {
  /** helper for IntelliSense */
  meta: { area: string };
};

export const columns: GridAwareColumn<Employee>[] = [
  {
    meta: {
      area: "[grid-area:name]",
    },
    accessorKey: "name",
    header: () => (
      <div className="text-start @4xl/grid:text-right">
        <Skeleton className="h-3 w-1/2 @4xl/grid:w-full bg-blue-300/30" />
      </div>
    ),
    cell: () => (
      <div className="text-start @4xl/grid:text-right">
        <Skeleton className="w-full h-3" />
      </div>
    ),
  },
  {
    meta: {
      area: "[grid-area:title]",
    },
    accessorKey: "title",
    header: () => (
      <div className="text-start @4xl/grid:text-right">
        <Skeleton className="h-3 w-1/2 @4xl/grid:w-full bg-blue-300/30" />
      </div>
    ),
    cell: () => (
      <div className="text-start @4xl/grid:text-right">
        <Skeleton className="w-full h-3" />
      </div>
    ),
  },
  {
    meta: {
      area: "[grid-area:email]",
    },
    accessorKey: "email",
    header: () => (
      <div className="text-start @4xl/grid:text-right">
        <Skeleton className="h-3 w-1/2 @4xl/grid:w-full bg-blue-300/30" />
      </div>
    ),
    cell: () => (
      <div className="text-start @4xl/grid:text-right">
        <Skeleton className="w-full h-3" />
      </div>
    ),
  },
  {
    meta: {
      area: "[grid-area:status]",
    },
    accessorKey: "status",
    header: () => (
      <div className="text-start @4xl/grid:text-right">
        <Skeleton className="h-3 w-1/2 @4xl/grid:w-full bg-blue-300/30" />
      </div>
    ),
    cell: () => (
      <div className="text-start @4xl/grid:text-right">
        <Skeleton className="w-full h-3" />
      </div>
    ),
  },
];

const EmployeesTableLoading = () => {
  const employees: Employee[] = Array.from({ length: 6 }, (_) => ({
    id: 0,
    slug: "Loading...",
    name: "Loading...",
    title: "Loading...",
    email: "Loading...",
    status: "inactive",
  }));

  const mobileGrid = `
  gap-4
  border-b
  p-4
  grid
  grid-cols-[1fr_1fr]
  [grid-template-areas:'name_status'_'title_email']
`;

  const tabletGrid = `
  md:gap-y-8
  md:gap-x-4
  md:p-4
  md:grid-cols-[1fr_1fr_1fr]
  md:[grid-template-areas:'name_title_status'_'email_email_email']
`;

  const desktopGrid = `
  lg:h-16
  lg:p-3
  lg:items-center
  lg:grid-cols-[2fr_1fr_1fr_1fr]
  lg:[grid-template-areas:'name_title_email_status']
  lg:gap-4
`;

  const headerGrid = `
    hidden
    lg:grid
    lg:h-10
    lg:px-3
    lg:items-center
    lg:gap-4
    lg:grid-cols-[2fr_1fr_1fr_1fr]
    lg:[grid-template-areas:'name_title_email_status']
  `;


  return (
    <div className="container mx-auto">
      <DataGrid
        columns={columns}
        data={employees}
        hideLabelsOnBreakpoint="4xl/grid"
        headerGridTemplate={headerGrid}
        gridTemplates={`${mobileGrid} ${tabletGrid} ${desktopGrid}`}
        className="rounded-none border-x-0"
        isContainerQuery={true}
      />
    </div>
  );
};

export default EmployeesTableLoading;