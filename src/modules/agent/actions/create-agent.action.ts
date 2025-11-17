import { getDb } from "@/db";
import {
  createFullAgentSchema,
  fullAgentResponseSchema,
  TCreateFullAgent,
} from "../model/agent.model";

import { agentActivity, activity, summary } from "../schema/agent.schema";

export async function createAgentActivity(input: TCreateFullAgent) {
  const parsed = createFullAgentSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(parsed.error.errors[0].message);
  }

  const db = await getDb();
  const { agent, activity: act, summary: sum } = parsed.data;

  
  const agentRes = await db
    .insert(agentActivity)
    .values({
      agent: agent.name,
      platform: agent.platform,
      status: agent.status,
    })
    // untutk mengembalikan table yang baru dibuat
    .returning();
// karena responsenya adalah array kita ambil data pertama
  const createdAgent = agentRes[0];

  // 2. Insert activity
  const activityRes = await db
    .insert(activity)
    .values({
      title: act.title,
      description: act.description ?? null,
      // masukan id agentActivity yang baru dibuat
      agentId: createdAgent.id,
    })
    .returning();

  const createdActivity = activityRes[0];

  // 3. Insert summary
  const summaryRes = await db
    .insert(summary)
    .values({
      successRate: sum.successRate,
      notes: sum.notes ?? null,
      agentId: createdAgent.id,
    })
    .returning();

  const createdSummary = summaryRes[0];

  const result = {
    agent: createdAgent,
    activity: createdActivity,
    summary: createdSummary,
  };

  return fullAgentResponseSchema.parse(result);
}
