import React from "react";
import { useScenario } from "@/context/ScenarioContext";
import {
  Megaphone,
  FileText,
  Image,
  Calendar,
  Handshake,
  FormInput,
  Package,
  Users,
  Truck,
  Building,
  DollarSign,
  ClipboardList,
  Settings,
  MessageSquare,
  BarChart3,
  Target,
  Briefcase,
  Receipt,
  UserCircle,
  FileCheck,
  AlertCircle,
  UserPlus,
  UserMinus,
  Palette,
  LayoutGrid,
  Lightbulb,
  Box,
  Monitor,
  ShoppingCart,
  Contact,
  FileSignature,
  Layers,
  HardHat,
  Warehouse,
  MapPin,
  Wrench,
  CheckCircle,
  Clock,
  Send,
  Zap,
  Globe,
  Film,
  PenTool,
  Share2,
  PartyPopper,
  Coffee,
  Award,
  CircleDollarSign,
  History,
  Database,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Megaphone,
  FileText,
  Image,
  Calendar,
  Handshake,
  FormInput,
  Package,
  Users,
  Truck,
  Building,
  DollarSign,
  ClipboardList,
  Settings,
  MessageSquare,
  BarChart3,
  Target,
  Briefcase,
  Receipt,
  UserCircle,
  FileCheck,
  AlertCircle,
  UserPlus,
  UserMinus,
  Palette,
  LayoutGrid,
  Lightbulb,
  Box,
  Monitor,
  ShoppingCart,
  Contact,
  FileSignature,
  Layers,
  HardHat,
  Warehouse,
  MapPin,
  Wrench,
  CheckCircle,
  Clock,
  Send,
  Zap,
  Globe,
  Film,
  PenTool,
  Share2,
  PartyPopper,
  Coffee,
  Award,
  CircleDollarSign,
  History,
  Database,
};

