import z from "zod";

export const branchSchema = z.object({
  branch: z.string().min(1, { message: "Branch name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
});
