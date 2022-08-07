import { z } from "zod";

export const communitySchema = z.object({
  communityId: z
    .string()
    .nonempty({ message: "communityIDを入力してください" }),
});

export type CommunitySchema = z.infer<typeof communitySchema>;
