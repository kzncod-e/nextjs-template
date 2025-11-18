import { getAgentActivity } from "@/modules/agent/actions/get-agentActivity.action";
import { NextResponse } from "next/server";

export async function GET( req: Request,
  { params }: { params: { id: string;  }}){
const id = params
if(!id){
    return NextResponse.json({message:"please provide the agent id"},{status:400})
}
const result = await getAgentActivity(Number(id))
return NextResponse.json({result},{status:200})
}