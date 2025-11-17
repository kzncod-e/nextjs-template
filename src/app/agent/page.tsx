"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { agentFullDummy } from "@/modules/dashboard/data";
export default function AgentListPage() {
  return (
    <motion.div
      className="p-8 max-w-5xl mx-auto space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-4xl font-bold">Agent Activity Overview</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {agentFullDummy.map((item, index) => {
          const { agent, activity, summary } = item;

          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/dashboard/agent/${agent.id}`}>
                <Card className="border shadow-md hover:shadow-xl transition rounded-xl cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      <span>{agent.name}</span>
                      {/* <span
                        className={`px-3 py-1 text-sm rounded-full ${
                          agent.status === "running"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {agent.status}
                      </span> */}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Agent Info */}
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        <strong>Platform:</strong> {agent.platform}
                      </p>
                      <p>
                        <strong>Created:</strong>{" "}
                        {new Date(agent.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="border-b my-3"></div>

                    {/* Activity */}
                    <div>
                      <h3 className="font-semibold mb-1">Recent Activity</h3>
                      <p className="text-gray-700">{activity.title}</p>
                    </div>

                    <div className="border-b my-3"></div>

                    {/* Summary */}
                    <div>
                      <h3 className="font-semibold mb-1">Summary</h3>
                      <p>
                        <strong>Success Rate:</strong> {summary.successRate}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
