import { z } from "zod";
export const SigninSchema = z.object({
  aadharNo: z.string(),
  password: z.string(),
});
export const SignupSchema = z.object({
  name: z.string(),
  email: z.string(),
  mobileNo: z.number().min(6).max(10),
  aadharNo: z.number().min(12).max(12),
  password: z.string(),
  emergencyContact: z.number().min(6).max(10),
});
