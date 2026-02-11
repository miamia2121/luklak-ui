import React from "react";
import { BusinessStructure } from "@/types/operationalStructure";
import { SpaceCard } from "./SpaceCard";
import { sampleBusinessStructure } from "@/data/sampleBusinessStructure";

interface OperationalOverviewProps {
  structure?: BusinessStructure;
}

export const OperationalOverview: React.FC<OperationalOverviewProps> = ({ 
  structure = sampleBusinessStructure 
}) => {
  // Flatten all spaces from all areas for display
  const allSpaces = structure.areas.flatMap(area => area.spaces);

  // Calculate offsets for visual stagger effect
  const getOffset = (index: number) => {
    const pattern = [0, 40, 80, 20, 60, 100, 30, 70];
    return pattern[index % pattern.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 p-8 lg:p-12 overflow-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur rounded-full border border-gray-200 shadow-sm mb-4">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-gray-600">
            {structure.industry}
          </span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
          {structure.companyName}
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Your operational landscape at a glance — Areas, Spaces, Functions, and Objects working together
        </p>
      </div>

      {/* Structure Grid */}
      <div className="flex flex-wrap gap-8 lg:gap-10 justify-center items-start pb-32">
        {allSpaces.map((space, idx) => (
          <div
            key={idx}
            className="transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
          >
            <SpaceCard space={space} offset={getOffset(idx)} />
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-lg rounded-full px-6 py-3 shadow-lg border border-gray-200">
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div 
              className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] border-b-blue-500" 
            />
            <span>Space</span>
          </div>
          <div className="w-px h-4 bg-gray-300" />
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-blue-100 border border-blue-200" />
            <span>Primary Object</span>
          </div>
          <div className="w-px h-4 bg-gray-300" />
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gray-100 border border-gray-200" />
            <span>Child Object</span>
          </div>
        </div>
      </div>

      {/* Decorative Illustration Placeholder */}
      <div className="fixed bottom-0 right-8 pointer-events-none opacity-50">
        <svg width="200" height="300" viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ladder */}
          <rect x="60" y="50" width="8" height="250" rx="2" fill="#3B82F6"/>
          <rect x="132" y="50" width="8" height="250" rx="2" fill="#3B82F6"/>
          <rect x="60" y="80" width="80" height="6" rx="2" fill="#3B82F6"/>
          <rect x="60" y="120" width="80" height="6" rx="2" fill="#3B82F6"/>
          <rect x="60" y="160" width="80" height="6" rx="2" fill="#3B82F6"/>
          <rect x="60" y="200" width="80" height="6" rx="2" fill="#3B82F6"/>
          <rect x="60" y="240" width="80" height="6" rx="2" fill="#3B82F6"/>
          
          {/* Person silhouette */}
          <circle cx="100" cy="35" r="18" fill="#1E293B"/>
          <path d="M80 70 Q100 90 120 70 L115 130 Q100 140 85 130 Z" fill="#3B82F6"/>
          <rect x="85" y="130" width="10" height="35" rx="3" fill="#1E293B"/>
          <rect x="105" y="130" width="10" height="35" rx="3" fill="#1E293B"/>
          
          {/* Arm with paintbrush */}
          <path d="M120 80 Q140 60 155 55" stroke="#1E293B" strokeWidth="8" strokeLinecap="round"/>
          <rect x="150" y="45" width="25" height="8" rx="2" fill="#F59E0B" transform="rotate(-20 150 45)"/>
        </svg>
      </div>
    </div>
  );
};
