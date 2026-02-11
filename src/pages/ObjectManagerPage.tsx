import React from "react";
import { ObjectManager } from "@/components/object-manager/ObjectManager";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ObjectManagerPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top bar */}
      <div className="h-12 border-b border-border flex items-center px-4 gap-3 bg-card">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>
        <div className="w-px h-5 bg-border" />
        <span className="text-xs font-medium text-foreground">Object Manager</span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <ObjectManager />
      </div>
    </div>
  );
};

export default ObjectManagerPage;
