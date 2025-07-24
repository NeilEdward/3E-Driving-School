// src/utils/table-columns.branches.tsx (Make sure this file is .tsx)

import { Badge } from "@/components/ui/badge"; // Adjust path if necessary
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Branch } from "@/types/branch.types";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

// Define the types for your handlers
interface BranchColumnHandlers {
  onEdit: (branch: Branch) => void;
  onDelete: (branchId: string) => void;
}

// Export a function that creates the columns, accepting the handlers
export const createBranchColumns = ({
  onEdit,
  onDelete,
}: BranchColumnHandlers): ColumnDef<Branch>[] => {
  return [
    {
      accessorKey: "branch",
      header: "Branch Name",
      cell: ({ row }) => <div>{row.getValue("branch")}</div>,
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
        let variant:
          | "default"
          | "secondary"
          | "destructive"
          | "outline"
          | null = "default";
        let text = String(status);

        if (status === "Active") {
          variant = "default";
        } else if (status === "Inactive") {
          variant = "secondary";
        } else if (status === "Suspended") {
          variant = "destructive";
        } else {
          variant = "outline";
        }

        return <Badge variant={variant}>{text}</Badge>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const branch = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(branch.id)}
              >
                Copy Branch ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEdit(branch)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(branch.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
