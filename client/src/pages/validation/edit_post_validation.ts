import { z } from "zod";

export const editPostSchema = z.object({
  title: z.string().nonempty({ message: "タイトルを入力してください" }),
  content: z.string().nonempty({ message: "内容を入力してください" }),
  language: z.string().array().nonempty({ message: "言語を入力してください" }),
});

export type EditPostSchema = z.infer<typeof editPostSchema>;
