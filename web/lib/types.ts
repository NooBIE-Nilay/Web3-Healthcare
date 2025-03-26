import { z } from "zod";
export const SigninSchema = z.object({
  email: z.string(),
  password: z.string(),
});
export const SignupSchema = z.object({
  name: z.string(),
  email: z.string(),
  avatar: z.string().optional(),
  password: z.string(),
});
