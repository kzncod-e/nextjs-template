import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  Calendar,
  TrendingUp,
  ExternalLink,
  Zap,
  Target,
} from "lucide-react";
import { getAllAgentActivity } from "@/modules/agent/actions/get-all-agentAvtivity.action";
export default async function AgentListPage() {
  const getAllDataAgent = async () => {
    const res = await getAllAgentActivity();
    return res;
  };
  const data = await getAllDataAgent();
  // Sample data structure
  const agentFullDummy = [
    {
      agent: {
        id: "1",
        name: "Instagram Content Bot",
        platform: "Instagram",
        createdAt: new Date().toISOString(),
        status: "running",
      },
      activity: {
        title: "Posted 5 stories and engaged with 120 followers",
      },
      summary: {
        successRate: "94%",
        totalTasks: 150,
        completedToday: 12,
      },
    },
    {
      agent: {
        id: "2",
        name: "Twitter Engagement Bot",
        platform: "Twitter",
        createdAt: new Date().toISOString(),
        status: "idle",
      },
      activity: {
        title: "Replied to 45 mentions and retweeted 8 posts",
      },
      summary: {
        successRate: "87%",
        totalTasks: 89,
        completedToday: 8,
      },
    },
  ];

  const getPlatformIcon = (platform: string) => {
    const icons = {
      Instagram: "📷",
      Twitter: "🐦",
      YouTube: "📺",
      TikTok: "🎵",
    };
    return icons[platform] || "🤖";
  };

  const getStatusColor = (status) => {
    return status === "running" ? "bg-emerald-500" : "bg-slate-400";
  };
  if (data.length > 0) {
    console.log(data);
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Agent Activity Overview
              </h1>
              <p className="text-slate-600 mt-1">
                Monitor and manage your automation agents
              </p>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        {data.length > 0 && (
          <div className=" flex flex-col gap-7">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 font-medium">
                      Active Agents
                    </p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">
                      {
                        agentFullDummy.filter(
                          (a) => a.agent.status === "running"
                        ).length
                      }
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 font-medium">
                      Total Agents
                    </p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">
                      {agentFullDummy.length}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 font-medium">
                      Avg Success Rate
                    </p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">
                      {Math.round(
                        agentFullDummy.reduce(
                          (acc, a) => acc + parseInt(a.summary.successRate),
                          0
                        ) / agentFullDummy.length
                      )}
                      %
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Agent Cards Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {data.map((item, index) => {
                const { activities, summary } = item;

                return (
                  <a
                    key={item.id}
                    href={`/dashboard/agent/${item.id}`}
                    className="group block"
                  >
                    <Card className="border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 rounded-2xl overflow-hidden h-full bg-white">
                      <CardHeader className="bg-gradient-to-br from-slate-50 to-blue-50 border-b border-slate-100 pb-4">
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">
                              {getPlatformIcon(
                                item.platform ? item.platform : "instagram"
                              )}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-xl font-bold text-slate-900">
                                  {item.agent}
                                </h3>
                                <ExternalLink className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                              <p className="text-sm text-slate-600 font-normal mt-0.5">
                                {item.platform}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2.5 h-2.5 rounded-full ${getStatusColor(
                                item.status
                              )} animate-pulse`}
                            ></span>
                            <span className="text-xs font-semibold text-slate-600 capitalize">
                              {item.status}
                            </span>
                          </div>
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="p-6 space-y-5">
                        {/* Created Date */}
                        <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 rounded-lg p-3">
                          <Calendar className="w-4 h-4 text-slate-500" />
                          <span className="font-medium">Created:</span>
                          <span>
                            {new Date(item.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                        </div>

                        {/* Activity Section */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                            <h3 className="font-semibold text-slate-900">
                              Recent Activity
                            </h3>
                          </div>
                          <p className="text-slate-700 pl-4 leading-relaxed">
                            {activities.map(({ title }) => title)}
                          </p>
                        </div>

                        {/* Summary Stats */}
                        {summary ? (
                          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 space-y-3">
                            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-blue-600" />
                              Performance Metrics
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <p className="text-xs text-slate-600 font-medium mb-1">
                                  Success Rate
                                </p>
                                <p className="text-lg font-bold text-green-600">
                                  {summary && summary.successRate
                                    ? summary?.successRate
                                    : "0"}
                                </p>
                              </div>

                              {/* {summary.completedToday && (
                                <div>
                                  <p className="text-xs text-slate-600 font-medium mb-1">
                                    Today
                                  </p>
                                  <p className="text-lg font-bold text-indigo-600">
                                    {summary.completedToday}
                                  </p>
                                </div>
                              )} */}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}

                        {/* View Details Link */}
                        <div className="pt-2 border-t border-slate-100">
                          <span className="text-sm text-blue-600 font-medium group-hover:text-blue-700 flex items-center gap-1">
                            View details
                            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
