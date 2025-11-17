import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Activity, Sparkles } from "lucide-react";
import { agentFullDummy } from "../data";

// Enhanced UI version
export default function AgentOverview({ onConfirm, onCancel }) {
  const { agent, activity, summary } = agentFullDummy[0];

  const statusColor =
    agent.status === "success" ? "text-green-600" : "text-red-600";
  const StatusIcon = agent.status === "success" ? CheckCircle : XCircle;

  return (
    <div className="w-full flex justify-center mt-10 animate-fadeIn">
      <Card className="w-[42rem] shadow-2xl p-6 rounded-3xl border border-gray-200 bg-white/90 backdrop-blur-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-3xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-yellow-500" />
            Agent Activity Overview
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Review the result of the agent run before saving.
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Agent Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" /> Agent Info
            </h3>
            <div className="text-sm text-gray-700 bg-gray-50 p-4 rounded-xl border">
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium text-gray-800 text-lg">
                  {agent?.name}
                </p>
                <Badge className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md capitalize">
                  {agent.platform}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <StatusIcon className={`h-5 w-5 ${statusColor}`} />
                <span className={`font-semibold ${statusColor} capitalize`}>
                  {agent?.status}
                </span>
              </div>
            </div>
          </div>

          {/* Activity */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Activity</h3>
            <div className="text-sm bg-gray-50 p-4 rounded-xl border text-gray-700">
              <p className="mb-1">
                <strong>Title:</strong> {activity?.title}
              </p>
              <p>
                <strong>Description:</strong> {activity?.description || "-"}
              </p>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Summary</h3>
            <div className="text-sm bg-gray-50 p-4 rounded-xl border text-gray-700">
              <p className="mb-1">
                <strong>Success Rate:</strong> {summary?.successRate}
              </p>
              <p>
                <strong>Notes:</strong> {summary?.notes || "-"}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <Button
              variant="outline"
              onClick={onCancel}
              className="px-6 py-2 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow-md"
              onClick={onConfirm}
            >
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
