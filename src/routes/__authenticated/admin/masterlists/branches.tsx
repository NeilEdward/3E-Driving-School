// src/routes/__authenticated/admin/masterlists/branches.tsx

import CButton from "@/components/custom/CButton";
import CHeading from "@/components/custom/CHeading";
import { createFileRoute } from "@tanstack/react-router";
import { BranchesTable } from "./_components/BranchesTable";
// Import the FUNCTION that creates columns
import { createBranchColumns } from "@/utils/table-columns.branches"; // Make sure the path is correct and it's .tsx
import { branches } from "@/utils/table-data.branches"; // Your static data
import { useState } from "react"; // Import useState for managing dialogs/state

import { BranchMode, type Branch } from "@/types/branch.types";
import { BranchesDeleteDialog } from "./_components/BranchesDeleteDialog";
import { BranchesFormDialog } from "./_components/BranchesFormDialog";

export const Route = createFileRoute("/__authenticated/admin/masterlists/branches")({
  component: RouteComponent,
});

type ManageBranch = {
  open: boolean;
  data: Branch | null;
  mode: BranchMode;
  onClose: () => void;
};

function RouteComponent() {
  const [manageBranch, setManageBranch] = useState<ManageBranch>({
    open: false,
    data: null,
    mode: BranchMode.Create,
    onClose: () =>
      setManageBranch((prev) => ({ ...prev, mode: BranchMode.Create, data: null, open: false })),
  });

  console.log({ manageBranch });

  const handleEditBranch = (branch: Branch) => {
    console.log("Editing branch:", branch);
    setManageBranch((prev) => ({
      ...prev,
      data: branch,
      open: true,
      mode: BranchMode.Edit,
    }));
  };

  const handleDeleteBranchConfirmation = (branch: Branch) => {
    setManageBranch((prev) => ({ ...prev, mode: BranchMode.Delete, data: branch, open: true }));
    console.log("Confirming delete for branch ID:", branch.id);
  };

  const handleCreateBranch = () => {
    setManageBranch((prev) => ({ ...prev, open: true, mode: BranchMode.Create, data: null }));
  };

  // Call the createBranchColumns function to get the columns array,
  // passing your handler functions.
  const columns = createBranchColumns({
    onEdit: handleEditBranch,
    onDelete: handleDeleteBranchConfirmation,
  });

  return (
    <div>
      <div className="flex justify-between items-center md:justify-start md:gap-4">
        <CHeading title="Branches" />
        <CButton label="Create" onClick={handleCreateBranch} />
      </div>

      <BranchesTable columns={columns} data={branches} />
      <BranchesFormDialog
        open={manageBranch.open && (manageBranch.mode === "create" || manageBranch.mode === "edit")}
        mode={manageBranch.mode}
        data={manageBranch.data}
        onClose={manageBranch.onClose}
      />
      <BranchesDeleteDialog
        open={manageBranch.open && manageBranch.mode === "delete"}
        data={manageBranch.data}
        onClose={manageBranch.onClose}
      />
    </div>
  );
}
