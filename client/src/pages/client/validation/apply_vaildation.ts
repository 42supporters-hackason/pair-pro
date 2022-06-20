import { z } from "zod";

export const applySchema = z.object({
  title: z.string().nonempty({ message: "タイトルを入力してください" }),
  content: z.string().nonempty({ message: "内容を入力してください" }),
  language: z.string().nonempty({ message: "言語を入力してください" }),
  date: z.date({ required_error: "日程を入力してください" }),
});

export type ApplySchema = z.infer<typeof applySchema>;
