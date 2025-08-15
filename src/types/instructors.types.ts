// types/instructor.types.ts
export type InstructorStatus = "Active" | "Inactive";

export interface Instructor {
  id: string; // Unique identifier
  name: string; // Full name
  branchId: string; // Must match Branch.id
  licenseNumber: string; // LTO license number
  specialization: string; // Course type
  status: InstructorStatus;
  contact: string;
}
