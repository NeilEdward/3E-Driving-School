import type { loginSchema, registerSchema } from "@/schema/auth.schema";
import type z from "zod";

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
