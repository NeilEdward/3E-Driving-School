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
import { BranchesEditDialog } from "./_components/BranchesEditDialog";

export const Route = createFileRoute(
  "/__authenticated/admin/masterlists/branches"
)({
  component: RouteComponent,
});

function RouteComponent() {
  // Use state for your actual data if it's mutable (e.g., from an API)
  // For now, using the static 'branches' data as per your example
  const [currentBranchesData, setCurrentBranchesData] = useState(branches);

  // State for dialogs/modals
  const [selectedBranchToEdit, setSelectedBranchToEdit] =
    useState<Branch | null>(null);
  const [branchToDeleteId, setBranchToDeleteId] = useState<string | null>(null);

  // Define your handler functions within the component
  const handleEdit = (branch: Branch) => {
    setSelectedBranchToEdit(branch);
    console.log("Editing branch:", branch);
    // You would typically open a modal/dialog here
  };

  const handleDeleteConfirmation = (branchId: string) => {
    setBranchToDeleteId(branchId);
    console.log("Confirming delete for branch ID:", branchId);
    // This will open your AlertDialog
  };

  const confirmDelete = () => {
    if (branchToDeleteId) {
      // In a real application, you'd make an API call here
      setCurrentBranchesData((prevData) =>
        prevData.filter((b) => b.id !== branchToDeleteId)
      );
      console.log(`Branch with ID ${branchToDeleteId} deleted successfully.`);
      setBranchToDeleteId(null); // Close the dialog
    }
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
            console.log("CREATE BUTTON CLICKED");
            // Logic for creating a new branch (e.g., open a form modal)
          }}
        />
      </div>
      {/* Pass the dynamically created columns and data to BranchesTable */}
      <BranchesTable columns={columns} data={currentBranchesData} />

      {/* Simplified Edit Modal/Dialog (replace with your actual modal component) */}
      <BranchesEditDialog
        selectedBranchToEdit={selectedBranchToEdit}
        setSelectedBranchToEdit={setSelectedBranchToEdit}
      />

      {/* Delete Confirmation Dialog */}
      <BranchesDeleteDialog
        {...{ branchToDeleteId, setBranchToDeleteId, confirmDelete }}
      />
    </div>
  );
}
