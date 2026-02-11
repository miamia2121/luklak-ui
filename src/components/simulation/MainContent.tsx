import React, { useState } from "react";
import { useScenario } from "@/context/ScenarioContext";
import { Search, Filter, HelpCircle, X, Grid, Clock, Settings, BarChart3, Plus, Network, Compass } from "lucide-react";
import { KanbanView } from "./views/KanbanView";
import { ListView } from "./views/ListView";
import { DashboardView } from "./views/DashboardView";
import { SpaceChat } from "./views/SpaceChat";
import { StructureView } from "./views/StructureView";
import { OperationalOverview } from "@/components/overview/OperationalOverview";

interface MainContentProps {
  activeTab: "WORK VIEWS" | "ACTIVITIES" | "SPACE CHAT";
  setActiveTab: (tab: "WORK VIEWS" | "ACTIVITIES" | "SPACE CHAT") => void;
}

export function MainContent({ activeTab, setActiveTab }: MainContentProps) {
  const { scenario, selectedFunction } = useScenario();
  const [activeView, setActiveView] = useState<"List" | "Kanban" | "Timeline" | "Calendar" | "Dashboard" | "Structure" | "Overview">(
    selectedFunction?.viewType === "kanban" ? "Kanban" : "List"
  );

  if (!scenario || !selectedFunction) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted">
        <p className="text-muted-foreground">Select a function from the sidebar</p>
      </div>
    );
  }

  const tabs = ["WORK VIEWS", "ACTIVITIES", "SPACE CHAT"] as const;
  const views = ["List", "Kanban", "Timeline", "Calendar", "Dashboard", "Structure", "Overview"] as const;

  const renderContent = () => {
    if (activeTab === "SPACE CHAT") {
      return <SpaceChat />;
    }

    if (activeTab === "ACTIVITIES") {
      return (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <Clock className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-lg font-medium">Activity Feed</p>
            <p className="text-sm mt-2">All workspace activities will appear here</p>
          </div>
        </div>
      );
    }

    if (activeView === "Overview") {
      return <OperationalOverview />;
    }

    if (activeView === "Structure") {
      return <StructureView />;
    }

    if (activeView === "Dashboard") {
      return <DashboardView />;
    }

    if (activeView === "Kanban") {
      return <KanbanView />;
    }

    return <ListView />;
  };

  return (
    <div className="flex-1 flex flex-col bg-card">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-primary">{selectedFunction.name}</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border border-border rounded pl-3 pr-10 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary bg-card"
            />
            <Search className="w-4 h-4 text-muted-foreground absolute right-8 top-1/2 transform -translate-y-1/2" />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded">
              <Filter className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded hover:bg-primary/20 font-medium transition-colors">
            <HelpCircle className="w-4 h-4" />
            <span>Tour</span>
          </button>
          <button className="p-2 hover:bg-muted rounded">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-card border-b border-border px-6">
        <div className="flex items-center space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="flex items-center space-x-2">
                {tab === "WORK VIEWS" && <Grid className="w-4 h-4" />}
                {tab === "ACTIVITIES" && <Clock className="w-4 h-4" />}
                {tab === "SPACE CHAT" && <div className="w-4 h-4 bg-muted-foreground/30 rounded" />}
                <span>{tab}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* View Controls */}
      {activeTab === "WORK VIEWS" && (
        <div className="bg-card border-b border-border px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select className="border border-border rounded px-3 py-1.5 text-sm bg-card">
              <option>Function</option>
            </select>

            <div className="flex items-center space-x-1 bg-muted rounded p-1">
              {views.map((view) => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={`px-3 py-1 rounded text-sm flex items-center space-x-1.5 transition-colors ${
                    activeView === view
                      ? "bg-card shadow-sm text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {view === "Dashboard" && <BarChart3 className="w-3.5 h-3.5" />}
                  {view === "Structure" && <Network className="w-3.5 h-3.5" />}
                  {view === "Overview" && <Compass className="w-3.5 h-3.5" />}
                  <span>{view}</span>
                </button>
              ))}
              <button className="px-2 py-1 text-muted-foreground hover:text-foreground">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button className="text-muted-foreground hover:text-foreground">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-auto">{renderContent()}</div>
    </div>
  );
}
