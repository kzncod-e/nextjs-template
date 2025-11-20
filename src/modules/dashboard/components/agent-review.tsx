"use client";
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

import React from "react";
import { useAgentStore } from "@/store/agent.store";
import axios from "axios";

export default function AgentOverview() {
  // hook pertama → selalu konsisten
  const agentData = useAgentStore((s) => s.agentData);

  // hook kedua → tetap konsisten urutannya
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // baru return null di bawah HOOKS
  if (!mounted) return null;

  const getPlatformIcon = (platform?: string) => {
    const icons: Record<string, string> = {
      Instagram: "📷",
      Twitter: "🐦",
      "x.com": "🐦",
      YouTube: "📺",
      TikTok: "🎵",
    };
    return icons[platform ?? ""] ?? "🤖";
  };

  // dynamic status styling (fallback aman)
  const isSuccess = agentData?.status === "success";
  const statusColor = isSuccess ? "text-green-600" : "text-red-600";
  const statusBg = isSuccess
    ? "bg-green-50 border-green-200"
    : "bg-red-50 border-red-200";
  const StatusIcon = isSuccess ? CheckCircle : XCircle;
  const handleSave = async () => {
    try {
      const res = await axios.post("/api/agent", { agentData });
      if (res.status == 201) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
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
                // onClick={onCancel}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </CardHeader>

          <CardContent className="p-8 space-y-6">
            {/* Agent Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-600" />
                  Agent Info
                </h3>
              </div>

              {agentData && (
                <div className="flex flex-col">
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 space-y-4 border border-slate-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">
                          {getPlatformIcon(agentData.platform)}
                        </span>

                        <div>
                          <h4 className="text-lg font-bold text-slate-900">
                            {agentData.agent}
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
                        {agentData.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                      <div>
                        <p className="text-xs font-medium text-slate-500 uppercase">
                          Platform
                        </p>
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                          {agentData.platform}
                        </Badge>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-slate-500 uppercase">
                          Status
                        </p>
                        <p
                          className={`font-semibold capitalize ${statusColor}`}
                        >
                          {agentData.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Activities */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    Activities
                  </h3>
                </div>

                {agentData?.activities?.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200"
                  >
                    <div className="flex items-start gap-2 mb-3">
                      <p className="text-sm font-semibold text-slate-600 min-w-[80px]">
                        Title:
                      </p>
                      <p className="text-slate-900 font-medium">{item.title}</p>
                    </div>

                    <div className="pt-4 border-t border-purple-200 flex items-start gap-2">
                      <p className="text-sm font-semibold text-slate-600 min-w-[80px]">
                        Description:
                      </p>
                      <p className="text-slate-700 leading-relaxed italic">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Summary
                  </h3>
                </div>

                {agentData?.summary && (
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-600 mb-2">
                          Success Rate
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="text-3xl font-bold text-green-600">
                            {agentData.summary.successRate}
                          </div>
                          <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                              style={{ width: agentData.summary.successRate }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-green-200 flex items-start gap-2">
                      <FileText className="w-4 h-4 text-slate-500 mt-1" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-600 mb-1">
                          Notes:
                        </p>
                        <p className="text-slate-700 leading-relaxed italic">
                          {agentData.summary.notes}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer buttons */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200">
              <Button
                // onClick={onCancel}
                variant="outline"
                className="px-6 border-slate-300 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>

              <Button
                onClick={handleSave}
                className="px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
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
