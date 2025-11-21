
import { AgentActivity } from "@/modules/agent/schema/agent.schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface AgentStoreState {
  agentData: AgentActivity | null;
  setAgentData: (data: AgentActivity) => void;
  clearAgentData: () => void;
  loading:boolean
  setLoading:(data:boolean)=> void

}



export const useAgentStore = create(
  persist<AgentStoreState, []>(
    (set) => ({
      agentData: null,
loading:false,
setLoading:(loading)=>set({loading:loading}),
      setAgentData: (data) => set({ agentData: data }),

      clearAgentData: () => set({ agentData: null }),
    }),
    {
      name: "agent-storage",          // localStorage key
      
    }
  )
);
