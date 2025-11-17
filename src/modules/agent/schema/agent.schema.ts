import { Description } from "@radix-ui/react-dialog";
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