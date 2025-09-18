import z from "zod";

export const receiverIdSchema = z.string().trim().min(1, { message: "Reciever ID is required" });
export const senderIdSchema = z.string().trim().min(1, { message: "Sender ID is required" });
export const conversationIdSchema = z.string().trim().min(1, { message: "Conversation ID is required" });

export const messageSchema = z.object({
  text: z.string().trim(),
});
