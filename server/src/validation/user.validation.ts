import z from "zod";

export const userIdSchema = z.string().trim().min(1, { message: "User ID is required" });