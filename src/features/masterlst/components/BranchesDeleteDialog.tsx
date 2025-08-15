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
import {toast} from "sonner";
import type {BranchesFormProps} from "@/types/branch.types";

export const BranchesDeleteDialog = ({open, onClose, data}: BranchesFormProps) => {
  const handleDeleteBranch = () => {
    toast(`${data?.branch} has been deleted`, {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Close",
        onClick: () => console.log("Close"),
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={() => onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to delete it?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the branch.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer"
            onClick={() => {
              handleDeleteBranch();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
