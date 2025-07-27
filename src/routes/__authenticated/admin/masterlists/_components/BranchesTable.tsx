"use client";

import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import type {ColumnDef} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useState} from "react";
import type {Branch} from "@/types/branch.types";
import {TabsLayout} from "@/components/layout/TabsLayout";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

type FilterStatus = "active" | "inactive";

export function BranchesTable<TData, TValue>({columns, data}: DataTableProps<TData, TValue>) {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("active");

  // Filter data based on status
  const filteredData = data.filter((item) => {
    return (item as Branch).status.toLowerCase() === filterStatus;
  });

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Example usage in BranchesTable
  const tabs = [
    {label: "Active", value: "active"},
    {label: "Inactive", value: "inactive"},
  ];

  return (
    <>
      <TabsLayout
        tabs={tabs}
        activeValue={filterStatus}
        onTabChange={(value: string) => setFilterStatus(value as FilterStatus)}
        className="my-4"
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
