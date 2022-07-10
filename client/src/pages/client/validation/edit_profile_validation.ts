import { z } from "zod";

export const editProfileSchema = z.object({
  name: z.string().nonempty({ message: "名前を入力してください" }),
  profile: z.string().nonempty({ message: "プロフィールを入力してください" }),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
