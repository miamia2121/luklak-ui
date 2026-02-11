import React from "react";
import { useScenario } from "@/context/ScenarioContext";
import { FileText, ClipboardCheck, Target, Truck, Package, Wrench, Calendar } from "lucide-react";

// Object type icon mapping
const objectIcons: Record<string, React.ReactNode> = {
  Contract: <FileText className="w-4 h-4 text-luklak-purple" />,
  Delivery: <Truck className="w-4 h-4 text-luklak-blue" />,
  Material: <Package className="w-4 h-4 text-amber-600" />,
  Inspection: <ClipboardCheck className="w-4 h-4 text-luklak-orange" />,
  Campaign: <Target className="w-4 h-4 text-amber-600" />,
  Maintenance: <Wrench className="w-4 h-4 text-slate-500" />,
  Task: <FileText className="w-4 h-4 text-luklak-blue" />,
  Project: <ClipboardCheck className="w-4 h-4 text-amber-600" />,
  Content: <Calendar className="w-4 h-4 text-luklak-teal" />,
};

function getObjectIcon(type?: string, functionName?: string) {
  if (type && objectIcons[type]) return objectIcons[type];
  
  // Infer from function name
  if (functionName) {
    if (functionName.toLowerCase().includes("project")) return objectIcons.Project;
    if (functionName.toLowerCase().includes("campaign")) return objectIcons.Campaign;
    if (functionName.toLowerCase().includes("material")) return objectIcons.Material;
    if (functionName.toLowerCase().includes("content")) return objectIcons.Content;
  }
  
  return <ClipboardCheck className="w-4 h-4 text-amber-600" />;
}

// Status colors
const statusColors: Record<string, string> = {
  "KICK OFF": "text-luklak-blue",
  "UNDER CONSTRUCTION": "text-luklak-orange",
  "UNDER CONS...": "text-luklak-orange",
  "COMPLETED": "text-luklak-green",
  "In Transit": "text-luklak-blue",
  "Delivered": "text-luklak-green",
  "Ordered": "text-luklak-purple",
  "Delayed": "text-luklak-red",
  "Pending": "text-muted-foreground",
  "In Progress": "text-luklak-blue",
  "Planning": "text-luklak-orange",
  "Review": "text-luklak-purple",
  "Scheduled": "text-luklak-blue",
  "Draft": "text-muted-foreground",
  "Filming": "text-luklak-orange",
  "ACTIVE": "text-luklak-green",
  "OFF": "text-luklak-red",
};

function getStatusColor(status: string): string {
  // Direct match
  if (statusColors[status]) return statusColors[status];
  
  // Partial match
  const upperStatus = status.toUpperCase();
  for (const [key, value] of Object.entries(statusColors)) {
    if (upperStatus.includes(key.toUpperCase()) || key.toUpperCase().includes(upperStatus)) {
      return value;
    }
  }
  
  return "text-muted-foreground";
}

export function ListView() {
  const { selectedFunction, setSelectedObject, selectedObject } = useScenario();

  if (!selectedFunction) return null;

  if (selectedFunction.objects.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <div className="text-6xl mb-4">📋</div>
          <p className="text-lg font-medium">No data yet</p>
          <p className="text-sm mt-2">This function is ready for your data</p>
        </div>
      </div>
    );
  }

  // Truncate status if too long
  const formatStatus = (status: string) => {
    if (status.length > 15) {
      return status.substring(0, 12) + "...";
    }
    return status;
  };

  return (
    <div className="flex-1 overflow-auto">
      <table className="w-full">
        <thead className="bg-muted border-b border-border sticky top-0 z-10">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Object Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-card divide-y divide-border">
          {selectedFunction.objects.map((obj) => (
            <tr
              key={obj.id}
              onClick={() => setSelectedObject(obj)}
              className={`cursor-pointer transition-colors ${
                selectedObject?.id === obj.id
                  ? "bg-primary/5"
                  : "hover:bg-muted/50"
              }`}
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0">
                    {getObjectIcon(obj.objectType, selectedFunction.name)}
                  </div>
                  <span className="font-medium text-foreground">{obj.title}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`font-semibold ${getStatusColor(obj.status)}`}>
                  {formatStatus(obj.status.toUpperCase())}
                </span>
              </td>
            </tr>
          ))}
          {/* Empty placeholder rows to fill the space */}
          {Array.from({ length: Math.max(0, 8 - selectedFunction.objects.length) }).map((_, i) => (
            <tr key={`empty-${i}`} className="border-b border-border/50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded bg-muted flex items-center justify-center flex-shrink-0">
                    <ClipboardCheck className="w-4 h-4 text-muted-foreground/30" />
                  </div>
                  <div className="h-4 w-48 bg-muted rounded" />
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 w-24 bg-muted rounded" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
