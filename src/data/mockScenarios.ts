import { Scenario } from "@/types/scenario";

export const constructionScenario: Scenario = {
  scenario_meta: {
    industry: "Construction",
    company_name: "BuildRight Co.",
  },
  active_space: {
    name: "PROJECT OPS",
    functions: [
      {
        id: "func_1",
        name: "Material Tracking",
        icon: "Package",
        viewType: "kanban",
        objects: [
          {
            id: "obj_1",
            title: "Steel Beams - Tower A",
            status: "In Transit",
            priority: "High",
            assignee: "Mike Chen",
            custom_fields: { Quantity: "500 units", ETA: "Tomorrow 9AM", Supplier: "SteelCorp Inc." },
          },
          {
            id: "obj_2",
            title: "Concrete Mix - Foundation",
            status: "Delivered",
            priority: "Medium",
            assignee: "Sarah Johnson",
            custom_fields: { Quantity: "50 tons", Location: "Site B", Quality: "Grade A" },
          },
          {
            id: "obj_3",
            title: "Glass Panels - Facade",
            status: "Ordered",
            priority: "Low",
            assignee: "Tom Wilson",
            custom_fields: { Quantity: "200 panels", ETA: "Next Week", Supplier: "GlassTech" },
          },
          {
            id: "obj_4",
            title: "Electrical Wiring - Floor 3",
            status: "Delayed",
            priority: "Critical",
            assignee: "Lisa Park",
            custom_fields: { Quantity: "10km", Delay: "3 days", Reason: "Customs hold" },
          },
        ],
      },
      {
        id: "func_2",
        name: "Site Inspections",
        icon: "ClipboardCheck",
        viewType: "table",
        objects: [
          {
            id: "obj_5",
            title: "Safety Audit - Tower A",
            status: "Scheduled",
            priority: "High",
            assignee: "Inspector Davis",
            custom_fields: { Date: "Jan 20, 2026", Type: "OSHA Compliance" },
          },
          {
            id: "obj_6",
            title: "Structural Review - Foundation",
            status: "Completed",
            priority: "Critical",
            assignee: "Engineer Martinez",
            custom_fields: { Result: "Passed", Notes: "Minor adjustments needed" },
          },
        ],
      },
    ],
  },
  unified_chat: [
    {
      related_object_id: "obj_1",
      messages: [
        { user: "Mike Chen", text: "@Sarah, Steel delivery truck is 30 mins out. Can you confirm crane availability?", timestamp: "9:30 AM", avatarIndex: 1 },
        { user: "Sarah", text: "@Mike got it. Crane team is ready and waiting at Bay 3.", timestamp: "9:32 AM", avatarIndex: 3 },
        { user: "Mike Chen", text: "@Sarah Perfect. I'll update the status once unloaded.", timestamp: "9:35 AM", avatarIndex: 1 },
      ],
    },
    {
      related_object_id: "obj_4",
      messages: [
        { user: "Lisa Park", text: "@Team Customs just cleared the wiring shipment!", timestamp: "2:15 PM", avatarIndex: 4 },
        { user: "David", text: "@Lisa Great news! Rerouting to Site B now. ETA 4pm.", timestamp: "2:18 PM", avatarIndex: 0 },
        { user: "Lisa Park", text: "@David thanks for the quick turnaround.", timestamp: "2:20 PM", avatarIndex: 4 },
      ],
    },
  ],
};

