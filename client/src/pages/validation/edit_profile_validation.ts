import { z } from "zod";

export const editProfileSchema = z.object({
  name: z.string().nonempty({ message: "名前を入力してください" }),
  bio: z.string(),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
