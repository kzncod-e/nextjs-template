
export type Activity ={
  title:string
  description:string
  
}
 

export interface AgentSummary {
  totalActions: number;
  successRate: string;
  notes: string;
}

export interface AgentSessionData {
  sessionId: string;
  agent: string;
  platform: string;
  startTime: string;
  endTime: string;
  status: string;
  activities: Activity[];
  summary: AgentSummary;
}
