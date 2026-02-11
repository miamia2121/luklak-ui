import React from "react";
import { FunctionBlock as FunctionBlockType } from "@/types/operationalStructure";
import { ObjectRow, PlaceholderRow } from "./ObjectRow";

interface FunctionBlockProps {
  func: FunctionBlockType;
}

export const FunctionBlock: React.FC<FunctionBlockProps> = ({ func }) => {
  const primaryObj = func.objects.find((o) => o.isPrimary);
  const childObjects = func.objects.filter((o) => !o.isPrimary);

  return (
    <div className="space-y-2">
      {/* Function Header */}
      <div className="mb-3">
        <h4 
          className="font-semibold text-sm"
          style={{ color: func.primaryColor }}
        >
          {func.name}
        </h4>
        <p className="text-xs text-gray-400">
          Function: {func.label}
        </p>
      </div>

      {/* Primary Object - highlighted with connecting line starting point */}
      {primaryObj && (
        <div 
          className="rounded-md py-2 px-2.5 -mx-1 relative"
          style={{ backgroundColor: `${func.primaryColor}08` }}
        >
          <ObjectRow object={primaryObj} primaryColor={func.primaryColor} />
        </div>
      )}

      {/* Child Objects with connector lines */}
      <div className="space-y-3 pt-1 ml-1 relative">
        {/* Main vertical connector line from primary */}
        {childObjects.length > 0 && (
          <div 
            className="absolute left-[10px] top-0 w-[2px] bg-gray-200"
            style={{ height: `calc(100% - 12px)` }}
          />
        )}
        
        {childObjects.map((obj, idx) => (
          <ObjectRow 
            key={idx} 
            object={obj} 
            isChild 
            primaryColor={func.primaryColor}
            showConnector
            isLastChild={idx === childObjects.length - 1}
          />
        ))}
      </div>

      {/* Placeholder skeleton row */}
      <div className="space-y-2.5 pt-1 ml-1">
        <PlaceholderRow isChild showConnector />
      </div>
    </div>
  );
};
