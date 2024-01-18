import { z } from "zod";

export const signupFormSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email.")
    .min(5, "Please enter a valid email.")
    .max(100, "Email too long."),
  username: z
    .string()
    .min(3, "Username should be at least 3 characters long.")
    .max(30, "Username too long.")
    .regex(/^[a-zA-Z0-9-]+$/, "Username contains invalid characters."),
  password: z
    .string()
    .min(6, "Password should be at least 6 characters long.")
    .max(150, "Password too long."),
});

export const loginFormSchema = z.object({
  loginValue: z.string().min(1).max(100),
  password: z.string().min(1).max(150),
});
