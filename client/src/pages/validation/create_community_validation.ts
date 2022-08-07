import { z } from "zod";

export const createCommunitySchema = z.object({
  communityName: z
    .string()
    .nonempty({ message: "community名を入力してください" }),
});

export type CreateCommunitySchema = z.infer<typeof createCommunitySchema>;
