import React from "react";
import { ObjectDefinition } from "@/types/objectDefinition";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import * as icons from "lucide-react";
import { LucideIcon } from "lucide-react";

function getIcon(name: string): LucideIcon {
  const icon = (icons as Record<string, unknown>)[name];
  if (icon && typeof icon === "object" && "$$typeof" in (icon as object)) {
    return icon as LucideIcon;
  }
  return icons.HelpCircle;
}

// Conventional icon per field type
const fieldTypeIcons: Record<string, string> = {
  text: "Type",
  number: "Hash",
  date: "Calendar",
  select: "ChevronDown",
  relation: "Link",
  currency: "DollarSign",
  email: "AtSign",
  url: "Globe",
  phone: "Phone",
};

interface ObjectCardProps {
  definition: ObjectDefinition;
  /** Max visible fields before showing "+N more" */
  maxVisibleFields?: number;
  onClick?: (definition: ObjectDefinition) => void;
  className?: string;
}

export function ObjectCard({
  definition,
  maxVisibleFields = 3,
  onClick,
  className = "",
}: ObjectCardProps) {
  const Icon = getIcon(definition.icon);
  const visibleFields = definition.fields.slice(0, maxVisibleFields);
  const moreCount = definition.fields.length - maxVisibleFields;

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div
          onClick={() => onClick?.(definition)}
          className={`group bg-card border border-border rounded-xl p-5 cursor-pointer transition-all duration-200
            hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 hover:-translate-y-0.5
            ${className}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: definition.iconBg }}
              >
                <Icon className="w-4 h-4" style={{ color: definition.iconColor }} />
              </div>
              <h3 className="font-semibold text-foreground text-sm">{definition.name}</h3>
            </div>
            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                definition.category === "object"
                  ? "bg-muted text-muted-foreground"
                  : "bg-primary/10 text-primary"
              }`}
            >
              {definition.category === "object" ? "Object" : "Sub-object"}
            </span>
          </div>

          {/* Sample fields */}
          <div className="space-y-2">
            {visibleFields.map((field) => {
              const FieldIcon = getIcon(fieldTypeIcons[field.type] || "Type");
              return (
                <div key={field.name} className="flex items-center gap-2">
                  <FieldIcon className="w-3.5 h-3.5 flex-shrink-0 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{field.name}</span>
                </div>
              );
            })}
          </div>

          {moreCount > 0 && (
            <p className="text-[11px] text-muted-foreground/60 mt-2.5 flex items-center gap-1">
              <icons.Plus className="w-3 h-3" />
              {moreCount} more fields
            </p>
          )}
        </div>
      </HoverCardTrigger>

      {/* Hover detail card */}
      <HoverCardContent
        side="right"
        align="start"
        sideOffset={12}
        className="w-80 p-0 rounded-xl shadow-xl border-border/60"
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: definition.iconBg }}
          >
            <Icon className="w-4.5 h-4.5" style={{ color: definition.iconColor }} />
          </div>
          <div>
            <h4 className="font-semibold text-foreground text-sm">{definition.name}</h4>
            <p className="text-[11px] text-muted-foreground">{definition.description}</p>
          </div>
        </div>

        {/* All fields */}
        <div className="p-4 space-y-1.5 max-h-52 overflow-y-auto">
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Data Fields
          </p>
          {definition.fields.map((field) => {
            const FieldIcon = getIcon(fieldTypeIcons[field.type] || "Type");
            return (
              <div key={field.name} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <FieldIcon className="w-3.5 h-3.5 flex-shrink-0 text-muted-foreground" />
                  <span className="text-xs text-foreground">{field.name}</span>
                </div>
                <span className="text-[10px] text-muted-foreground/70 bg-muted px-1.5 py-0.5 rounded">
                  {field.type}
                </span>
              </div>
            );
          })}
        </div>

        {/* Workflow */}
        {definition.workflow.length > 0 && (
          <div className="p-4 border-t border-border">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2.5">
              Workflow
            </p>
            <div className="flex items-center gap-1.5 flex-wrap">
              {definition.workflow.map((step, i) => (
                <React.Fragment key={step.name}>
                  <span
                    className="text-[10px] font-medium px-2 py-1 rounded-md"
                    style={{
                      backgroundColor: `hsl(var(${step.color}) / 0.12)`,
                      color: `hsl(var(${step.color}))`,
                    }}
                  >
                    {step.name}
                  </span>
                  {i < definition.workflow.length - 1 && (
                    <icons.ChevronRight className="w-3 h-3 text-muted-foreground/40" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
