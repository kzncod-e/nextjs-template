import {  getDb,  } from "@/db";
import { agentActivity, AgentActivity } from "../schema/agent.schema";
import { eq } from "drizzle-orm";

export async function getAgentActivity({id}:{id:string}):Promise<AgentActivity | undefined>{
  const db = await getDb();


  const result = await db.query.agentActivity.findFirst({
    where:eq(agentActivity.id,Number(id)),
    with:{
        summary:true,
        activities:true
    }
  });
if(!result) throw new Error("agent not found")
  return result; 
}
