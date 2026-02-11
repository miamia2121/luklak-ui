// Hierarchical data structure for operational overview
// Areas → Spaces → Functions → Objects → Sub-objects

export interface SubObject {
  name: string;
  icon: string;
}

export interface ObjectItem {
  name: string;
  icon: string;
  isPrimary: boolean;
  subObjects?: SubObject[];
}

export interface FunctionBlock {
  name: string;
  label: string;
  primaryColor: string;
  objects: ObjectItem[];
}

export interface Space {
  name: string;
  color: string;
  iconBg: string;
  iconColor: string;
  icon: string;
  functions: FunctionBlock[];
}

export interface Area {
  name: string;
  spaces: Space[];
}

export interface BusinessStructure {
  companyName: string;
  industry: string;
  areas: Area[];
}

// Input schema for agent/dynamic generation
export interface BusinessInput {
  companyName: string;
  industry: string;
  description: string;
  departments: string[];
  coreWorkflows: string[];
}
