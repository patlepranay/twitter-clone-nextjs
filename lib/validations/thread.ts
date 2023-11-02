import * as z from "zod";

export const ThreadValidation = z.object({
  thread: z.string().min(3, { message: "Minimum 3 characters" }),
  accountID: z.string().min(1),
});

export const CommentValidation = z.object({
  thread: z.string().min(3, { message: "Minimum 3 characters" }),
});
