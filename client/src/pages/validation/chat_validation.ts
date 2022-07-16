import { z } from "zod";

export const chatSchema = z.object({
  message: z.string().nonempty(),
});

export type ChatSchema = z.infer<typeof chatSchema>;
