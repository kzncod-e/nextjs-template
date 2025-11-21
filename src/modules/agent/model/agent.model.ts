import { z } from "zod";




export const createFullAgentSchema = z.object({
  sessionId: z.string(),
  agent: z.string(),
  platform: z.string(),
  status: z.string(),
  activities: z.array(
    z.object({
      title: z.string(),
      description: z.string()
    })
  ),
  summary: z.object({
    totalActions: z.number(),
    successRate: z.string(),
    notes: z.string()
  })
});

export type CreateAgentType = z.infer<typeof createFullAgentSchema>;
