import CButton from "@/components/custom/CButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import type { Branch } from "@/types/branch.types";

type BranchesEditDialogProps = {
  selectedBranchToEdit: Branch | null;
  setSelectedBranchToEdit: (value: Branch | null) => void;
};

export const BranchesEditDialog = ({
  selectedBranchToEdit,
  setSelectedBranchToEdit,
}: BranchesEditDialogProps) => {
  return (
    <Dialog
      open={!!selectedBranchToEdit}
      onOpenChange={() => setSelectedBranchToEdit(null)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Branch: {selectedBranchToEdit?.branch}</DialogTitle>
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
  );
};
