"use client";

import DataGrid from "../shared/data-grid";
import SortableHeader from "../shared/sortable-header";
import { Tooltip } from "../shared/tooltip";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import { Employee } from "@/app/models/employees/read";
import { EmployeesFilterBar } from "./employees-filter-bar";
import EmployeeStatus from "./employee-status";

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
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start max-w-[16rem]">
          <SortableHeader
            column={column}
            label={"Name"}
            className="hidden lg:flex"
            mobileClassName="block lg:hidden text-[10px] uppercase text-blue-500 leading-none"
          />
        </div>
      );
    },
    cell: ({ row }) => {
      const employee = row.original;
      const name = employee.name;
      const slug = employee.slug;

      return (
        <div className="flex items-center space-x-2">
          <Tooltip.Provider>
            <Tooltip delayDuration={700}>
              <Tooltip.Trigger asChild>
                <Link
                  href={`/employees/${slug}`}
                  className="font-medium hover:underline text-xs lg:text-sm max-w-[10rem] lg:max-w-[20rem] truncate"
                >
                  {name}
                </Link>
              </Tooltip.Trigger>
              <Tooltip.Content align="start">
                <p>{name}</p>
              </Tooltip.Content>
            </Tooltip>
          </Tooltip.Provider>
        </div>
      );
    },
  },
  {
    meta: {
      area: "[grid-area:title]",
    },
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start max-w-[16rem]">
          <SortableHeader
            column={column}
            label={"Title"}
            className="hidden lg:flex"
            mobileClassName="block lg:hidden text-[10px] uppercase text-blue-500 leading-none"
          />
        </div>
      );
    },
    cell: ({ row }) => {
      const title = row.getValue<string>("title");
      return (
        <div className="flex flex-row gap-1">
          <div className="text-start text-sm leading-none">{title}</div>
        </div>
      );
    },
  },
  {
    meta: {
      area: "[grid-area:email]",
    },
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-start max-w-[16rem]">
          <SortableHeader
            column={column}
            label={"Email"}
            className="hidden lg:flex"
            mobileClassName="block lg:hidden text-[10px] uppercase text-blue-500 leading-none"
          />
        </div>
      );
    },
    cell: ({ row }) => {
      const email = row.getValue<string>("email");
      return (
        <div className="text-start text-sm leading-none flex flex-row gap-1">
          {email}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    meta: {
      area: "[grid-area:status]",
    },
    header: ({ column }) => (
      <SortableHeader
        column={column}
        label={"Status"}
        className="hidden lg:flex text-center whitespace-nowrap"
        mobileClassName="block lg:hidden text-start leading-none text-[10px] uppercase text-blue-500 whitespace-nowrap"
      />
    ),
    cell: ({ row }) => {
      const employee = row.original;

      return (
        <>
          <div className="flex justify-start">
            <div>
              <EmployeeStatus employee={employee} />
            </div>
          </div>
        </>
      );
    },
  },
];

const EmployeesTable = ({ employees }: { employees: Employee[] }) => {
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

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const updatedColumnFilter = (
    columnId: string,
    value: string | number | undefined
  ) => {
    setColumnFilters((prev) => {
      const existingFilter = prev.find((filter) => filter.id === columnId);
      if (existingFilter) {
        return prev.map((filter) =>
          filter.id === columnId ? { ...filter, value } : filter
        );
      } else {
        return [...prev, { id: columnId, value }];
      }
    });
  };

  return (
    <div className="w-full p-0">
      <div className="sticky top-0 z-50 bg-background border-b border-gray-200 shadow-sm">
        <EmployeesFilterBar
          columnFilters={columnFilters}
          updatedColumnFilter={updatedColumnFilter}
          onSortChange={(sortState) => setSorting(sortState)}
        />
      </div>
      <DataGrid
        columns={columns}
        data={employees}
        hideLabelsOnBreakpoint="lg"
        headerGridTemplate={headerGrid}
        gridTemplates={`${mobileGrid} ${tabletGrid} ${desktopGrid}`}
        className="rounded-none border-x-0"
        isContainerQuery={true}
        state={{
          columnVisibility: {},
          columnFilters,
          sorting,
        }}
      />
    </div>
  );
};

export default EmployeesTable;
