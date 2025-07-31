// components/ui/data-table.tsx
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight} from "lucide-react";
import {useMemo, useState} from "react";
import {TabHeaderWithSearch} from "@/components/layout/TabHeaderWithSearch";
import {useNavigate, type AnyRoute} from "@tanstack/react-router";

interface Tab {
  label: string;
  value: string;
}

interface DataTableProps<TData, TValue, TRoute extends AnyRoute = AnyRoute> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterKey?: keyof TData;
  tabs?: Tab[];
  initialTab?: string;
  route?: TRoute;
}

export function DataTable<TData, TValue, TRoute extends AnyRoute = AnyRoute>({
  columns,
  data,
  filterKey,
  tabs = [],
  initialTab = "",
  route,
}: DataTableProps<TData, TValue, TRoute>) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const searchParams = route?.useSearch();
  const navigate = route ? useNavigate({from: route.fullPath}) : undefined;

  const filteredData = useMemo(() => {
    if (!filterKey || !activeTab) return data;
    return data.filter((item) => String(item[filterKey]).toLowerCase() === activeTab);
  }, [data, filterKey, activeTab]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: searchParams.rows || 10, // Use searchParams.rows
        pageIndex: (searchParams.page || 1) - 1, // Use searchParams.page and convert to 0-indexed
      },
    },
  });

  console.log(Boolean(navigate) && Boolean(route), {navigate, route}, "ROUTE");
  return (
    <>
      <div className="rounded-md mt-10 border">
        {tabs.length > 0 && (
          <TabHeaderWithSearch
            tabs={tabs}
            activeValue={activeTab}
            onTabChange={(value) => setActiveTab(value)}
          />
        )}

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                const pageSize = Number(value);
                table.setPageSize(pageSize);

                if (route && navigate) {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      page: 1,
                      rows: pageSize,
                    }),
                  });
                }
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => {
                table.setPageIndex(0);
                if (navigate && route) {
                  navigate({search: (prev) => ({...prev, page: 1})}) as any;
                }
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => {
                table.previousPage();
                if (navigate && route) {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      page:
                        table.getCanPreviousPage() && Number(searchParams.page) > 1
                          ? Number(searchParams.page) - 1
                          : 1,
                    }),
                  });
                }
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => {
                table.nextPage();
                if (navigate && route) {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      page:
                        table.getCanNextPage() && Number(searchParams.page) < table.getPageCount()
                          ? Number(searchParams.page) + 1
                          : table.getPageCount(),
                    }),
                  });
                }
              }}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => {
                table.setPageIndex(table.getPageCount() - 1);
                if (navigate && route) {
                  navigate({
                    search: (prev) => ({...prev, page: table.getPageCount()}),
                  });
                }
              }}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
