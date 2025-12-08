import { Client } from "@gradio/client";
import { connect } from "amqplib";
import { v4 as uuid } from "uuid";
import { NextRequest, NextResponse } from "next/server";
import { AgentRequestSchema } from "@/modules/agent/model/agent.model"; 
export async function POST(req: NextRequest) {

const connection = await connect("amqp://guest:guest@localhost:5672/");
const channel = await connection.createChannel();
	const body = await req.json()
	 const taskId = uuid();
	 const parsed = AgentRequestSchema.safeParse(body);
    const queue = "ai_tasks";
	
    await channel.assertQueue(queue, { durable: true });
    // if (!parsed.success) {
	// 	return NextResponse.json(
	// 		{
	// 			error: "Invalid request body",
	// 			details: parsed.error.flatten(),
	// 		},
	// 		{ status: 400 }
	// 	);
    // }
	const { selectedStep, platform, instance,agentProvider } = body;
	const job = {
		 taskId,
		 platform,
		 selectedStep,

	   };
   channel.sendToQueue(queue, Buffer.from(JSON.stringify(job)), {
      persistent: true,
    });

	     console.log("✔ Job dikirim ke RabbitMQ:", job);

  
	// const steps = Object.values(selectedStep);
	console.log(body,"body di api olama >>>>>>>>>>>>>>>>>>>>>");
	
	try {	
// 		const client = await Client.connect(instance);
// const prompt =`You are an AI Agent. 
// You MUST ALWAYS return ONLY valid JSON as final output.

// Never return explanations, logs, thoughts, warnings, or natural language.

// Your task: attempt to perform human-like actions on ${platform}.  
// However, if ANY action cannot be completed (captcha, login screen, element missing, navigation blocked), 
// IMMEDIATELY STOP all actions and go directly to final JSON.

// DO NOT attempt to bypass or solve captchas.
// DO NOT simulate full browsing unless explicitly asked.
// If an action cannot be performed, store an empty array/value for that step.

// The steps are:

// 1. GO TO ${platform}
// 2. ${steps[0]}
// 3. ${steps[1]}
// 4. ${steps[2]}
// 5. ${steps[3]}
// 6. ${steps[4]}
// 7. ${steps[5]}
// 8. ${steps[6]}

// FINAL JSON SCHEMA (MANDATORY):


// {
//   "sessionId": "a12f-89sd-77jk",
//   "agent": "Autonomous-Agent",
//   "platform": x.com,
//   "startTime": "2025-11-17T05:20:00Z",
//   "endTime": "2025-11-17T05:20:30Z",
//   "status": "stopped",
//   "activities": [
//     {
//       "title": "GO TO X.com",
//       "description": ""
//     },
//     {
//       "title": "Like relevant posts",
//       "description": ""
//     },
//     {
//       "title": "Comment",
//       "description": ""
//     },
//     {
//       "title": "Follow accounts",
//       "description": ""
//     },
//     {
//       "title": "Bookmark posts",
//       "description": ""
//     },
//     {
//       "title": "Watch videos",
//       "description": ""
//     },
//     {
//       "title": "Scroll feed",
//       "description": ""
//     },
//     {
//       "title": "Create post",
//       "description": ""
//     }
//   ],
//   "summary": {
//     "totalActions": 0,
//     "successRate": "0%",
//     "notes": "Stopped due to blocked action."
//   }
// }


// Return ONLY valid JSON. No markdown, no text, no prefix, no suffix.
// `
	
// 		const result = await client.predict("/run_with_stream", {
// 		  llm_num_ctx:16000,
//            llm_temperature:0.6,
//            llm_provider:"ollama",
//            llm_base_url:"https://ollama.optimasi.ai",
//            llm_model_name:"qwen2.5:7b",
//            llm_api_key:"",
//            use_own_browser:true,
//            keep_browser_open:true,
//            headless:false,
//            disable_security:true,
//            window_w:840,
//            window_h:840,
//            save_agent_history_path:"./tmp/agent_history",
//            save_trace_path:"./tmp/traces",
//            enable_recording: false,
//            task:prompt,
//            add_infos:"",
//            max_steps:5,
//            use_vision:true,
//            max_actions_per_step:10,
//            tool_calling_method:"json_mode",
//            chrome_cdp:"",
//            max_input_tokens:16000,
           
// 		});


		return Response.json({ taskId}, { status: 200 });

	} catch (error) {
		console.error("Ollama API error:", error);
		return Response.json({ success: false, error: String(error) }, { status: 500 });
	}
}
