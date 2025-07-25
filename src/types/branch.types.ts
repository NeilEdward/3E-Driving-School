import type { branchSchema } from "@/schema/branch.schema";
import type z from "zod";

// Assuming your Branch type is defined somewhere, e.g., in a types.ts file or directly here
export type Branch = {
  id: string;
  branch: string;
  status: "Active" | "Inactive" | "Suspended" | "Pending";
  address: string;
};

export type BranchShema = z.infer<typeof branchSchema>;

export type BranchStatus = "edit" | "create" | "delete";

export type BranchesFormProps = {
  open: boolean;
  data: Branch | null;
  status: BranchStatus;
  onClose: () => void;
};
