import { getAgentActivity } from "@/modules/agent/actions/get-agentActivity.action";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const  id  = await params;
  if (!id) {
    throw new Error("please provied the agent id")
  }
  const result = await getAgentActivity(id);
  return NextResponse.json({ result }, { status: 200 });
}
