import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  profilePicture: z
    .string()
    .min(1, "Profile picture is required")
    .refine(
      (val) =>
        val.startsWith("http://") ||
        val.startsWith("https://") ||
        val.startsWith("/uploads/"),
      { message: "Invalid profile picture URL" },
    ),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const bookSchema = z.object({
  title: z.string().trim().min(2).max(100),
  description: z.string().trim().min(10).max(1000),
  author: z.string().trim().min(2).max(100),
  genre: z.string().trim().min(2).max(50),
  rating: z.coerce.number().min(1).max(5),
  totalCopies: z.coerce.number().int().positive().lte(10000),
  coverUrl: z.string().nonempty(),
  coverColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-F]{6}$/i),
  videoUrl: z.string().nonempty(),
  summary: z.string().trim().min(10),
});

export const userSchema = z.object({
  fullName: z.string().trim().min(3).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  profilePicture: z.string().nonempty(),
  role: z.string().nonempty(),
});
