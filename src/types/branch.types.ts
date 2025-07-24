// Assuming your Branch type is defined somewhere, e.g., in a types.ts file or directly here
export type Branch = {
  id: string;
  branch: string;
  status: "Active" | "Inactive" | "Suspended" | "Pending";
  address: string;
};
