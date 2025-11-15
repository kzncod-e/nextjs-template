import { Client } from "@gradio/client";

export async function POST(req: Request) {
	try {
		const client = await Client.connect("http://103.215.228.166:7813/");

		const result = await client.predict("/run_with_stream", {
			agent_type: "custom",
			llm_provider: "google",
			llm_model_name: "gemini-2.0-flash",
			llm_num_ctx: 32000,
			llm_temperature: 0.6,
			llm_base_url: "",
			llm_api_key: "AIzaSyAaFhimvoHmEE2b6M1Kzl8iVD6tN6hzma8",
			use_own_browser: true,
			keep_browser_open: false,
			headless: false,
			disable_security: true,
			window_w: 1280,
			window_h: 1100,
			save_recording_path: "./tmp/record_videos",
			save_agent_history_path: "./tmp/agent_history",
			save_trace_path: "./tmp/traces",
			enable_recording: true,

			task: "go to google.com and type 'OpenAI' click search and give me the first url",
			add_infos: "",
			max_steps: 100,
			use_vision: true,
			max_actions_per_step: 10,
			tool_calling_method: "auto",

			chrome_cdp: "http://103.215.228.166:9247",

			max_input_tokens: 128000,
		});

		return Response.json({ success: true, data: result }, { status: 200 });

	} catch (error) {
		console.error("Ollama API error:", error);
		return Response.json({ success: false, error: String(error) }, { status: 500 });
	}
}
