import { z } from "zod";

export const applySchema = z.object({
  title: z.string(),
  content: z.string(),
  language: z.string(),
  date: z.date(),
});

export type ApplySchema = z.infer<typeof applySchema>;
