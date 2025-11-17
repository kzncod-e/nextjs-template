"use client";

import { useParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { agentFullDummy } from "../../../../modules/dashboard/data";

export default function AgentDetailPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const data = agentFullDummy.find((d) => d.agent.id === id);

  if (!data) {
    return (
      <div className="p-10 text-center text-xl text-gray-500">
        Data tidak ditemukan
      </div>
    );
  }

  const { agent, activity, summary } = data;

  return (
    <motion.div
      className="max-w-3xl mx-auto p-8 space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Back Button */}
      <Link
        href="/dashboard"
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-black"
      >
        <ArrowLeft size={18} />
        Back to Agents
      </Link>

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-4xl font-bold">{agent.name}</h1>
        <p className="text-gray-500 mt-1">{agent.platform} Agent</p>
      </motion.div>

      {/* AGENT CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Agent Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700">
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded ${
                  agent.status === "running"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {agent.status}
              </span>
            </p>

            <p>
              <strong>Platform:</strong> {agent.platform}
            </p>

            <p>
              <strong>Created:</strong>{" "}
              {new Date(agent.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Updated:</strong>{" "}
              {new Date(agent.updatedAt).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* ACTIVITY CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Latest Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700">
            <p>
              <strong>Title:</strong> {activity.title}
            </p>
            <p>
              <strong>Description:</strong> {activity.description}
            </p>
            <p>
              <strong>Time:</strong>{" "}
              {new Date(activity.createdAt).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* SUMMARY CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700">
            <p>
              <strong>Success Rate:</strong> {summary.successRate}
            </p>
            <p>
              <strong>Notes:</strong> {summary.notes}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
