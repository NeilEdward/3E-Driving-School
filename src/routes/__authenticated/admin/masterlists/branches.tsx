// src/routes/__authenticated/admin/masterlists/branches.tsx

import CButton from "@/components/custom/CButton";
import CHeading from "@/components/custom/CHeading";
import { createFileRoute } from "@tanstack/react-router";
import { BranchesTable } from "./_components/BranchesTable";
// Import the FUNCTION that creates columns
import { createBranchColumns } from "@/utils/table-columns.branches"; // Make sure the path is correct and it's .tsx
import { branches } from "@/utils/table-data.branches"; // Your static data
import { useState } from "react"; // Import useState for managing dialogs/state

import type { Branch, BranchStatus } from "@/types/branch.types";
import { BranchesDeleteDialog } from "./_components/BranchesDeleteDialog";
import { BranchesFormDialog } from "./_components/BranchesFormDialog";

export const Route = createFileRoute("/__authenticated/admin/masterlists/branches")({
  component: RouteComponent,
});

type ManageBranch = {
  open: boolean;
  data: Branch | null;
  status: BranchStatus;
  onClose: () => void;
};

function RouteComponent() {
  const [manageBranch, setManageBranch] = useState<ManageBranch>({
    open: false,
    data: null,
    status: "create",
    onClose: () => setManageBranch((prev) => ({ ...prev, status: "create", data: null, open: false })),
  });

  console.log({ manageBranch });

  const handleEdit = (branch: Branch) => {
    console.log("Editing branch:", branch);
    setManageBranch((prev) => ({
      ...prev,
      data: branch,
      open: true,
      status: "edit",
    }));
  };

  const handleDeleteConfirmation = (branch: Branch) => {
    setManageBranch((prev) => ({ ...prev, status: "delete", data: branch, open: true }));
    console.log("Confirming delete for branch ID:", branch);
  };

  // Call the createBranchColumns function to get the columns array,
  // passing your handler functions.
  const columns = createBranchColumns({
    onEdit: handleEdit,
    onDelete: handleDeleteConfirmation,
  });

  return (
    <div>
      <div className="flex justify-between items-center md:justify-start md:gap-4">
        <CHeading title="Branches" />
        <CButton
          label="Create"
          onClick={() => {
            setManageBranch((prev) => ({ ...prev, open: true }));
          }}
        />
      </div>

      <BranchesTable columns={columns} data={branches} />
      <BranchesFormDialog {...manageBranch} />
      <BranchesDeleteDialog {...manageBranch} />
    </div>
  );
}
