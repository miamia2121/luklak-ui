import React, { useState } from "react";
import { ObjectDefinition } from "@/types/objectDefinition";
import { ObjectCard } from "./ObjectCard";
import { sampleObjectDefinitions } from "@/data/objectDefinitions";
import { Search, Plus, LayoutGrid, List, Database } from "lucide-react";

interface ObjectManagerProps {
  definitions?: ObjectDefinition[];
  onObjectClick?: (definition: ObjectDefinition) => void;
}

export function ObjectManager({
  definitions = sampleObjectDefinitions,
  onObjectClick,
}: ObjectManagerProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "object" | "sub-object">("all");

  const filtered = definitions.filter((def) => {
    const matchesSearch =
      def.name.toLowerCase().includes(search.toLowerCase()) ||
      def.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" || def.category === filter;
    return matchesSearch && matchesFilter;
  });

  const objectCount = definitions.filter((d) => d.category === "object").length;
  const subObjectCount = definitions.filter((d) => d.category === "sub-object").length;

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 py-5 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Database className="w-4.5 h-4.5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Object Manager</h1>
              <p className="text-xs text-muted-foreground">
                {definitions.length} objects · {definitions.reduce((acc, d) => acc + d.fields.length, 0)} total fields
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
            <Plus className="w-3.5 h-3.5" />
            New Object
          </button>
        </div>

        {/* Search + filters */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search objects..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-muted border-none rounded-lg outline-none focus:ring-1 focus:ring-ring text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex items-center bg-muted rounded-lg p-0.5">
            {(["all", "object", "sub-object"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-[11px] font-medium rounded-md transition-colors capitalize ${
                  filter === f
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f === "all" ? `All (${definitions.length})` : f === "object" ? `Object (${objectCount})` : `Sub-object (${subObjectCount})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto p-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <Database className="w-10 h-10 mb-3 opacity-30" />
            <p className="text-sm font-medium">No objects found</p>
            <p className="text-xs mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((def) => (
              <ObjectCard
                key={def.id}
                definition={def}
                onClick={onObjectClick}
                maxVisibleFields={3}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
