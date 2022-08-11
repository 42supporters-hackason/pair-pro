import { z } from "zod";

export const createCommunitySchema = z.object({
  communityName: z
    .string()
    .max(15, { message: "15字以内で入力してください" })
    .nonempty({ message: "コミュニティ名を入力してください" }),
});

export type CreateCommunitySchema = z.infer<typeof createCommunitySchema>;
