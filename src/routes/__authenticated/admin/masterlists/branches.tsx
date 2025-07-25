// src/routes/__authenticated/admin/masterlists/branches.tsx

import CButton from "@/components/custom/CButton";
import CHeading from "@/components/custom/CHeading";
import { createFileRoute } from "@tanstack/react-router";
import { BranchesTable } from "./_components/BranchesTable";
// Import the FUNCTION that creates columns
import { createBranchColumns } from "@/utils/table-columns.branches"; // Make sure the path is correct and it's .tsx
import { branches } from "@/utils/table-data.branches"; // Your static data
import { useState } from "react"; // Import useState for managing dialogs/state

import type { Branch } from "@/types/branch.types";
import { BranchesDeleteDialog } from "./_components/BranchesDeleteDialog";
import { BranchesFormDialog } from "./_components/BranchesFormDialog";

export const Route = createFileRoute("/__authenticated/admin/masterlists/branches")({
  component: RouteComponent,
});

type ManageBranch = {
  open: boolean;
  data: Branch | null;
  onClose: () => void;
};

function RouteComponent() {
  const [branchToDeleteId, setBranchToDeleteId] = useState<string | null>(null);
  const [manageBranch, setManageBranch] = useState<ManageBranch>({
    open: false,
    data: null,
    onClose: () => setManageBranch((prev) => ({ ...prev, data: null, open: false })),
  });

  console.log({ manageBranch });

  const handleEdit = (branch: Branch) => {
    console.log("Editing branch:", branch);
    setManageBranch((prev) => ({
      ...prev,
      data: branch,
      open: true,
    }));
  };

  const handleDeleteConfirmation = (branchId: string) => {
    setBranchToDeleteId(branchId);
    console.log("Confirming delete for branch ID:", branchId);
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
      <BranchesFormDialog open={manageBranch.open} onClose={() => manageBranch.onClose()} data={manageBranch.data} />
      <BranchesDeleteDialog setBranchToDeleteId={setBranchToDeleteId} branchToDeleteId={branchToDeleteId} />
    </div>
  );
}
