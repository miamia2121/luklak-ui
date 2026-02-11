import React from "react";
import { useScenario } from "@/context/ScenarioContext";

const statusColors: Record<string, string> = {
  "In Transit": "text-luklak-blue",
  "Delivered": "text-luklak-green",
  "Ordered": "text-luklak-purple",
  "Delayed": "text-luklak-red",
  "Pending": "text-muted-foreground",
  "In Progress": "text-luklak-blue",
  "Planning": "text-luklak-orange",
  "Completed": "text-luklak-green",
  "Review": "text-luklak-purple",
  "Scheduled": "text-luklak-blue",
  "Draft": "text-muted-foreground",
  "Filming": "text-luklak-orange",
};

export function TableView() {
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

  // Get all unique custom field keys
  const customFieldKeys = [
    ...new Set(
      selectedFunction.objects.flatMap((obj) => Object.keys(obj.custom_fields))
    ),
  ];

  return (
    <div className="flex-1 overflow-auto">
      <table className="w-full">
        <thead className="bg-muted border-b border-border sticky top-0 z-10">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Priority
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Assignee
            </th>
            {customFieldKeys.slice(0, 3).map((key) => (
              <th
                key={key}
                className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
              >
                {key}
              </th>
            ))}
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
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-medium text-foreground">{obj.title}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`font-semibold ${statusColors[obj.status] || "text-muted-foreground"}`}>
                  {obj.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="text-foreground">{obj.priority}</span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-luklak-teal flex items-center justify-center text-card text-xs font-semibold">
                    {obj.assignee.charAt(0)}
                  </div>
                  <span className="text-muted-foreground">{obj.assignee}</span>
                </div>
              </td>
              {customFieldKeys.slice(0, 3).map((key) => (
                <td key={key} className="px-6 py-4 text-muted-foreground">
                  {obj.custom_fields[key] || "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
