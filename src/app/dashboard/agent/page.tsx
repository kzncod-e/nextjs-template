import AgentListPage from "@/modules/agent/components/agent-list.page";
import { Activity } from "lucide-react";
import React from "react";

const page = () => {
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
        <AgentListPage />
      </div>
    </div>
  );
};

export default page;
