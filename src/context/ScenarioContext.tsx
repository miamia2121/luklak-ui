import React, { createContext, useContext, useState, ReactNode } from "react";
import { Scenario, AppView, ScenarioFunction, ScenarioObject, UnifiedChat } from "@/types/scenario";

interface ScenarioContextType {
  scenario: Scenario | null;
  setScenario: (scenario: Scenario | null) => void;
  appView: AppView;
  setAppView: (view: AppView) => void;
  selectedFunction: ScenarioFunction | null;
  setSelectedFunction: (func: ScenarioFunction | null) => void;
  selectedObject: ScenarioObject | null;
  setSelectedObject: (obj: ScenarioObject | null) => void;
  getChatForObject: (objectId: string) => UnifiedChat | undefined;
}

const ScenarioContext = createContext<ScenarioContextType | undefined>(undefined);

export function ScenarioProvider({ children }: { children: ReactNode }) {
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [appView, setAppView] = useState<AppView>("briefing");
  const [selectedFunction, setSelectedFunction] = useState<ScenarioFunction | null>(null);
  const [selectedObject, setSelectedObject] = useState<ScenarioObject | null>(null);

  const getChatForObject = (objectId: string): UnifiedChat | undefined => {
    if (!scenario) return undefined;
    return scenario.unified_chat.find((chat) => chat.related_object_id === objectId);
  };

  return (
    <ScenarioContext.Provider
      value={{
        scenario,
        setScenario,
        appView,
        setAppView,
        selectedFunction,
        setSelectedFunction,
        selectedObject,
        setSelectedObject,
        getChatForObject,
      }}
    >
      {children}
    </ScenarioContext.Provider>
  );
}

export function useScenario() {
  const context = useContext(ScenarioContext);
  if (context === undefined) {
    throw new Error("useScenario must be used within a ScenarioProvider");
  }
  return context;
}
