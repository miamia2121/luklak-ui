export type FieldType = "text" | "number" | "date" | "select" | "relation" | "currency" | "email" | "url" | "phone";

export interface FieldDefinition {
  name: string;
  type: FieldType;
  required?: boolean;
}

export interface WorkflowStep {
  name: string;
  color: string; // HSL CSS variable name like --luklak-blue
}

export interface ObjectDefinition {
  id: string;
  name: string;
  icon: string; // lucide icon name
  iconBg: string; // HSL background color
  iconColor: string; // HSL icon color
  category: "object" | "sub-object";
  description: string;
  fields: FieldDefinition[];
  workflow: WorkflowStep[];
}
