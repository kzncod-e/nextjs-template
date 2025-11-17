import { AgentSessionData } from "@/modules/agent/agent.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface AgentStoreState {
  agentData: AgentSessionData | null;
  setAgentData: (data: AgentSessionData) => void;
  clearAgentData: () => void;
}

export const useAgentStore = create(
  persist<AgentStoreState>(
    (set) => ({
      agentData: null,

      setAgentData: (data) => set({ agentData: data }),

      clearAgentData: () => set({ agentData: null }),
    }),
    {
      name: "agent-storage",          // localStorage key
      partialize: (state) => ({
        agentData: state.agentData,   // yang disimpan hanya agentData
      }),
    }
  )
);
