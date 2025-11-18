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
	 const { selectedStep, platform, instance,agentProvider } = parsed.data;
	const steps = Object.values(selectedStep);
	console.log(body,"body di api olama >>>>>>>>>>>>>>>>>>>>>");
	
	try {	
		const client = await Client.connect(instance);
const prompt =`You are an AI Agent. 
You MUST ALWAYS return ONLY valid JSON as final output.

Never return explanations, logs, thoughts, warnings, or natural language.

Your task: attempt to perform human-like actions on ${platform}.  
However, if ANY action cannot be completed (captcha, login screen, element missing, navigation blocked), 
IMMEDIATELY STOP all actions and go directly to final JSON.

DO NOT attempt to bypass or solve captchas.
DO NOT simulate full browsing unless explicitly asked.
If an action cannot be performed, store an empty array/value for that step.

The steps are:

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
  "sessionId": "a12f-89sd-77jk",
  "agent": "Autonomous-Agent",
  "platform": x.com,
  "startTime": "2025-11-17T05:20:00Z",
  "endTime": "2025-11-17T05:20:30Z",
  "status": "stopped",
  "activities": [
    {
      "title": "GO TO X.com",
      "description": ""
    },
    {
      "title": "Like relevant posts",
      "description": ""
    },
    {
      "title": "Comment",
      "description": ""
    },
    {
      "title": "Follow accounts",
      "description": ""
    },
    {
      "title": "Bookmark posts",
      "description": ""
    },
    {
      "title": "Watch videos",
      "description": ""
    },
    {
      "title": "Scroll feed",
      "description": ""
    },
    {
      "title": "Create post",
      "description": ""
    }
  ],
  "summary": {
    "totalActions": 0,
    "successRate": "0%",
    "notes": "Stopped due to blocked action."
  }
}


Return ONLY valid JSON. No markdown, no text, no prefix, no suffix.
`
		// const result = await client.predict("/run_with_stream", {
		// 	agent_type: "custom",
		// 	llm_provider: "moonshot",
		
		// 	llm_model_name: "kimi-k2-turbo-preview",
		// 	// llm_model_name: "gemini-2.0-flash",
		// 	// llm_model_name: "qwen2.5:7b",
		// 	llm_num_ctx: 32000,
		// 	llm_temperature: 0.6,
		// 	// llm_base_url: "https://ollama2.tuselak.com",
		// 	llm_base_url: "https://api.moonshot.ai/v1",
		// 	//google
		// 	// llm_api_key: "AIzaSyAaFhimvoHmEE2b6M1Kzl8iVD6tN6hzma8",
		// 	//moonshot
	
		// 	llm_api_key: "sk-HxLsxySY2PQ6QUSvGpeG85h4BmqgI79gWZVs1TzmQnjlTzu6",
			
		// 	use_own_browser: true,
		// 	keep_browser_open: true,
		// 	headless: false,
		// 	disable_security: true,
		// 	window_w: 1280,
		// 	window_h: 1100,
		// 	save_recording_path: "./tmp/record_videos",
		// 	save_agent_history_path: "./tmp/agent_history",
		// 	save_trace_path: "./tmp/traces",
		// 	enable_recording: true,

		// 	task: prompt,
		// 	add_infos: "",
		// 	max_steps: 100,
		// 	use_vision: true,
		// 	max_actions_per_step: 10,
		// 	tool_calling_method: "auto",

			

		// 	max_input_tokens: 128000,
		// });
		const result = await client.predict("/run_with_stream", {
		  llm_num_ctx:16000,
           llm_temperature:0.6,
           llm_provider:"ollama",
           llm_base_url:"https://ollama.optimasi.ai",
           llm_model_name:"qwen2.5:7b",
           llm_api_key:"",
           use_own_browser:true,
           keep_browser_open:true,
           headless:false,
           disable_security:true,
           window_w:840,
           window_h:840,
           save_agent_history_path:"./tmp/agent_history",
           save_trace_path:"./tmp/traces",
           enable_recording: false,
           task:prompt,
           add_infos:"",
           max_steps:5,
           use_vision:true,
           max_actions_per_step:10,
           tool_calling_method:"json_mode",
           chrome_cdp:"",
           max_input_tokens:16000,
           
		});

// const result = await client.predict(
//            llm_num_ctx=16000,
//            llm_temperature=0.6,
//            llm_provider="ollama",
//            llm_base_url="https://ollama2.tuselak.com",
//            llm_model_name="qwen2.5:7b",
//            llm_api_key="",
//            use_own_browser=True,
//            keep_browser_open=True,
//            headless=False,
//            disable_security=True,
//            window_w=840,
//            window_h=840,
//            save_agent_history_path="./tmp/agent_history",
//            save_trace_path="./tmp/traces",
//            enable_recording=False,
//            task=prompt,
//            add_infos="",
//            max_steps=5,
//            use_vision=True,
//            max_actions_per_step=10,
//            tool_calling_method="json_mode",
//            chrome_cdp="",
//            max_input_tokens=16000,
//            api_name="/run_with_stream"
      //  )
		return Response.json({ success: true, data:result }, { status: 200 });

	} catch (error) {
		console.error("Ollama API error:", error);
		return Response.json({ success: false, error: String(error) }, { status: 500 });
	}
}
