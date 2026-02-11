import React, { useState } from "react";
import { useScenario } from "@/context/ScenarioContext";
import { Search, MoreVertical, Grid, Plus, Package, Target, Truck, Calendar, ClipboardCheck, Wrench, ChevronDown, ChevronRight } from "lucide-react";
import { ScenarioFunction, ScenarioObject } from "@/types/scenario";

const iconMap: Record<string, React.ElementType> = {
  Package,
  Target,
  Truck,
  Calendar,
  ClipboardCheck,
  Wrench,
};

// Color palette for sub-objects
const subObjectColors = [
  "#3B82F6",
  "#8B5CF6",
  "#10B981",
  "#F97316",
  "#EC4899",
  "#06B6D4",
  "#F43F5E",
  "#6366F1",
];

const getColorFromName = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return subObjectColors[Math.abs(hash) % subObjectColors.length];
};

// Function primary colors based on icon type
const getFunctionColor = (icon: string): string => {
  const colorMap: Record<string, string> = {
    Package: "#3B82F6",
    Target: "#EC4899",
    Truck: "#3B82F6",
    Calendar: "#8B5CF6",
    ClipboardCheck: "#10B981",
    Wrench: "#F97316",
  };
  return colorMap[icon] || "#3B82F6";
};

export function NavigationSidebar() {
  const { scenario, selectedFunction, setSelectedFunction, setSelectedObject } = useScenario();
  const [expandedFunctions, setExpandedFunctions] = useState<Set<string>>(new Set());

  if (!scenario) return null;

  const handleFunctionClick = (func: ScenarioFunction) => {
    setSelectedFunction(func);
    setSelectedObject(null);
    // Toggle expand
    setExpandedFunctions(prev => {
      const next = new Set(prev);
      if (next.has(func.id)) {
        next.delete(func.id);
      } else {
        next.add(func.id);
      }
      return next;
    });
  };

  const handleObjectClick = (obj: ScenarioObject) => {
    setSelectedObject(obj);
  };

  return (
    <div className="w-80 bg-card border-r border-border flex flex-col">
      {/* Workspace Selector */}
      <div className="p-4">
        <div className="bg-primary text-primary-foreground px-4 py-2 rounded flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity">
          <span className="font-medium">{scenario.scenario_meta.company_name.toUpperCase()}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 pb-3 border-b border-border flex items-center space-x-2">
        <Search className="w-4 h-4 text-muted-foreground" />
        <button className="p-1 hover:bg-muted rounded">
          <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <button className="p-1 hover:bg-muted rounded">
          <MoreVertical className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Space & Functions List */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* All Objects Header */}
        <div className="flex items-center space-x-2 text-foreground font-medium mb-4">
          <Grid className="w-4 h-4 text-primary" />
          <span>ALL OBJECTS</span>
        </div>

        {/* Active Space */}
        <div className="space-y-1">
          <div className="py-1.5 px-2 rounded bg-muted text-foreground text-sm font-medium">
            {scenario.active_space.name}
          </div>

          {/* Functions */}
          <div className="pl-2 space-y-1 mt-2">
            {scenario.active_space.functions.map((func) => {
              const IconComponent = iconMap[func.icon] || Package;
              const isSelected = selectedFunction?.id === func.id;
              const isExpanded = expandedFunctions.has(func.id);
              const primaryColor = getFunctionColor(func.icon);

              return (
                <div key={func.id}>
                  {/* Function header */}
                  <div
                    className={`py-2 px-2 rounded cursor-pointer transition-colors ${
                      isSelected ? "bg-muted" : "hover:bg-muted/50"
                    }`}
                    onClick={() => handleFunctionClick(func)}
                  >
                    <div className="flex items-center gap-2">
                      {isExpanded ? (
                        <ChevronDown className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      )}
                      <div
                        className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <IconComponent className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="font-semibold text-sm text-foreground">
                        {func.name}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 ml-[44px]">
                      {func.objects.length} items • {func.viewType}
                    </div>
                  </div>

                  {/* Expanded objects with icons and connectors */}
                  {isExpanded && (
                    <div className="ml-[22px] mt-1 relative">
                      {/* Main vertical connector line */}
                      {func.objects.length > 1 && (
                        <div
                          className="absolute left-[12px] top-[28px] w-[2px] bg-border"
                          style={{ height: `calc(100% - 40px)` }}
                        />
                      )}

                      {func.objects.map((obj, idx) => {
                        const isFirst = idx === 0;
                        const isLast = idx === func.objects.length - 1;
                        const objColor = isFirst ? primaryColor : getColorFromName(obj.title);
                        const ObjIcon = iconMap[func.icon] || Package;

                        return (
                          <div
                            key={obj.id}
                            className={`flex items-center gap-2.5 py-1.5 px-1 rounded cursor-pointer transition-colors hover:bg-muted/50 relative ${
                              isFirst ? "" : "ml-3"
                            }`}
                            onClick={() => handleObjectClick(obj)}
                          >
                            {/* Connector lines for non-primary objects */}
                            {!isFirst && (
                              <>
                                <div
                                  className="absolute left-[-3px] w-[2px] bg-border"
                                  style={{
                                    top: isLast ? '-4px' : '-4px',
                                    height: isLast ? 'calc(50% + 4px)' : 'calc(100% + 8px)',
                                  }}
                                />
                                <div
                                  className="absolute left-[-3px] top-1/2 w-[8px] h-[2px] bg-border"
                                  style={{ transform: 'translateY(-50%)' }}
                                />
                              </>
                            )}

                            {/* Icon */}
                            <div
                              className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                              style={{
                                backgroundColor: isFirst
                                  ? objColor
                                  : `${objColor}20`,
                              }}
                            >
                              <ObjIcon
                                className="w-3.5 h-3.5"
                                style={{
                                  color: isFirst ? "#FFFFFF" : objColor,
                                }}
                              />
                            </div>

                            {/* Title */}
                            <span
                              className={`text-sm truncate ${
                                isFirst
                                  ? "font-medium text-foreground"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {obj.title}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Space Button */}
        <button className="flex items-center space-x-2 text-primary hover:bg-primary/10 px-2 py-1.5 rounded w-full mt-6">
          <Plus className="w-4 h-4" />
          <span>Add Space</span>
        </button>
      </div>

      {/* Industry Badge */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span>Industry: {scenario.scenario_meta.industry}</span>
        </div>
      </div>
    </div>
  );
}
