import { Client } from "@gradio/client";
import { NextRequest, NextResponse } from "next/server";
import { AgentRequestSchema } from "@/modules/agent/model/agent.model"; 
export async function POST(req: NextRequest) {
	const body = await req.json()
	 const parsed = AgentRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid request body",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }
	 const { selectedStep, platform, instance } = parsed.data;
	const steps = Object.values(selectedStep);
	console.log(body,"body di api olama >>>>>>>>>>>>>>>>>>>>>");
	
	try {	
		const client = await Client.connect(instance);
const prompt =`You are an autonomous AI Agent.  
You MUST ALWAYS return ONLY valid JSON as your final output.

Never return explanations, logs, analysis, internal thoughts, warnings, or natural language.

Your job is to *attempt* human-like actions on ${platform}.  
If ANY action fails (captcha, login page, missing elements, page blocked, puzzle, navigation failure):  
→ STOP immediately  
→ Do NOT try to bypass  
→ Do NOT simulate  
→ Set that step’s "description" to an empty string  
→ Continue building the final JSON

You must generate activities EXACTLY matching the 8 steps below.  
The "title" MUST match the step text exactly.  
The "description" MUST contain the result of the step, or be an empty string if the step failed.

STEPS:
1. GO TO ${platform}
2. ${steps[0]}
3. ${steps[1]}
4. ${steps[2]}
5. ${steps[3]}
6. ${steps[4]}
7. ${steps[5]}
8. ${steps[6]}

FINAL JSON SCHEMA (MANDATORY):

{
  "sessionId": "",
  "agent": "",
  "platform": "",
  "startTime": "",
  "endTime": "",
  "status": "",
  "activities": [
    {
      "title": "",
      "description": ""
    }
  ],
  "summary": {
    "totalActions": 0,
    "successRate": "",
    "notes": ""
  }
}

Return ONLY valid JSON. No markdown. No text. No prefix. No suffix.`
		const result = await client.predict("/run_with_stream", {
			agent_type: "custom",
			llm_provider: "google",
		
			llm_model_name: "gemini-2.0-flash",
			// llm_model_name: "qwen2.5:7b",
			llm_num_ctx: 32000,
			llm_temperature: 0.6,
			// llm_base_url: "https://ollama2.tuselak.com",
			llm_api_key: "AIzaSyAaFhimvoHmEE2b6M1Kzl8iVD6tN6hzma8",
			// llm_api_key: "AIzaSyAaFhimvoHmEE2b6M1Kzl8iVD6tN6hzma8",
			use_own_browser: true,
			keep_browser_open: true,
			headless: false,
			disable_security: true,
			window_w: 1280,
			window_h: 1100,
			save_recording_path: "./tmp/record_videos",
			save_agent_history_path: "./tmp/agent_history",
			save_trace_path: "./tmp/traces",
			enable_recording: true,

			task: prompt,
			add_infos: "",
			max_steps: 100,
			use_vision: true,
			max_actions_per_step: 10,
			tool_calling_method: "auto",

			

			max_input_tokens: 128000,
		});

		return Response.json({ success: true, data:result }, { status: 200 });

	} catch (error) {
		console.error("Ollama API error:", error);
		return Response.json({ success: false, error: String(error) }, { status: 500 });
	}
}
