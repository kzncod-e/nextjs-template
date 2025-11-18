// import { Description } from "@radix-ui/react-dialog";
import { InferSelectModel, relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const agentActivity = sqliteTable("agentsActivity",{
    id:integer("id").primaryKey({autoIncrement:true}),
    agent:text("agent"),
    platform:text("platform"),
    status:text("status"),
    createdAt:text("createdAt").notNull().$defaultFn(()=>new Date().toISOString()),
    updatedAt:text("updatedAt").notNull().$defaultFn(()=>new Date().toISOString())

})

export const activity =  sqliteTable("activity",{
    id:integer("id").primaryKey({autoIncrement:true}),
    title:text("title"),
    agentId:integer("agentId").notNull().references(()=>agentActivity.id,{onDelete:"cascade"}),
    description:text("description"),
    createdAt:text("createdAt").notNull().$defaultFn(()=>new Date().toISOString()),
    updatedAt:text("updatedAt").notNull().$defaultFn(()=>new Date().toISOString())

})

export const summary = sqliteTable("summary",{
    id:integer("id").primaryKey({autoIncrement:true}),
    successRate:text("successRate"),
    agentId:integer("agentId").notNull().references(()=>agentActivity.id),
    notes:text("notes")
})

export const agentActivityRelations = relations(agentActivity, ({ many,one }) => ({
  activities: many(activity),
  //relasi one by default menghasilkan T |null
  summary: one(summary),
}));

export const activityRelations = relations(activity, ({ one }) => ({
  agent: one(agentActivity, {
    fields: [activity.agentId],
    references: [agentActivity.id],
  }),
}));

export const summaryRelations = relations(summary, ({ one }) => ({
  agent: one(agentActivity, {
    fields: [summary.agentId],
    references: [agentActivity.id],
  }),
}));
export type AgentActivity = 
  InferSelectModel<typeof agentActivity> & {
    activities: InferSelectModel<typeof activity>[]|null;
    summary: InferSelectModel<typeof summary>|null;
  };
