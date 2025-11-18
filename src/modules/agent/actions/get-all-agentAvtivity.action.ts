import {  getDb,  } from "@/db";
import { AgentActivity } from "../schema/agent.schema";




export async function getAllAgentActivity():Promise<AgentActivity[]>{
  const db = await getDb();

  const result = await db.query.agentActivity.findMany({
    with: {
      activities: true,
      summary: true,
    },
  });

  return result; 
}
