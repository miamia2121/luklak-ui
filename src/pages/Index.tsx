import React from "react";
import { useScenario } from "@/context/ScenarioContext";
import { BriefingRoom } from "@/components/briefing/BriefingRoom";
import { SimulationDashboard } from "@/components/simulation/SimulationDashboard";

const Index = () => {
  const { appView } = useScenario();

  return appView === "briefing" ? <BriefingRoom /> : <SimulationDashboard />;
};

export default Index;
