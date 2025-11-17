import { z } from "zod";

// =======================
// AGENT ACTIVITY
// =======================
const agentSchema = z.object({
  name: z.string().min(1, "Agent name required"),
  platform: z.string().min(1, "Platform required"),
  status: z.string().min(1, "Status required"),
});

const activitySchema = z.object({
  title: z.string().min(1, "Title required"),
  description: z.string().optional(),
});

// =======================
// SUMMARY
// agentId juga auto inject
// =======================
const summarySchema = z.object({
  successRate: z.string().min(1, "Success rate required"),
  notes: z.string().optional(),
});

// =======================
// FINAL COMBINED SCHEMA
// =======================
export const createFullAgentSchema = z.object({
  agent: agentSchema,
  activity: activitySchema,
  summary: summarySchema,
});

export const AgentRequestSchema = z.object({
  selectedStep: z.record(z.string(), z.string()), // FIXED
  platform: z.enum(["tiktok.com", "x.com", "instagram.com"],"please provide the right platform"),
  instance: z.string().min(1, "Instance is required"),
  agentProvider:z.string().min(1,"agent provider is required")
});




export const fullAgentResponseSchema = z.object({
  agent: z.object({
    id: z.number(),
    agent: z.string(),
    platform: z.string(),
    status: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  activity: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string().nullable().optional(),
    agentId: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  summary: z.object({
    id: z.number(),
    successRate: z.string(),
    notes: z.string().nullable().optional(),
    agentId: z.number(),
  }),
});

export type TFullAgentResponse = z.infer<typeof fullAgentResponseSchema>;
export type AgentRequest = z.infer<typeof AgentRequestSchema>;

export type TCreateFullAgent = z.infer<typeof createFullAgentSchema>;