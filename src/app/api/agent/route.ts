import { createAgentActivity } from "@/modules/agent/actions/create-agent.action";
import { createFullAgentSchema } from "@/modules/agent/model/agent.model";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";

export async function POST(req: NextRequest) {
  const body = await req.json();

  
  const parsed = createFullAgentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0].message },
      { status: 400 }
    );
  }

  const result = await createAgentActivity(parsed.data);

  return NextResponse.json(result, { status: 201 });

  }

export async function GET() {
  
  
}