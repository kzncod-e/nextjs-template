import { activity, agentActivity, getDb, summary } from "@/db";
import { CreateAgentType, createFullAgentSchema } from "../model/agent.model";

export async function createAgentActivity(input: CreateAgentType) {
  const parsed = createFullAgentSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  const db = await getDb();
  const data = parsed.data;

  // 1. Insert Agent
  const [createdAgent] = await db
    .insert(agentActivity)
    .values({

      agent: data.agent,
      platform: data.platform,
      status: data.status,
    })
    .returning();

  // 2. Insert all activities (LOOP)
  for (const act of data.activities) {
    await db.insert(activity).values({
      title: act.title,
      description: act.description,
      agentId: createdAgent.id,
    });
  }

  // 3. Insert summary
  const [createdSummary] = await db
    .insert(summary)
    .values({
      
      successRate: data.summary.successRate,
      notes: data.summary.notes,
      agentId: createdAgent.id,
    })
    .returning();

  return {
    agent: createdAgent,
    summary: createdSummary,
  };
}
