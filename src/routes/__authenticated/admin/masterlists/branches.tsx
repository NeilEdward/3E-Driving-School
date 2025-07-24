// src/routes/__authenticated/admin/masterlists/branches.tsx

import CButton from "@/components/custom/CButton";
import CHeading from "@/components/custom/CHeading";
import { createFileRoute } from "@tanstack/react-router";
import { BranchesTable } from "./_components/BranchesTable";
// Import the FUNCTION that creates columns
import { createBranchColumns } from "@/utils/table-columns.branches"; // Make sure the path is correct and it's .tsx
import { branches } from "@/utils/table-data.branches"; // Your static data
import { useState } from "react"; // Import useState for managing dialogs/state
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Branch } from "@/types/branch.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

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
      <Dialog
        open={!!selectedBranchToEdit}
        onOpenChange={() => setSelectedBranchToEdit(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Edit Branch: {selectedBranchToEdit?.branch}
            </DialogTitle>
          </DialogHeader>
          {/* Your edit form fields would go here */}
          <p>ID: {selectedBranchToEdit?.id}</p>
          <p>Status: {selectedBranchToEdit?.status}</p>
          <DialogFooter>
            <CButton
              label="Close"
              onClick={() => setSelectedBranchToEdit(null)}
            />
            {/* Add a Save button and logic */}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!branchToDeleteId}
        onOpenChange={(isOpen: boolean) => !isOpen && setBranchToDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              branch.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