// Structure data for different industries
const getStructureData = (industry: string) => {
  const structures: Record<string, SpaceData[]> = {
    Construction: [
      {
        name: "PROJECT MANAGEMENT",
        color: "#3B82F6",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        SpaceIcon: HardHat,
        functions: [
          {
            name: "Site Operations",
            functionLabel: "Site Management",
            primaryColor: "#3B82F6",
            objects: [
              { name: "Project", icon: "Building", isPrimary: true },
              { name: "Work Order", icon: "ClipboardList", isPrimary: false },
              { name: "Site Report", icon: "FileText", isPrimary: false },
              { name: "Inspection", icon: "CheckCircle", isPrimary: false },
            ],
          },
          {
            name: "Resource Planning",
            functionLabel: "Resources",
            primaryColor: "#3B82F6",
            objects: [
              { name: "Equipment", icon: "Wrench", isPrimary: true },
              { name: "Schedule", icon: "Calendar", isPrimary: false },
              { name: "Crew Assignment", icon: "Users", isPrimary: false },
            ],
          },
        ],
      },
      {
        name: "PROCUREMENT",
        color: "#F97316",
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
        SpaceIcon: ShoppingCart,
        functions: [
          {
            name: "Supplier & Purchasing",
            functionLabel: "Suppliers & Purchases",
            primaryColor: "#10B981",
            objects: [
              { name: "Supplier", icon: "Building", isPrimary: true },
              { name: "Contact", icon: "Contact", isPrimary: false },
              { name: "Purchase Order", icon: "Receipt", isPrimary: false },
            ],
          },
          {
            name: "Materials",
            functionLabel: "Material Tracking",
            primaryColor: "#10B981",
            objects: [
              { name: "Material", icon: "Package", isPrimary: true },
              { name: "Delivery", icon: "Truck", isPrimary: false },
              { name: "Inventory", icon: "Warehouse", isPrimary: false },
            ],
          },
        ],
      },
      {
        name: "SAFETY & COMPLIANCE",
        color: "#EF4444",
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
        SpaceIcon: AlertCircle,
        functions: [
          {
            name: "Safety Management",
            functionLabel: "Safety",
            primaryColor: "#EF4444",
            objects: [
              { name: "Safety Report", icon: "FileCheck", isPrimary: true },
              { name: "Incident", icon: "AlertCircle", isPrimary: false },
              { name: "Training", icon: "Award", isPrimary: false },
              { name: "Certification", icon: "FileSignature", isPrimary: false },
            ],
          },
        ],
      },
    ],
    Marketing: [
      {
        name: "MARKETING",
        color: "#EC4899",
        iconBg: "bg-pink-100",
        iconColor: "text-pink-600",
        SpaceIcon: Megaphone,
        functions: [
          {
            name: "Marketing Campaigns",
            functionLabel: "Marketing Campaigns",
            primaryColor: "#3B82F6",
            objects: [
              { name: "Campaign", icon: "Megaphone", isPrimary: true },
              { name: "Ad", icon: "Image", isPrimary: false },
              { name: "Event", icon: "Calendar", isPrimary: false },
              { name: "Partnership", icon: "Handshake", isPrimary: false },
            ],
          },
          {
            name: "Content Production",
            functionLabel: "Content",
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
        name: "OFFICE OPERATION",
        color: "#8B5CF6",
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        SpaceIcon: Share2,
        functions: [
          {
            name: "Office Intranet",
            functionLabel: "Intranet",
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
        SpaceIcon: CircleDollarSign,
        functions: [
          {
            name: "Sales & CRM",
            functionLabel: "CRM",
            primaryColor: "#10B981",
            objects: [
              { name: "Customer", icon: "Users", isPrimary: true },
              { name: "Meeting", icon: "Calendar", isPrimary: false },
              { name: "Deal", icon: "Briefcase", isPrimary: false },
              { name: "Proposal", icon: "FileText", isPrimary: false },
              { name: "Quotes", icon: "Receipt", isPrimary: false },
            ],
          },
        ],
      },
      {
        name: "HUMAN RESOURCES",
        color: "#F43F5E",
        iconBg: "bg-rose-100",
        iconColor: "text-rose-600",
        SpaceIcon: Users,
        functions: [
          {
            name: "Human Resources",
            functionLabel: "HRM",
            primaryColor: "#F43F5E",
            objects: [
              { name: "Employee Profile", icon: "UserCircle", isPrimary: true },
              { name: "Contract", icon: "FileSignature", isPrimary: false },
              { name: "Salary Decision", icon: "DollarSign", isPrimary: false },
              { name: "HR Incident", icon: "AlertCircle", isPrimary: false },
            ],
          },
        ],
      },
    ],
    Logistics: [
      {
        name: "FLEET OPERATIONS",
        color: "#3B82F6",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        SpaceIcon: Truck,
        functions: [
          {
            name: "Shipment Tracking",
            functionLabel: "Shipments",
            primaryColor: "#3B82F6",
            objects: [
              { name: "Shipment", icon: "Package", isPrimary: true },
              { name: "Route", icon: "MapPin", isPrimary: false },
              { name: "Vehicle", icon: "Truck", isPrimary: false },
              { name: "Driver", icon: "UserCircle", isPrimary: false },
            ],
          },
          {
            name: "Warehouse Ops",
            functionLabel: "Warehouse",
            primaryColor: "#3B82F6",
            objects: [
              { name: "Warehouse", icon: "Warehouse", isPrimary: true },
              { name: "Inventory", icon: "Package", isPrimary: false },
              { name: "Pick List", icon: "ClipboardList", isPrimary: false },
            ],
          },
        ],
      },
      {
        name: "CLIENT SERVICES",
        color: "#10B981",
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        SpaceIcon: Users,
        functions: [
          {
            name: "Customer Management",
            functionLabel: "Customers",
            primaryColor: "#10B981",
            objects: [
              { name: "Client", icon: "Building", isPrimary: true },
              { name: "Order", icon: "ClipboardList", isPrimary: false },
              { name: "Invoice", icon: "Receipt", isPrimary: false },
              { name: "Support Ticket", icon: "MessageSquare", isPrimary: false },
            ],
          },
        ],
      },
      {
        name: "ACCOUNTING",
        color: "#F59E0B",
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
        SpaceIcon: CircleDollarSign,
        functions: [
          {
            name: "Contract & Invoice",
            functionLabel: "Contract & Invoice",
            primaryColor: "#8B5CF6",
            objects: [
              { name: "Contract", icon: "FileSignature", isPrimary: true },
              { name: "Invoice", icon: "Receipt", isPrimary: false },
              { name: "Receipt", icon: "FileCheck", isPrimary: false },
            ],
          },
          {
            name: "Asset Management",
            functionLabel: "Asset Management",
            primaryColor: "#8B5CF6",
            objects: [
              { name: "Asset", icon: "Database", isPrimary: true },
              { name: "Allocation History", icon: "History", isPrimary: false },
              { name: "Repair Log", icon: "Wrench", isPrimary: false },
            ],
          },
        ],
      },
    ],
  };

  return structures[industry] || structures["Logistics"];
};

interface ObjectItem {
  name: string;
  icon: string;
  isPrimary: boolean;
}

interface FunctionData {
  name: string;
  functionLabel: string;
  primaryColor: string;
  objects: ObjectItem[];
}

interface SpaceData {
  name: string;
  color: string;
  iconBg: string;
  iconColor: string;
  SpaceIcon: React.ElementType;
  functions: FunctionData[];
}

// Color palette for sub-objects
const subObjectColors = [
  "#3B82F6", // blue
  "#8B5CF6", // purple
  "#10B981", // green
  "#F97316", // orange
  "#EC4899", // pink
  "#06B6D4", // cyan
  "#F43F5E", // rose
  "#6366F1", // indigo
];

// Get consistent color based on object name
const getColorFromName = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return subObjectColors[Math.abs(hash) % subObjectColors.length];
};

const ObjectRow = ({ 
  obj, 
  isChild = false, 
  primaryColor = "#3B82F6",
  showConnector = false,
  isLastChild = false
}: { 
  obj: ObjectItem; 
  isChild?: boolean;
  primaryColor?: string;
  showConnector?: boolean;
  isLastChild?: boolean;
}) => {
  const Icon = iconMap[obj.icon] || Package;
  const objectColor = obj.isPrimary ? primaryColor : getColorFromName(obj.name);
  
  return (
    <div className={`flex items-center gap-2.5 ${isChild ? "ml-5" : ""} relative`}>
      {/* Connector line for child objects */}
      {showConnector && isChild && (
        <>
          {/* Vertical line */}
          <div 
            className="absolute left-[-12px] w-[2px] bg-gray-200"
            style={{
              top: isLastChild ? '-8px' : '-8px',
              height: isLastChild ? 'calc(50% + 8px)' : 'calc(100% + 16px)',
            }}
          />
          {/* Horizontal connector */}
          <div 
            className="absolute left-[-12px] top-1/2 w-[10px] h-[2px] bg-gray-200"
            style={{ transform: 'translateY(-50%)' }}
          />
        </>
      )}
      
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{
          backgroundColor: obj.isPrimary 
            ? objectColor 
            : `${objectColor}20`
        }}
      >
        <Icon 
          className="w-4 h-4" 
          style={{ 
            color: obj.isPrimary ? "#FFFFFF" : objectColor,
          }} 
        />
      </div>
      <span className={`text-sm ${obj.isPrimary ? "font-medium text-gray-800" : "text-gray-600"}`}>
        {obj.name}
      </span>
    </div>
  );
};

const FunctionCard = ({ func }: { func: FunctionData }) => {
  const primaryObj = func.objects.find((o) => o.isPrimary);
  const childObjects = func.objects.filter((o) => !o.isPrimary);

  return (
    <div className="space-y-1">
      <div className="mb-2">
        <h4 className="font-semibold text-sm" style={{ color: func.primaryColor }}>
          {func.name}
        </h4>
        <p className="text-xs text-gray-400">Function: {func.functionLabel}</p>
      </div>

      {primaryObj && (
        <div 
          className="rounded-md p-2 mb-1"
          style={{ backgroundColor: `${func.primaryColor}08` }}
        >
          <ObjectRow obj={primaryObj} primaryColor={func.primaryColor} />
        </div>
      )}

      {/* Child Objects with connector lines */}
      <div className="space-y-3 pt-1 ml-1 relative">
        {/* Main vertical connector line */}
        {childObjects.length > 0 && (
          <div 
            className="absolute left-[10px] top-0 w-[2px] bg-gray-200"
            style={{ height: `calc(100% - 12px)` }}
          />
        )}
        
        {childObjects.map((obj, idx) => (
          <ObjectRow 
            key={idx} 
            obj={obj} 
            isChild 
            primaryColor={func.primaryColor}
            showConnector
            isLastChild={idx === childObjects.length - 1}
          />
        ))}
      </div>

      {/* Placeholder lines */}
      <div className="space-y-2 pt-2 ml-6 relative">
        <div 
          className="absolute left-[-12px] w-[2px] bg-gray-200"
          style={{ top: '-8px', height: 'calc(50% + 8px)' }}
        />
        <div 
          className="absolute left-[-12px] top-1/2 w-[10px] h-[2px] bg-gray-200"
          style={{ transform: 'translateY(-50%)' }}
        />
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gray-100" />
          <div className="h-2.5 w-20 bg-gray-100 rounded" />
        </div>
      </div>
    </div>
  );
};

const SpaceCard = ({ space }: { space: SpaceData }) => {
  const SpaceIcon = space.SpaceIcon;

  return (
    <div className="relative">
      {/* Floating Icon */}
      <div
        className={`absolute -top-4 -right-4 w-12 h-12 rounded-xl ${space.iconBg} flex items-center justify-center shadow-lg z-10`}
      >
        <SpaceIcon className={`w-6 h-6 ${space.iconColor}`} />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 min-w-[240px]">
        {/* Space Header */}
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
          <div
            className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px]"
            style={{ borderBottomColor: space.color }}
          />
          <span className="text-xs font-bold text-gray-700 tracking-wide">{space.name}</span>
        </div>

        {/* Functions */}
        <div className="space-y-6">
          {space.functions.map((func, idx) => (
            <FunctionCard key={idx} func={func} />
          ))}
        </div>
      </div>
    </div>
  );
};

export function StructureView() {
  const { scenario } = useScenario();
  const industry = scenario?.scenario_meta.industry || "Logistics";
  const companyName = scenario?.scenario_meta.company_name || "Your Company";
  const structureData = getStructureData(industry);

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 p-8 overflow-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {companyName} Structure
        </h1>
        <p className="text-gray-500">
          Visualize your spaces, functions, and objects in{" "}
          <span className="font-semibold text-blue-600">{industry}</span>
        </p>
      </div>

      {/* Cards Grid */}
      <div className="flex flex-wrap gap-8 justify-center items-start">
        {structureData.map((space, idx) => (
          <div
            key={idx}
            className="transform transition-transform hover:scale-[1.02]"
            style={{
              marginTop: idx % 2 === 1 ? "60px" : "0",
            }}
          >
            <SpaceCard space={space} />
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-12 flex justify-center gap-8 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-blue-100 border border-blue-200" />
          <span>Primary Object</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gray-100 border border-gray-200" />
          <span>Child Object</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] border-b-blue-500" />
          <span>Space</span>
        </div>
      </div>
    </div>
  );
}
