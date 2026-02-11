import React, { useState } from "react";
import { useScenario } from "@/context/ScenarioContext";
import { LeftSidebar } from "./LeftSidebar";
import { NavigationSidebar } from "./NavigationSidebar";
import { MainContent } from "./MainContent";
import { DetailPanel } from "./DetailPanel";

export function SimulationDashboard() {
  const { scenario, selectedObject } = useScenario();
  const [activeTab, setActiveTab] = useState<"WORK VIEWS" | "ACTIVITIES" | "SPACE CHAT">("WORK VIEWS");

  if (!scenario) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <p className="text-muted-foreground">No scenario loaded</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-muted text-sm">
      {/* Left Icon Sidebar */}
      <LeftSidebar />

      {/* Navigation Sidebar */}
      <NavigationSidebar />

      {/* Main Content Area */}
      <MainContent activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Right Detail Panel */}
      {selectedObject && activeTab !== "SPACE CHAT" && <DetailPanel />}
    </div>
  );
}
