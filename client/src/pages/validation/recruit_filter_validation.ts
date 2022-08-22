import { z } from "zod";

export const recruitFilterSchema = z.object({
  language: z.string(),
  name: z.string(),
  keyword: z.string(),
});

export type RecruitFilterSchema = z.infer<typeof recruitFilterSchema>;
