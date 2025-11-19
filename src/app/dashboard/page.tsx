import AgentListPage from "@/modules/agent/components/agent-list.page";
import AgentOverview from "@/modules/dashboard/components/agent-review";
import DashboardPage from "@/modules/dashboard/dashboard.page";
import Dashboard from "@/modules/dashboard/dashboard.page";
import DashboardLoader from "@/modules/todos/components/loader";
import { Settings } from "lucide-react";

export default async function Page() {
  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Debug Info - Remove in production */}

        {/* Header */}
        <div className="flex flex-col items-center justify-between">
          <h1 className="text-2xl  my-6 font-bold">Ai Prompt</h1>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
              <div className="flex items-center gap-3">
                <Settings className="w-8 h-8 text-white" />
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Configuration
                  </h2>
                  <p className="text-blue-100 text-sm mt-1">
                    Configure your automation settings
                  </p>
                </div>
              </div>
            </div>
            <DashboardPage />
          </div>
        </div>
        <AgentOverview />
      </div>
    </div>
  );
}
