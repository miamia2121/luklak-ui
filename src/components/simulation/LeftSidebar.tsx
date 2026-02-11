import React from "react";
import { useScenario } from "@/context/ScenarioContext";
import { Bell, LayoutGrid, Grid, Users, Menu, ArrowLeft } from "lucide-react";

export function LeftSidebar() {
  const { scenario, setAppView, setScenario, setSelectedFunction, setSelectedObject } = useScenario();

  const handleBackToBriefing = () => {
    setScenario(null);
    setSelectedFunction(null);
    setSelectedObject(null);
    setAppView("briefing");
  };

  return (
    <div className="w-16 bg-luklak-navy flex flex-col items-center py-4 space-y-4">
      {/* Logo */}
      <div className="w-12 h-12 bg-card rounded flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity" onClick={handleBackToBriefing}>
        <div className="text-luklak-navy font-bold text-xs leading-tight text-center">
          <div>Luk</div>
          <div>lak</div>
        </div>
      </div>

      {/* Inbox */}
      <div className="relative cursor-pointer group">
        <div className="w-10 h-10 bg-luklak-navy-light rounded flex items-center justify-center text-card group-hover:bg-luklak-blue/80 transition-colors">
          <Bell className="w-5 h-5" />
        </div>
        <div className="absolute -top-1 -right-1 bg-luklak-red text-card text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
          12
        </div>
        <div className="text-card text-[10px] mt-1 text-center opacity-80">Inbox</div>
      </div>

      {/* Personal Home */}
      <div className="cursor-pointer group">
        <div className="w-10 h-10 bg-luklak-navy-light rounded flex items-center justify-center group-hover:bg-luklak-blue/80 transition-colors">
          <LayoutGrid className="w-5 h-5 text-card" />
        </div>
        <div className="text-card text-[9px] text-center leading-tight mt-1 opacity-80">
          Personal
          <br />
          Home
        </div>
      </div>

      {/* Workspace */}
      <div className="cursor-pointer group">
        <div className="w-10 h-10 bg-luklak-navy-light rounded flex items-center justify-center group-hover:bg-luklak-blue/80 transition-colors">
          <Grid className="w-5 h-5 text-card" />
        </div>
        <div className="text-card text-[10px] text-center mt-1 opacity-80">Workspace</div>
      </div>

      <div className="flex-1" />

      {/* Organization */}
      <div className="cursor-pointer group">
        <div className="w-10 h-10 bg-luklak-teal rounded-full flex items-center justify-center group-hover:bg-luklak-teal-light transition-colors">
          <Users className="w-5 h-5 text-card" />
        </div>
        <div className="text-card text-[10px] text-center mt-1 opacity-80">Org</div>
      </div>

      {/* More */}
      <div className="cursor-pointer group">
        <div className="w-10 h-10 bg-luklak-navy-light rounded flex items-center justify-center group-hover:bg-luklak-blue/80 transition-colors">
          <Menu className="w-5 h-5 text-card" />
        </div>
        <div className="text-card text-[10px] text-center mt-1 opacity-80">More</div>
      </div>

      {/* User Avatar */}
      <div className="w-10 h-10 bg-luklak-teal-light rounded-full cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center text-card font-semibold">
        D
      </div>
      <div className="text-card text-[10px] text-center opacity-80">Demo</div>

      {/* Company Badge */}
      <div className="cursor-pointer group">
        <div className="w-10 h-10 bg-luklak-navy-light rounded flex items-center justify-center">
          <div className="w-6 h-6 bg-luklak-orange rounded" />
        </div>
        <div className="text-card text-[10px] text-center mt-1 opacity-80 truncate max-w-[60px]">
          {scenario?.scenario_meta.company_name.split(" ")[0] || "Business"}
        </div>
      </div>

      {/* Back to Briefing */}
      <button
        onClick={handleBackToBriefing}
        className="w-10 h-10 bg-luklak-navy-light rounded flex items-center justify-center hover:bg-luklak-blue/80 transition-colors mt-2"
        title="Back to Briefing Room"
      >
        <ArrowLeft className="w-5 h-5 text-card" />
      </button>
    </div>
  );
}
