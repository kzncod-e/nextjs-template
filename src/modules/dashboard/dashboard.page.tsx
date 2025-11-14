"use client";

import { useEffect, useState } from "react";
import { dummyData } from "./dummyData";
import axios from "axios";

export default function DashboardPage() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const getAi = async () => {
		try {
			console.log("🚀 Starting Ollama API call...");
			setLoading(true);
			setError(null);
			
			console.log("📡 Sending POST request to /api/ollama");
			const res = await axios.post("/api/ollama");
			
			console.log("✅ Response received:", res);
			console.log("Response data:", res.data);
			
			if (res.data.success) {
				setData(res.data.data);
				console.log("✨ Ollama result stored in state:", res.data.data);
			} else {
				setError(res.data.error || "Failed to fetch ollama data");
				console.warn("⚠️ API returned error:", res.data.error);
			}
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
			setError(errorMessage);
			console.error("❌ Error fetching ollama:", error);
			console.error("Error message:", errorMessage);
		} finally {
			setLoading(false);
			console.log("✅ Loading complete");
		}
	};

	useEffect(() => {
		console.log("🎯 Dashboard page mounted, calling getAi()");
		getAi();
	}, []);

	return (
		<div className="min-h-screen bg-white text-gray-900 p-8">
			<div className="max-w-5xl mx-auto space-y-8">
				{/* Debug Info - Remove in production */}
				<div className="rounded-lg border border-yellow-300 bg-yellow-50 p-4">
					<p className="text-sm font-semibold text-yellow-900">🔧 Debug Info</p>
					<p className="text-sm text-yellow-800 mt-2">
						Loading: <span className="font-mono font-bold">{loading ? "true" : "false"}</span>
					</p>
					<p className="text-sm text-yellow-800">
						Error: <span className="font-mono font-bold">{error || "none"}</span>
					</p>
					<p className="text-sm text-yellow-800">
						Data: <span className="font-mono font-bold">{data ? "loaded" : "empty"}</span>
					</p>
				</div>

				{/* Header */}
				<div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">AI Agent Overview</h1>
          <button
            onClick={() => window.location.reload()}
            className="rounded-md border border-gray-300 bg-gray-50 hover:bg-gray-100 px-4 py-2 text-sm font-medium"
          >
            Refresh Data
          </button>
        </div>

        {/* Agent Info */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-500">Agent Session</p>
            <p className="text-base font-medium">{dummyData.sessionId}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-500">Platform</p>
            <p className="text-base font-medium">{dummyData.platform}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="text-sm text-gray-500">Status</p>
            <p className="text-base font-medium text-green-600 capitalize">
              {dummyData.status}
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500 mb-2">Summary</p>
          <ul className="text-sm space-y-1 text-gray-700">
            <li>
              Total Actions: <span className="font-medium">{dummyData.summary.totalActions}</span>
            </li>
            <li>
              Success Rate:{" "}
              <span className="font-medium text-green-600">{dummyData.summary.successRate}</span>
            </li>
            <li>Notes: {dummyData.summary.notes}</li>
          </ul>
        </div>

        {/* Detailed Data */}
        <div className="space-y-6">
          {/* Posted Content */}
          {dummyData.activities
            .filter((a) => a.type === "post")
            .map((post, i) => (
              <div key={i} className="rounded-lg border border-gray-200 bg-white p-4">
                <h2 className="text-lg font-semibold mb-2">📝 Posted Content</h2>
                {post.post && (
                  <>
                    <p className="font-medium">{post.post.title}</p>
                    <p className="text-gray-600 text-sm">{post.post.caption}</p>
                    <a
                      href={post.post.link}
                      target="_blank"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View Post
                    </a>
                  </>
                )}
              </div>
            ))}

          {/* Liked Posts */}
          {dummyData.activities.some((a) => a.likedPosts) && (
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h2 className="text-lg font-semibold mb-2">❤️ Liked Posts</h2>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                {dummyData.activities
                  .filter((a) => a.likedPosts)
                  .flatMap((a) => a.likedPosts!)
                  .map((p, i) => (
                    <li key={i}>
                      {p.title}{" "}
                      <span className="text-gray-500">by {p.author}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {/* Commented Posts */}
          {dummyData.activities.some((a) => a.commentedPosts) && (
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h2 className="text-lg font-semibold mb-2">💬 Comments</h2>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-2">
                {dummyData.activities
                  .filter((a) => a.commentedPosts)
                  .flatMap((a) => a.commentedPosts!)
                  .map((c, i) => (
                    <li key={i}>
                      <p className="font-medium">{c.title}</p>
                      <p className="text-gray-500 text-sm">by {c.author}</p>
                      <p className="text-gray-700 mt-1">Comment: {c.comment}</p>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {/* Followed Accounts */}
          {dummyData.activities.some((a) => a.followedAccounts) && (
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h2 className="text-lg font-semibold mb-2">👥 Followed Accounts</h2>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                {dummyData.activities
                  .filter((a) => a.followedAccounts)
                  .flatMap((a) => a.followedAccounts!)
                  .map((f, i) => (
                    <li key={i}>
                      {f.name} (<span className="text-gray-500">{f.username}</span>)
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {/* Saved Posts */}
          {dummyData.activities.some((a) => a.savedPosts) && (
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h2 className="text-lg font-semibold mb-2">📌 Saved Posts</h2>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                {dummyData.activities
                  .filter((a) => a.savedPosts)
                  .flatMap((a) => a.savedPosts!)
                  .map((s, i) => (
                    <li key={i}>{s.title}</li>
                  ))}
              </ul>
            </div>
          )}

          {/* Watched Videos */}
          {dummyData.activities.some((a) => a.videos) && (
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h2 className="text-lg font-semibold mb-2">🎥 Watched Videos</h2>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                {dummyData.activities
                  .filter((a) => a.videos)
                  .flatMap((a) => a.videos!)
                  .map((v, i) => (
                    <li key={i}>
                      {v.title} — <span className="text-gray-500">{v.duration}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {/* Viewed Feed */}
          {dummyData.activities.some((a) => a.viewedPosts) && (
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h2 className="text-lg font-semibold mb-2">📱 Feed Viewed</h2>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                {dummyData.activities
                  .filter((a) => a.viewedPosts)
                  .flatMap((a) => a.viewedPosts!)
                  .map((v, i) => (
                    <li key={i}>
                      {v.title} <span className="text-gray-500">by {v.author}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
