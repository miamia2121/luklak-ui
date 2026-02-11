import React from "react";
import { ObjectItem } from "@/types/operationalStructure";
import { getIcon } from "./iconMap";

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

interface ObjectRowProps {
  object: ObjectItem;
  isChild?: boolean;
  primaryColor?: string;
  showConnector?: boolean;
  isLastChild?: boolean;
}

export const ObjectRow: React.FC<ObjectRowProps> = ({ 
  object, 
  isChild = false,
  primaryColor = "#3B82F6",
  showConnector = false,
  isLastChild = false,
}) => {
  const Icon = getIcon(object.icon);
  const objectColor = object.isPrimary ? primaryColor : getColorFromName(object.name);
  
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
        className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0`}
        style={{
          backgroundColor: object.isPrimary 
            ? objectColor 
            : `${objectColor}20`
        }}
      >
        <Icon 
          className="w-4 h-4" 
          style={{ 
            color: object.isPrimary ? "#FFFFFF" : objectColor,
          }} 
        />
      </div>
      <span 
        className={`text-sm ${
          object.isPrimary 
            ? "font-medium text-gray-800" 
            : "text-gray-600"
        }`}
      >
        {object.name}
      </span>
    </div>
  );
};

// Placeholder skeleton row for visual balance
export const PlaceholderRow: React.FC<{ isChild?: boolean; showConnector?: boolean }> = ({ 
  isChild = false,
  showConnector = false 
}) => (
  <div className={`flex items-center gap-2.5 ${isChild ? "ml-5" : ""} relative`}>
    {showConnector && isChild && (
      <>
        <div 
          className="absolute left-[-12px] w-[2px] bg-gray-200"
          style={{ top: '-8px', height: 'calc(50% + 8px)' }}
        />
        <div 
          className="absolute left-[-12px] top-1/2 w-[10px] h-[2px] bg-gray-200"
          style={{ transform: 'translateY(-50%)' }}
        />
      </>
    )}
    <div className="w-7 h-7 rounded-lg bg-gray-100" />
    <div className="h-2.5 w-16 bg-gray-100 rounded" />
  </div>
);
