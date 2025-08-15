// src/routes/__authenticated/admin/masterlists/branches.tsx
import z from "zod";

import CButton from "@/components/custom/CButton";
import CHeading from "@/components/custom/CHeading";
import {createFileRoute} from "@tanstack/react-router";
// import {BranchesTable} from "./_components/BranchesTable";
// Import the FUNCTION that creates columns
import {createBranchColumns} from "@/features/masterlst/components/BranchesTableColumns"; // Make sure the path is correct and it's .tsx
import {branches} from "@/static/table-data.branches.static"; // Your static data
import {useState, useCallback, useMemo} from "react"; // Import useState for managing dialogs/state

import {BranchMode, type Branch} from "@/types/branch.types";
import {BranchesDeleteDialog} from "../../../../features/masterlst/components/BranchesDeleteDialog";
import {BranchesFormDialog} from "../../../../features/masterlst/components/BranchesFormDialog";
import {DataTable} from "@/components/layout/TableLayout";

// import {useFetchBranchesQuery} from "@/features/masterlst/branches.masterlist.api";

type ManageBranch = {
  open: boolean;
  data: Branch | null;
  mode: BranchMode;
  onClose: () => void;
};

export const Route = createFileRoute("/__authenticated/admin/masterlists/branches")({
  component: BranchesRouteComponent,
  validateSearch: z.object({
    page: z.number().optional().default(1),
    rows: z.number().optional().default(10),
    status: z.enum(["active", "inactive"]).optional().default("active"),
    search: z
      .string()
      .optional()
      .transform((val) => (val === "" ? undefined : val)),
  }),
});

export function BranchesRouteComponent() {
  // const {data: branchesdata} = useFetchBranchesQuery({});

  const [manageBranch, setManageBranch] = useState<ManageBranch>({
    open: false,
    data: null,
    mode: BranchMode.Create,
    onClose: () =>
      setManageBranch((prev) => ({...prev, mode: BranchMode.Create, data: null, open: false})),
  });

  const handleEditBranch = useCallback((branch: Branch) => {
    console.log("Editing branch:", branch);
    setManageBranch((prev) => ({
      ...prev,
      data: branch,
      open: true,
      mode: BranchMode.Edit,
    }));
  }, []);

  const handleDeleteBranchConfirmation = useCallback((branch: Branch) => {
    setManageBranch((prev) => ({...prev, mode: BranchMode.Delete, data: branch, open: true}));
    console.log("Confirming delete for branch ID:", branch.id);
  }, []);

  const handleCreateBranch = useCallback(() => {
    setManageBranch((prev) => ({...prev, open: true, mode: BranchMode.Create, data: null}));
  }, []);

  // Memoize columns to prevent infinite re-renders
  const columns = useMemo(
    () =>
      createBranchColumns({
        onEdit: handleEditBranch,
        onDelete: handleDeleteBranchConfirmation,
      }),
    [handleEditBranch, handleDeleteBranchConfirmation]
  );

  return (
    <div>
      <div className="flex justify-between items-center md:justify-start md:gap-4">
        <CHeading title="Branches" />
        <CButton label="Create" onClick={handleCreateBranch} />
      </div>

      <DataTable
        data={branches}
        columns={columns}
        filterKey="status"
        tabs={[
          {label: "Active", value: "active"},
          {label: "Inactive", value: "inactive"},
        ]}
        initialTab="active"
        route={Route}
      />

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
