import { BusinessStructure } from "@/types/operationalStructure";

// Sample business structure for an Interior Design / Architecture firm (Laika-like)
export const sampleBusinessStructure: BusinessStructure = {
  companyName: "Laika Design Studio",
  industry: "Interior Design & Architecture",
  areas: [
    {
      name: "COMMERCIAL OPERATIONS",
      spaces: [
        {
          name: "MARKETING",
          color: "#EC4899",
          iconBg: "bg-pink-100",
          iconColor: "text-pink-600",
          icon: "Megaphone",
          functions: [
            {
              name: "Marketing Campaigns",
              label: "Marketing Campaigns",
              primaryColor: "#3B82F6",
              objects: [
                { name: "Campaign", icon: "Megaphone", isPrimary: true },
                { name: "Ad", icon: "Image", isPrimary: false },
                { name: "Event", icon: "Calendar", isPrimary: false },
                { name: "Partnership", icon: "Handshake", isPrimary: false },
                { name: "Webform", icon: "FormInput", isPrimary: false },
              ],
            },
            {
              name: "Content Production",
              label: "Content",
              primaryColor: "#3B82F6",
              objects: [
                { name: "Content", icon: "FileText", isPrimary: true },
                { name: "Video", icon: "Film", isPrimary: false },
                { name: "Graphic", icon: "PenTool", isPrimary: false },
              ],
            },
          ],
        },
        {
          name: "PROCUREMENT",
          color: "#F97316",
          iconBg: "bg-orange-100",
          iconColor: "text-orange-600",
          icon: "ShoppingCart",
          functions: [
            {
              name: "Supplier & Purchasing",
              label: "Suppliers & Purchases",
              primaryColor: "#10B981",
              objects: [
                { name: "Supplier", icon: "Building", isPrimary: true },
                { name: "Contact", icon: "Contact", isPrimary: false },
                { name: "Purchase Order", icon: "Receipt", isPrimary: false },
                { name: "Item Category", icon: "Package", isPrimary: false },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "OFFICE OPERATIONS",
      spaces: [
        {
          name: "OFFICE OPERATION",
          color: "#8B5CF6",
          iconBg: "bg-purple-100",
          iconColor: "text-purple-600",
          icon: "Share2",
          functions: [
            {
              name: "Office Intranet",
              label: "Intranet",
              primaryColor: "#8B5CF6",
              objects: [
                { name: "Announcement", icon: "MessageSquare", isPrimary: true },
                { name: "Kudos", icon: "Award", isPrimary: false },
                { name: "Sharing", icon: "Share2", isPrimary: false },
                { name: "Internal Event", icon: "PartyPopper", isPrimary: false },
                { name: "Hangouts", icon: "Coffee", isPrimary: false },
              ],
            },
          ],
        },
        {
          name: "SALES & GROWTH",
          color: "#10B981",
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
          icon: "CircleDollarSign",
          functions: [
            {
              name: "Sales & CRM",
              label: "CRM",
              primaryColor: "#10B981",
              objects: [
                { name: "Customer", icon: "Users", isPrimary: true },
                { name: "Meeting", icon: "Calendar", isPrimary: false },
                { name: "Deal", icon: "Briefcase", isPrimary: false },
                { name: "Proposal", icon: "FileText", isPrimary: false },
                { name: "Quotes", icon: "Receipt", isPrimary: false },
              ],
            },
            {
              name: "Asset Management",
              label: "Asset Management",
              primaryColor: "#10B981",
              objects: [
                { name: "Asset", icon: "Database", isPrimary: true },
                { name: "Allocation History", icon: "History", isPrimary: false },
                { name: "Repair Log", icon: "Wrench", isPrimary: false },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "PEOPLE & FINANCE",
      spaces: [
        {
          name: "HUMAN RESOURCES",
          color: "#F43F5E",
          iconBg: "bg-rose-100",
          iconColor: "text-rose-600",
          icon: "Users",
          functions: [
            {
              name: "Human Resources",
              label: "HRM",
              primaryColor: "#F43F5E",
              objects: [
                { name: "Employee Profile", icon: "UserCircle", isPrimary: true },
                { name: "Contract", icon: "FileSignature", isPrimary: false },
                { name: "Salary Decision", icon: "DollarSign", isPrimary: false },
                { name: "HR Incident", icon: "AlertCircle", isPrimary: false },
                { name: "Onboarding", icon: "UserPlus", isPrimary: false },
                { name: "Offboarding", icon: "UserMinus", isPrimary: false },
              ],
            },
          ],
        },
        {
          name: "ACCOUNTING",
          color: "#F59E0B",
          iconBg: "bg-amber-100",
          iconColor: "text-amber-600",
          icon: "CircleDollarSign",
          functions: [
            {
              name: "Contract & Invoice",
              label: "Contract & Invoice",
              primaryColor: "#F59E0B",
              objects: [
                { name: "Contract", icon: "FileSignature", isPrimary: true },
                { name: "Invoice", icon: "Receipt", isPrimary: false },
                { name: "Receipt", icon: "FileCheck", isPrimary: false },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "PROJECT DELIVERY",
      spaces: [
        {
          name: "PRODUCT DELIVERY",
          color: "#3B82F6",
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
          icon: "Layers",
          functions: [
            {
              name: "Design",
              label: "Interior Design",
              primaryColor: "#3B82F6",
              objects: [
                { name: "Design", icon: "Palette", isPrimary: true },
                { name: "Floor Plan", icon: "LayoutGrid", isPrimary: false },
                { name: "Concept", icon: "Lightbulb", isPrimary: false },
                { name: "3D", icon: "Box", isPrimary: false },
                { name: "2D", icon: "Monitor", isPrimary: false },
              ],
            },
            {
              name: "Project Execution",
              label: "Execution",
              primaryColor: "#3B82F6",
              objects: [
                { name: "Project", icon: "Briefcase", isPrimary: true },
                { name: "Task", icon: "ClipboardList", isPrimary: false },
                { name: "Milestone", icon: "Target", isPrimary: false },
                { name: "Site Visit", icon: "MapPin", isPrimary: false },
              ],
            },
          ],
        },
      ],
    },
  ],
};

// Generic sample for a Tech SaaS company
export const techSaaSStructure: BusinessStructure = {
  companyName: "TechFlow Inc",
  industry: "SaaS Technology",
  areas: [
    {
      name: "GROWTH",
      spaces: [
        {
          name: "MARKETING",
          color: "#EC4899",
          iconBg: "bg-pink-100",
          iconColor: "text-pink-600",
          icon: "Megaphone",
          functions: [
            {
              name: "Digital Marketing",
              label: "Digital Campaigns",
              primaryColor: "#EC4899",
              objects: [
                { name: "Campaign", icon: "Megaphone", isPrimary: true },
                { name: "Landing Page", icon: "Monitor", isPrimary: false },
                { name: "A/B Test", icon: "Target", isPrimary: false },
                { name: "Analytics Report", icon: "BarChart3", isPrimary: false },
              ],
            },
          ],
        },
        {
          name: "SALES",
          color: "#10B981",
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
          icon: "TrendingUp",
          functions: [
            {
              name: "Pipeline",
              label: "Sales Pipeline",
              primaryColor: "#10B981",
              objects: [
                { name: "Lead", icon: "UserPlus", isPrimary: true },
                { name: "Opportunity", icon: "Target", isPrimary: false },
                { name: "Demo", icon: "Video", isPrimary: false },
                { name: "Contract", icon: "FileSignature", isPrimary: false },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "PRODUCT",
      spaces: [
        {
          name: "ENGINEERING",
          color: "#3B82F6",
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
          icon: "Cpu",
          functions: [
            {
              name: "Development",
              label: "Product Development",
              primaryColor: "#3B82F6",
              objects: [
                { name: "Feature", icon: "Zap", isPrimary: true },
                { name: "Bug", icon: "AlertCircle", isPrimary: false },
                { name: "Sprint", icon: "Clock", isPrimary: false },
                { name: "Release", icon: "Rocket", isPrimary: false },
              ],
            },
          ],
        },
        {
          name: "SUPPORT",
          color: "#8B5CF6",
          iconBg: "bg-purple-100",
          iconColor: "text-purple-600",
          icon: "Headphones",
          functions: [
            {
              name: "Customer Support",
              label: "Support",
              primaryColor: "#8B5CF6",
              objects: [
                { name: "Ticket", icon: "TicketCheck", isPrimary: true },
                { name: "Knowledge Base", icon: "BookOpen", isPrimary: false },
                { name: "Feedback", icon: "MessageSquare", isPrimary: false },
              ],
            },
          ],
        },
      ],
    },
  ],
};
