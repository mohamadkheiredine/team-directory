'use client';

import { DropdownMenu } from "./dropdown-menu";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { Column } from "@tanstack/react-table";
import { cn } from "../../../../lib/utils/cn";

export default function SortableHeader<T>({
  label,
  column,
  className,
  mobileClassName
}: Readonly<{
  label: string;
  column: Column<T, unknown>;
  className?: string;
  mobileClassName?: string;
}>) {
  const triggerIcon = !column.getIsSorted() ? (
    <ChevronsUpDown className="h-4 w-4" />
  ) : column.getIsSorted() === 'asc' ? (
    <ArrowUp className="h-4 w-4" />
  ) : (
    <ArrowDown className="h-4 w-4" />
  );

  return (
    <>
      <div className={cn('block @4xl/grid:hidden', mobileClassName)}>
        {label}
      </div>
      <DropdownMenu>
        <DropdownMenu.Trigger className={cn('hidden @4xl/grid:block', className)} asChild>
          <div className="flex items-center gap-2 cursor-pointer select-none">
            <div className="text-xs leading-none">{label}</div>
            {triggerIcon}
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item
            onClick={() => column.toggleSorting(false)}
            className="flex items-center justify-start gap-2"
          >
            <ArrowUp className="h-4 w-4" />
            {'Asc'}
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => column.toggleSorting(true)}
            className="flex items-center justify-start gap-2"
          >
            <ArrowDown className="h-4 w-4" />
            {'Desc'}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
      
    </>
  )
}