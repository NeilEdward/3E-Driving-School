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

type BranchesDeleteDialogProps = {
  branchToDeleteId: string | null;
  setBranchToDeleteId: (id: string | null) => void;
};

export const BranchesDeleteDialog = ({
  branchToDeleteId,
  setBranchToDeleteId,
}: BranchesDeleteDialogProps) => {
  return (
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
          <AlertDialogAction
            onClick={() => {
              console.log("DELETE");
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