export const marketingScenario: Scenario = {
  scenario_meta: {
    industry: "Marketing Agency",
    company_name: "CreativeFlow Inc.",
  },
  active_space: {
    name: "CAMPAIGNS",
    functions: [
      {
        id: "func_1",
        name: "Active Campaigns",
        icon: "Target",
        viewType: "kanban",
        objects: [
          {
            id: "obj_1",
            title: "Q1 Product Launch",
            status: "In Progress",
            priority: "High",
            assignee: "Emma Davis",
            custom_fields: { Budget: "$50,000", Platform: "Multi-channel", Leads: "1,250" },
          },
          {
            id: "obj_2",
            title: "Brand Awareness Push",
            status: "Planning",
            priority: "Medium",
            assignee: "James Wilson",
            custom_fields: { Budget: "$25,000", Platform: "Social", Target: "Gen Z" },
          },
          {
            id: "obj_3",
            title: "Holiday Sale Promo",
            status: "Completed",
            priority: "High",
            assignee: "Sofia Chen",
            custom_fields: { ROI: "320%", Conversions: "8,500", Revenue: "$425K" },
          },
          {
            id: "obj_4",
            title: "Influencer Partnership",
            status: "Review",
            priority: "Low",
            assignee: "Alex Turner",
            custom_fields: { Influencers: "12", Reach: "2.5M", Engagement: "8.2%" },
          },
        ],
      },
      {
        id: "func_2",
        name: "Content Calendar",
        icon: "Calendar",
        viewType: "table",
        objects: [
          {
            id: "obj_5",
            title: "Blog Post: Industry Trends",
            status: "Draft",
            priority: "Medium",
            assignee: "Content Team",
            custom_fields: { Due: "Jan 18", Words: "2,000", SEO: "Optimized" },
          },
          {
            id: "obj_6",
            title: "Video: Product Demo",
            status: "Filming",
            priority: "High",
            assignee: "Video Team",
            custom_fields: { Length: "5 min", Format: "4K", Platform: "YouTube" },
          },
        ],
      },
    ],
  },
  unified_chat: [
    {
      related_object_id: "obj_1",
      messages: [
        { user: "Emma Davis", text: "@Kevin Creative assets are ready for review. Can you take a look?", timestamp: "10:00 AM", avatarIndex: 0 },
        { user: "Kevin", text: "@Emma Looks fine to me, go ahead.", timestamp: "10:05 AM", avatarIndex: 2 },
        { user: "Emma Davis", text: "@Team Sounds good. I'll prepare the final deck for 2pm.", timestamp: "10:08 AM", avatarIndex: 0 },
      ],
    },
  ],
};

export const logisticsScenario: Scenario = {
  scenario_meta: {
    industry: "Logistics",
    company_name: "FastTrack Inc.",
  },
  active_space: {
    name: "FLEET OPS",
    functions: [
      {
        id: "func_1",
        name: "Shipment Tracking",
        icon: "Truck",
        viewType: "kanban",
        objects: [
          {
            id: "obj_1",
            title: "Delivery to Amazon WH",
            status: "Delayed",
            priority: "High",
            assignee: "Driver Mike",
            custom_fields: { Weight: "500kg", ETA: "2 hours late", Route: "I-95 North" },
          },
          {
            id: "obj_2",
            title: "Pickup from Port Newark",
            status: "In Transit",
            priority: "Medium",
            assignee: "Driver Sarah",
            custom_fields: { Containers: "3", ETA: "On schedule", Client: "GlobalTech" },
          },
          {
            id: "obj_3",
            title: "Express Delivery - Medical",
            status: "Completed",
            priority: "Critical",
            assignee: "Driver Tom",
            custom_fields: { Type: "Temperature Controlled", Delivered: "8:45 AM" },
          },
          {
            id: "obj_4",
            title: "Warehouse Transfer",
            status: "Pending",
            priority: "Low",
            assignee: "Unassigned",
            custom_fields: { From: "WH-A", To: "WH-C", Pallets: "45" },
          },
        ],
      },
      {
        id: "func_2",
        name: "Fleet Maintenance",
        icon: "Wrench",
        viewType: "table",
        objects: [
          {
            id: "obj_5",
            title: "Truck #12 - Oil Change",
            status: "Scheduled",
            priority: "Medium",
            assignee: "Mechanic Joe",
            custom_fields: { Date: "Jan 22", Mileage: "45,000 mi" },
          },
        ],
      },
    ],
  },
  unified_chat: [
    {
      related_object_id: "obj_1",
      messages: [
        { user: "Driver Mike", text: "@Dispatch Traffic on I-95. Gonna be late.", timestamp: "11:30 AM", avatarIndex: 2 },
        { user: "Dispatcher", text: "@Mike Logged. I'll update the client immediately.", timestamp: "11:32 AM", avatarIndex: 1 },
        { user: "Driver Mike", text: "@Dispatcher Looks like 2 hour delay minimum. Sorry about this.", timestamp: "11:45 AM", avatarIndex: 2 },
      ],
    },
  ],
};

export function getScenarioByKeyword(keyword: string): Scenario | null {
  const lower = keyword.toLowerCase();
  
  if (lower.includes("construction") || lower.includes("build") || lower.includes("material")) {
    return constructionScenario;
  }
  
  if (lower.includes("marketing") || lower.includes("campaign") || lower.includes("creative")) {
    return marketingScenario;
  }
  
  if (lower.includes("logistics") || lower.includes("shipping") || lower.includes("fleet") || lower.includes("delivery")) {
    return logisticsScenario;
  }
  
  // Default to logistics for demo purposes
  return logisticsScenario;
}
