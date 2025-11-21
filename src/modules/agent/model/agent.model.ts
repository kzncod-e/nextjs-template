import { z } from "zod";


export const AgentRequestSchema = z.object({
  selectedStep: z.record(z.string(), z.string()), // FIXED
  platform: z.enum(["tiktok.com", "x.com", "instagram.com"],"please provide the right platform"),
  instance: z.string().min(1, "Instance is required"),
  agentProvider:z.string().min(1,"agent provider is required")
});




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
