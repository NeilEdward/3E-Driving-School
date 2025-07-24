import type { Branch } from "@/types/branch.types";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

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
];
