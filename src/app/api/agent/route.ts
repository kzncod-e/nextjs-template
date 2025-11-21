import { createAgentActivity } from "@/modules/agent/actions/create-agent.action";
import { getAllAgentActivity } from "@/modules/agent/actions/get-all-agentAvtivity.action";
import { createFullAgentSchema } from "@/modules/agent/model/agent.model";


import { NextRequest, NextResponse } from "next/server";
import z from "zod";
type AgentData =z.infer<typeof createFullAgentSchema>;
export async function POST(req: NextRequest) {
 
  const body: { agentData: AgentData } = await req.json();
  console.log(body.agentData);
  
  const parsed =createFullAgentSchema.safeParse(body.agentData);
  if (!parsed.success) {
    return NextResponse.json(
      { error:parsed.error.message},
      { status: 400 }
    );
  }

  const result = await createAgentActivity(parsed.data);

  return NextResponse.json({data:result}, { status: 201 });

  }

export async function GET(req: NextRequest) {
  try {

    const result = await getAllAgentActivity()
    return NextResponse.json({data:result},{status:200,})
  } catch (error) {
    return NextResponse.json({message:"failed to get ai report"})
  }

}
