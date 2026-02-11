import React from "react";
import { useScenario } from "@/context/ScenarioContext";
import { ScenarioObject } from "@/types/scenario";

const statusColors: Record<string, string> = {
  "In Transit": "bg-luklak-blue",
  "Delivered": "bg-luklak-green",
  "Ordered": "bg-luklak-purple",
  "Delayed": "bg-luklak-red",
  "Pending": "bg-muted-foreground",
  "In Progress": "bg-luklak-blue",
  "Planning": "bg-luklak-orange",
  "Completed": "bg-luklak-green",
  "Review": "bg-luklak-purple",
  "Scheduled": "bg-luklak-blue",
  "Draft": "bg-muted-foreground",
  "Filming": "bg-luklak-orange",
};

const priorityBadge: Record<string, string> = {
  Critical: "bg-luklak-red/20 text-luklak-red",
  High: "bg-luklak-orange/20 text-luklak-orange",
  Medium: "bg-luklak-blue/20 text-luklak-blue",
  Low: "bg-muted text-muted-foreground",
};

export function KanbanView() {
  const { selectedFunction, setSelectedObject, selectedObject } = useScenario();

  if (!selectedFunction) return null;

  // Get unique statuses from objects
  const statuses = [...new Set(selectedFunction.objects.map((obj) => obj.status))];

  const getObjectsByStatus = (status: string): ScenarioObject[] => {
    return selectedFunction.objects.filter((obj) => obj.status === status);
  };

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="flex gap-4 h-full min-h-[500px]">
        {statuses.map((status) => {
          const objects = getObjectsByStatus(status);
          const statusColor = statusColors[status] || "bg-muted-foreground";

          return (
            <div key={status} className="flex-1 min-w-[280px] bg-muted rounded-lg flex flex-col">
              {/* Column Header */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${statusColor}`} />
                    <h3 className="font-semibold text-foreground uppercase text-sm">{status}</h3>
                  </div>
                  <span className="bg-muted-foreground/20 text-muted-foreground text-xs px-2 py-1 rounded-full font-medium">
                    {objects.length}
                  </span>
                </div>
              </div>

              {/* Cards */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {objects.map((obj) => (
                  <div
                    key={obj.id}
                    onClick={() => setSelectedObject(obj)}
                    className={`bg-card rounded-lg p-4 shadow-sm border cursor-pointer transition-all hover:shadow-md ${
                      selectedObject?.id === obj.id
                        ? "border-primary ring-1 ring-primary"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    {/* Card Header */}
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-medium text-foreground text-sm leading-tight flex-1 pr-2">
                        {obj.title}
                      </h4>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${
                          priorityBadge[obj.priority] || priorityBadge.Medium
                        }`}
                      >
                        {obj.priority}
                      </span>
                    </div>

                    {/* Custom Fields */}
                    <div className="space-y-1.5 text-xs text-muted-foreground">
                      {Object.entries(obj.custom_fields)
                        .slice(0, 3)
                        .map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <span className="text-muted-foreground/70">{key}:</span>
                            <span className="font-medium text-foreground/80">{value}</span>
                          </div>
                        ))}
                    </div>

                    {/* Assignee */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-luklak-teal flex items-center justify-center text-card text-xs font-semibold">
                          {obj.assignee.charAt(0)}
                        </div>
                        <span className="text-xs text-muted-foreground">{obj.assignee}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {objects.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No items in this column
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
