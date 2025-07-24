import type { Branch } from "@/types/branch.types";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<Branch>[] = [
  {
    accessorKey: "branch",
    header: "Branch",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      let variant: "default" | "secondary" | "destructive" | "outline" | null =
        "default"; // Initialize with a default
      let text = String(status);
      let className: string = "";

      // Customize badge based on status value
      if (status === "open") {
        variant = "secondary";
        className = "w-14 bg-green-200 text-green-700 capitalize";
      } else if (status === "closed") {
        variant = "destructive";
        className = "w-14 bg-red-200 text-red-700 capitalize";
      } else {
        variant = "outline"; // Fallback for other statuses
      }

      return (
        <Badge variant={variant} className={className}>
          {text}
        </Badge>
      );
    },
  },
  {
    id: "actions", // Unique ID for the actions column
    header: "Actions",
    cell: ({ row }) => {
      const branch = row.original; // Get the full branch object for the row

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-40 p-4 flex flex-col gap-1 rounded bg-white shadow-md cursor-pointer"
          >
            <DropdownMenuLabel className="font-medium">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem
              className="hover:bg-gray-50 active:bg-gray-100"
              onClick={() => navigator.clipboard.writeText(branch.id)}
            >
              Copy Branch ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="hover:bg-gray-50 active:bg-gray-100"
              onClick={() => {
                console.log({ branch });
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:bg-gray-50 active:bg-gray-100"
              onClick={() => console.log({ branch })}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
