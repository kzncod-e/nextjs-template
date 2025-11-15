import { AgentActivitySession } from "@/modules/todos/models/agent-activity";
import React from "react";

const AgentActivity = ({ dummyData }: { dummyData: AgentActivitySession }) => {
  return (
    <div className="space-y-6">
      {/* 📝 Posted Content */}
      {dummyData.activities
        .filter(
          (a): a is Extract<typeof a, { type: "post" }> => a.type === "post"
        )
        .map((post, i) => (
          <div
            key={i}
            className="rounded-lg border border-gray-200 bg-white p-4"
          >
            <h2 className="text-lg font-semibold mb-2">📝 Posted Content</h2>
            <p className="font-medium">{post.post.title}</p>
            <p className="text-gray-600 text-sm">{post.post.caption}</p>
            <a
              href={post.post.link}
              target="_blank"
              className="text-blue-600 hover:underline text-sm"
            >
              View Post
            </a>
          </div>
        ))}

      {/* ❤️ Liked Posts */}
      {dummyData.activities.some((a) => a.type === "like") && (
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="text-lg font-semibold mb-2">❤️ Liked Posts</h2>
          <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
            {dummyData.activities
              .filter(
                (a): a is Extract<typeof a, { type: "like" }> =>
                  a.type === "like"
              )
              .flatMap((a) => a.likedPosts)
              .map((p, i) => (
                <li key={i}>
                  {p.title} <span className="text-gray-500">by {p.author}</span>
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* 💬 Comments */}
      {dummyData.activities.some((a) => a.type === "comment") && (
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="text-lg font-semibold mb-2">💬 Comments</h2>
          <ul className="list-disc ml-5 text-sm text-gray-700 space-y-2">
            {dummyData.activities
              .filter(
                (a): a is Extract<typeof a, { type: "comment" }> =>
                  a.type === "comment"
              )
              .flatMap((a) => a.commentedPosts)
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

      {/* 👥 Followed Accounts */}
      {dummyData.activities.some((a) => a.type === "follow") && (
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="text-lg font-semibold mb-2">👥 Followed Accounts</h2>
          <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
            {dummyData.activities
              .filter(
                (a): a is Extract<typeof a, { type: "follow" }> =>
                  a.type === "follow"
              )
              .flatMap((a) => a.followedAccounts)
              .map((f, i) => (
                <li key={i}>
                  {f.name} (<span className="text-gray-500">{f.username}</span>)
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* 📌 Saved Posts */}
      {dummyData.activities.some((a) => a.type === "bookmark") && (
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="text-lg font-semibold mb-2">📌 Saved Posts</h2>
          <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
            {dummyData.activities
              .filter(
                (a): a is Extract<typeof a, { type: "bookmark" }> =>
                  a.type === "bookmark"
              )
              .flatMap((a) => a.savedPosts)
              .map((s, i) => (
                <li key={i}>{s.title}</li>
              ))}
          </ul>
        </div>
      )}

      {/* 🎥 Watched Videos */}
      {dummyData.activities.some((a) => a.type === "watch_video") && (
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="text-lg font-semibold mb-2">🎥 Watched Videos</h2>
          <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
            {dummyData.activities
              .filter(
                (a): a is Extract<typeof a, { type: "watch_video" }> =>
                  a.type === "watch_video"
              )
              .flatMap((a) => a.videos)
              .map((v, i) => (
                <li key={i}>
                  {v.title} —{" "}
                  <span className="text-gray-500">{v.duration}</span>
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* 📱 Viewed Feed */}
      {dummyData.activities.some((a) => a.type === "scroll_feed") && (
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="text-lg font-semibold mb-2">📱 Feed Viewed</h2>
          <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
            {dummyData.activities
              .filter(
                (a): a is Extract<typeof a, { type: "scroll_feed" }> =>
                  a.type === "scroll_feed"
              )
              .flatMap((a) => a.viewedPosts)
              .map((v, i) => (
                <li key={i}>
                  {v.title} <span className="text-gray-500">by {v.author}</span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AgentActivity;
