import * as z from "zod";

// ============================================================
// USER
// ============================================================
export const SignupValidation = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  bio: z.string(),
});

// ============================================================
// POST
// ============================================================
export const ExpenseValidation = z.object({
  desc: z
    .string()
    .min(1, { message: "This field is required" })
    .max(1000, { message: "Maximum 1000 characters." }),
 amount: z
    .string()
    .min(1, { message: "Amount is required" })
    .max(10, { message: "Maximum 10 digit." }),
});

export const GroupValidation = z.object({
  groupname: z.string().min(1, { message: "This field is required" }).max(1000, { message: "Maximum 1000 characters." }),
}); 

export const FriendValidation = z.object({
  username: z.string().min(1, { message: "This field is required" }).max(1000, { message: "Maximum 1000 characters." }),
});