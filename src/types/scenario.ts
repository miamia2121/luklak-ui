import { LucideIcon } from "lucide-react";

export interface ScenarioMeta {
  industry: string;
  company_name: string;
}

export interface ChatMessage {
  user: string;
  text: string;
  timestamp?: string;
  avatarIndex?: number;
}

export interface UnifiedChat {
  related_object_id: string;
  messages: ChatMessage[];
}

export interface ScenarioObject {
  id: string;
  title: string;
  status: string;
  priority: string;
  assignee: string;
  assigneeAvatarIndex?: number;
  objectType?: string;
  objectIcon?: string;
  date?: string;
  custom_fields: Record<string, string>;
}

export interface ScenarioFunction {
  id: string;
  name: string;
  icon: string;
  viewType: "kanban" | "table" | "dashboard";
  objects: ScenarioObject[];
}

export interface ActiveSpace {
  name: string;
  functions: ScenarioFunction[];
}

export interface Scenario {
  scenario_meta: ScenarioMeta;
  active_space: ActiveSpace;
  unified_chat: UnifiedChat[];
}

export type AppView = "briefing" | "simulation";
