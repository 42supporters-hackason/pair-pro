import { z } from "zod";

export const recruitFilterSchema = z.object({
  languages: z.string().array(),
  name: z.string().array(),
  keyword: z.string(),
});

export type RecruitFilterSchema = z.infer<typeof recruitFilterSchema>;
