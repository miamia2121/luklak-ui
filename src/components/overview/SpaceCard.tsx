import React from "react";
import { Space } from "@/types/operationalStructure";
import { FunctionBlock } from "./FunctionBlock";
import { getIcon } from "./iconMap";

interface SpaceCardProps {
  space: Space;
  offset?: number;
}

export const SpaceCard: React.FC<SpaceCardProps> = ({ space, offset = 0 }) => {
  const SpaceIcon = getIcon(space.icon);

  return (
    <div 
      className="relative"
      style={{ marginTop: offset }}
    >
      {/* Floating Icon Badge */}
      <div
        className={`absolute -top-4 -right-4 w-12 h-12 rounded-xl ${space.iconBg} flex items-center justify-center shadow-lg z-10 border-4 border-white`}
      >
        <SpaceIcon className={`w-6 h-6 ${space.iconColor}`} />
      </div>

      {/* Card Container */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 min-w-[260px] max-w-[280px]">
        {/* Space Header */}
        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
          <div
            className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px]"
            style={{ borderBottomColor: space.color }}
          />
          <span className="text-xs font-bold text-gray-700 tracking-wider">
            {space.name}
          </span>
        </div>

        {/* Functions */}
        <div className="space-y-8">
          {space.functions.map((func, idx) => (
            <FunctionBlock key={idx} func={func} />
          ))}
        </div>
      </div>
    </div>
  );
};
