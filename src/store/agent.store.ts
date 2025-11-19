
import { AgentActivity } from "@/modules/agent/schema/agent.schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface AgentStoreState {
  agentData: AgentActivity | null;
  setAgentData: (data: AgentActivity) => void;
  clearAgentData: () => void;
}



export const useAgentStore = create(
  persist<AgentStoreState, []>(
    (set) => ({
      agentData: null,

      setAgentData: (data) => set({ agentData: data }),

      clearAgentData: () => set({ agentData: null }),
    }),
    {
      name: "agent-storage",          // localStorage key
      
    }
  )
);
