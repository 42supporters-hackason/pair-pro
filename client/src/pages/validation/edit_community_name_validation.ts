import { z } from "zod";

export const editCommunityNameSchema = z.object({
  communityName: z
    .string()
    .nonempty({ message: "コミュニティ名を入力してください" }),
});

export type EditCommunityNameSchema = z.infer<typeof editCommunityNameSchema>;
