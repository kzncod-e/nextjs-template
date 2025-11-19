import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  Activity,
  Sparkles,
  Info,
  FileText,
  TrendingUp,
  X,
  Save,
} from "lucide-react";
interface AgentOverviewType {
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default function AgentOverview({
  onConfirm,
  onCancel,
}: AgentOverviewType) {
  // Sample data structure
  const agentFullDummy = [
    {
      agent: {
        name: "Instagram Content Bot",
        platform: "Instagram",
        status: "success",
      },
      activity: {
        title: "Posted 5 stories and engaged with 120 followers",
        description:
          "Successfully completed all scheduled tasks including content posting and user engagement.",
      },
      summary: {
        successRate: "94%",
        notes:
          "All operations completed within expected timeframe. No errors encountered.",
      },
    },
  ];

  const { agent, activity, summary } = agentFullDummy[0];

  const statusColor =
    agent.status === "success" ? "text-green-600" : "text-red-600";
  const statusBg =
    agent.status === "success"
      ? "bg-green-50 border-green-200"
      : "bg-red-50 border-red-200";
  const StatusIcon = agent.status === "success" ? CheckCircle : XCircle;

  type Platform = "Instagram" | "Twitter" | "YouTube" | "TikTok";

  const getPlatformIcon = (platform: string) => {
    const icons = {
      Instagram: "📷",
      Twitter: "🐦",
      YouTube: "📺",
      TikTok: "🎵",
    } as const;
    return icons[platform as keyof typeof icons] || "🤖";
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl">
        <Card className="shadow-2xl rounded-2xl overflow-hidden bg-white">
          {/* Header */}
          <CardHeader className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white py-8">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Activity className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-3xl font-bold">
                    Agent Activity Overview
                  </CardTitle>
                </div>
                <p className="text-blue-100 text-sm pl-14">
                  Review the result of the agent run before saving
                </p>
              </div>
              <button
                onClick={onCancel}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </CardHeader>

          <CardContent className="p-8 space-y-6">
            {/* Agent Info Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-600" />
                  Agent Info
                </h3>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 space-y-4 border border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">
                      {getPlatformIcon(agent.platform)}
                    </span>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">
                        {agent?.name}
                      </h4>
                      <p className="text-sm text-slate-600 mt-0.5">
                        Automation Agent
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${statusBg} ${statusColor} border px-4 py-1.5 font-semibold flex items-center gap-2`}
                  >
                    <StatusIcon className="w-4 h-4" />
                    {agent?.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Platform
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-700 hover:bg-blue-100"
                      >
                        {agent.platform}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Status
                    </p>
                    <p className={`font-semibold ${statusColor} capitalize`}>
                      {agent?.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Activity
                </h3>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 space-y-4 border border-purple-200">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <p className="text-sm font-semibold text-slate-600 min-w-[80px]">
                      Title:
                    </p>
                    <p className="text-slate-900 font-medium flex-1">
                      {activity?.title}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-purple-200">
                  <div className="flex items-start gap-2">
                    <p className="text-sm font-semibold text-slate-600 min-w-[80px]">
                      Description:
                    </p>
                    <p className="text-slate-700 flex-1 leading-relaxed">
                      {activity?.description || (
                        <span className="text-slate-400 italic">
                          No description provided
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Summary
                </h3>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 space-y-4 border border-green-200">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-600 mb-2">
                      Success Rate
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="text-3xl font-bold text-green-600">
                        {summary?.successRate}
                      </div>
                      <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                          style={{ width: summary?.successRate }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-green-200">
                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-slate-500 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-600 mb-1">
                        Notes:
                      </p>
                      <p className="text-slate-700 leading-relaxed">
                        {summary?.notes || (
                          <span className="text-slate-400 italic">
                            No notes available
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200">
              <Button
                onClick={onCancel}
                variant="outline"
                className="px-6 border-slate-300 hover:bg-slate-100 hover:border-slate-400 transition-colors"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={onConfirm}
                className="px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
