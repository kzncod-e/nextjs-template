import {  activity, getDb, summary,  } from "@/db";

export async function getAllAgentActivity (){
    const db = await getDb()
    const result = await db.query.agentActivity.findMany({with:{activity:true,summary:true}})
}