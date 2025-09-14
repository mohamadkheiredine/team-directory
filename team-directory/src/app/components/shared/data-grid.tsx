"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  HeaderContext,
  InitialTableState,
  getPaginationRowModel,
  getSortedRowModel,
  TableState,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";
import { cn } from "@/app/lib/utils/cn";
import { Label } from "./label";
import { useState } from "react";
import { Select } from "./select";
import { Button } from "./button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

type Break =
  | "4xl/grid"
  | "4xl"
  | "3xl/grid"
  | "3xl"
  | "2xl/grid"
  | "2xl"
  | "md"
  | "lg"
  | "xl";

const map: Record<Break, string> = {
  "4xl/grid": "@4xl/grid:hidden",
  "4xl": "4xl:hidden",
  "3xl/grid": "@3xl/grid:hidden",
  "3xl": "3xl:hidden",
  "2xl/grid": "@2xl/grid:hidden",
  "2xl": "2xl:hidden",
  lg: "lg:hidden",
  md: "md:hidden",
  xl: "xl:hidden",
};
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  initialState?: InitialTableState | undefined;
  state?: Partial<TableState> | undefined;
  className?: string;
  isContainerQuery?: boolean;
  hideLabelsOnBreakpoint?: Break;
  headerGridTemplate?: string;
  gridTemplates: string;
}

const DataGrid = <TData, TValue>({
  columns,
  data,
  initialState,
  state,
  className,
  hideLabelsOnBreakpoint = "4xl/grid",
  headerGridTemplate,
  isContainerQuery = true,
  gridTemplates,
}: Readonly<DataTableProps<TData, TValue>>) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
    // onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // getFacetedRowModel: getFacetedRowModel(),
    // getFacetedUniqueValues: getFacetedUniqueValues(),
    initialState,
    state: {
      pagination,
      columnFilters,
      columnVisibility,
      ...state,
      ...{
        sorting:
          state?.sorting && state?.sorting?.length > 0
            ? state?.sorting
            : sorting,
      },
    },
  });

  return (
    <div
      className={cn(
        `rounded-md border ${isContainerQuery && "/grid"}`,
        className
      )}
    >
      {headerGridTemplate &&
        table.getHeaderGroups().map((headerGroup) => (
          <div
            key={headerGroup.id}
            className={cn("hidden", headerGridTemplate)}
          >
            {headerGroup.headers.map((header) => {
              return (
                <div key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </div>
              );
            })}
          </div>
        ))}
      <div className={cn(headerGridTemplate && "border-t")}>
        {table.getRowModel().rows.map((row) => (
          <div
            key={row.id}
            className={cn(
              `grid data-[state=selected]:bg-muted/50 ${gridTemplates}`
            )}
            data-state={row.getIsSelected() && "selected"}
          >
            {row.getVisibleCells().map((cell) => {
              const hdrDef = cell.column.columnDef.header;
              const ctx = {
                table,
                column: cell.column,
                header: { column: cell.column },
              } as HeaderContext<TData, unknown>;

              const headerLabel = flexRender(hdrDef, ctx);

              let area = "";
              if (
                cell.column.columnDef.meta &&
                "area" in cell.column.columnDef.meta
              ) {
                area = cell.column.columnDef.meta.area as string;
              }

              return (
                <div
                  key={`${row.id}-${cell.id}`}
                  className={`${area} flex flex-col`}
                >
                  <Label
                    className={cn(
                      "block text-xs font-semibold text-muted-foreground mb-1",
                      `${map[hideLabelsOnBreakpoint]}`
                    )}
                  >
                    {headerLabel}
                  </Label>
                  <div>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {table.getRowModel().rows.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No results
          </p>
        )}
      </div>
      <div className="flex items-center justify-between px-4 h-16">
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
          {/* {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected. */}
        </div>
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <Select.Trigger size="sm" className="w-20" id="rows-per-page">
                <Select.Value
                  placeholder={table.getState().pagination.pageSize}
                />
              </Select.Trigger>
              <Select.Content side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <Select.Item key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outlined"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outlined"
              className="size-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outlined"
              className="size-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outlined"
              className="hidden size-8 h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataGrid;
