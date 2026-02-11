import React, { useState } from "react";
import { useScenario } from "@/context/ScenarioContext";
import { getScenarioByKeyword } from "@/data/mockScenarios";
import { Terminal, Zap, ArrowRight } from "lucide-react";

export function BriefingRoom() {
  const { setScenario, setAppView, setSelectedFunction } = useScenario();
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setIsGenerating(true);

    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const scenario = getScenarioByKeyword(input);
    if (scenario) {
      setScenario(scenario);
      setSelectedFunction(scenario.active_space.functions[0] || null);
      setAppView("simulation");
    }

    setIsGenerating(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  const examplePrompts = [
    { label: "Construction", desc: "Material tracking for a construction company" },
    { label: "Marketing", desc: "Campaign management for a creative agency" },
    { label: "Logistics", desc: "Fleet operations for a shipping company" },
  ];

  return (
    <div className="min-h-screen terminal-container flex flex-col items-center justify-center p-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--terminal-accent)) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Logo & Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-terminal-surface border border-terminal-border mb-6">
            <Terminal className="w-8 h-8 text-terminal-accent" />
          </div>

          <h1 className="text-4xl font-bold text-terminal-text mb-3 tracking-tight">
            Luklak Scenario Builder
          </h1>

          <p className="text-terminal-muted text-lg">
            Describe your prospect<span className="animate-blink text-terminal-accent">_</span>
          </p>
        </div>

        {/* Input Area */}
        <div
          className="terminal-surface border rounded-xl p-6 mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex items-start gap-3 mb-4">
            <span className="text-terminal-accent font-mono text-sm mt-1">{">"}</span>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="A construction company tracking materials across multiple sites..."
              className="flex-1 bg-transparent text-terminal-text font-mono text-base resize-none outline-none placeholder:text-terminal-muted/50 min-h-[100px]"
              disabled={isGenerating}
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-terminal-border">
            <div className="text-terminal-muted text-xs font-mono">
              Press Enter to generate • Shift+Enter for new line
            </div>

            <button
              onClick={handleGenerate}
              disabled={!input.trim() || isGenerating}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-terminal-accent text-terminal-bg font-semibold rounded-lg 
                         hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all
                         animate-pulse-glow"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-terminal-bg border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Generate Simulation
                </>
              )}
            </button>
          </div>
        </div>

        {/* Example Prompts */}
        <div
          className="animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="text-terminal-muted text-xs font-mono uppercase tracking-wider mb-4">
            Try these examples
          </div>

          <div className="grid grid-cols-3 gap-3">
            {examplePrompts.map((prompt) => (
              <button
                key={prompt.label}
                onClick={() => setInput(prompt.desc)}
                className="group terminal-surface border rounded-lg p-4 text-left hover:border-terminal-accent/50 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-terminal-accent" />
                  <span className="text-terminal-text font-medium text-sm">
                    {prompt.label}
                  </span>
                </div>
                <p className="text-terminal-muted text-xs line-clamp-2">
                  {prompt.desc}
                </p>
                <ArrowRight className="w-3 h-3 text-terminal-accent opacity-0 group-hover:opacity-100 transition-opacity mt-2" />
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-terminal-muted/50 text-xs font-mono">
          LUKLAK DEMO ENVIRONMENT • v1.0
        </div>
      </div>
    </div>
  );
}
