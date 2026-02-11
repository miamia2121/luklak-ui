# How the Codebase Works Together

This document explains how different parts of the LUKLAK UI codebase connect and work together to make the app function.

---

## The Big Picture

```
User types "construction"
        │
        ▼
┌─────────────────────┐
│   BriefingRoom.tsx  │  ← Entry screen where user describes scenario
│   (Input screen)    │
└─────────────────────┘
        │
        │ getScenarioByKeyword("construction")
        ▼
┌─────────────────────┐
│  mockScenarios.ts   │  ← Returns matching scenario data
│  (Data store)       │
└─────────────────────┘
        │
        │ setScenario(constructionScenario)
        ▼
┌─────────────────────┐
│ ScenarioContext.tsx │  ← Stores scenario in global state
│   (Brain/Memory)    │
└─────────────────────┘
        │
        │ setAppView("simulation")
        ▼
┌─────────────────────┐
│ SimulationDashboard │  ← Main UI renders with scenario data
│   (Display screen)  │
└─────────────────────┘
```

---

## Part 1: App Entry Point

### File: `src/App.tsx`

```tsx
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ScenarioProvider>        // ← Wraps everything with global state
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />  // ← Home page
          </Routes>
        </BrowserRouter>
      </ScenarioProvider>
    </TooltipProvider>
  </QueryClientProvider>
);
```

**What it does**:
- Sets up the app with providers (React Query, Tooltips, Scenario state)
- Defines routes (currently just "/" and "/object-manager")
- The `ScenarioProvider` is critical - it provides global state to ALL components

---

## Part 2: The Global State (Brain)

### File: `src/context/ScenarioContext.tsx`

This is the "brain" of the app. It stores:

```tsx
interface ScenarioContextType {
  scenario: Scenario | null;           // Current scenario data
  setScenario: (s) => void;            // Update scenario

  appView: "briefing" | "simulation";  // Which screen to show
  setAppView: (v) => void;             // Switch screens

  selectedFunction: ScenarioFunction;  // Which function tab is active
  setSelectedFunction: (f) => void;    // Change active function

  selectedObject: ScenarioObject;      // Which object opens detail panel
  setSelectedObject: (o) => void;      // Select an object

  getChatForObject: (id) => UnifiedChat;  // Get chat messages for object
}
```

**How components use it**:
```tsx
// Any component can access global state:
const { scenario, selectedObject, setSelectedObject } = useScenario();
```

---

## Part 3: The Home Page Router

### File: `src/pages/Index.tsx`

```tsx
const Index = () => {
  const { appView } = useScenario();  // Get current view from context

  // Show BriefingRoom OR SimulationDashboard based on appView
  return appView === "briefing"
    ? <BriefingRoom />
    : <SimulationDashboard />;
};
```

**What it does**:
- Checks global state for `appView`
- If "briefing" → show input screen
- If "simulation" → show dashboard

---

## Part 4: The Input Screen

### File: `src/components/briefing/BriefingRoom.tsx`

```tsx
export function BriefingRoom() {
  const { setScenario, setAppView, setSelectedFunction } = useScenario();
  const [input, setInput] = useState("");

  const handleGenerate = async () => {
    // 1. Get scenario data based on user input
    const scenario = getScenarioByKeyword(input);  // "construction" → constructionScenario

    // 2. Store scenario in global state
    setScenario(scenario);

    // 3. Select first function by default
    setSelectedFunction(scenario.active_space.functions[0]);

    // 4. Switch to simulation view
    setAppView("simulation");
  };

  return (
    <textarea
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
    <button onClick={handleGenerate}>Generate Simulation</button>
  );
}
```

**Flow**:
1. User types "construction" in textarea
2. User clicks "Generate Simulation"
3. `getScenarioByKeyword("construction")` returns construction scenario
4. Scenario is stored in context
5. `appView` changes to "simulation"
6. Index.tsx re-renders → now shows SimulationDashboard

---

## Part 5: The Data Store

### File: `src/data/mockScenarios.ts`

Contains pre-built scenario objects:

```tsx
export const constructionScenario: Scenario = {
  scenario_meta: {
    industry: "Construction",
    company_name: "BuildRight Co.",
  },
  active_space: {
    name: "PROJECT OPS",
    functions: [
      {
        id: "func_1",
        name: "Material Tracking",
        icon: "Package",
        viewType: "kanban",
        objects: [
          { id: "obj_1", title: "Steel Beams", status: "In Transit", ... },
          { id: "obj_2", title: "Concrete Mix", status: "Delivered", ... },
        ],
      },
      // more functions...
    ],
  },
  unified_chat: [
    { related_object_id: "obj_1", messages: [...] },
  ],
};

// Keyword matching function
export function getScenarioByKeyword(keyword: string): Scenario {
  if (keyword.includes("construction")) return constructionScenario;
  if (keyword.includes("marketing")) return marketingScenario;
  if (keyword.includes("logistics")) return logisticsScenario;
  return logisticsScenario; // default
}
```

---

## Part 6: The Main Dashboard

### File: `src/components/simulation/SimulationDashboard.tsx`

```tsx
export function SimulationDashboard() {
  const { scenario, selectedObject } = useScenario();

  return (
    <div className="flex h-screen">
      {/* Region A: 64px left dock */}
      <LeftSidebar />

      {/* Region B: 320px navigation */}
      <NavigationSidebar />

      {/* Region C: Flexible content area */}
      <MainContent activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Region F: 400px detail panel (only if object selected) */}
      {selectedObject && <DetailPanel />}
    </div>
  );
}
```

**What it does**:
- Composes 4 main components side by side
- Conditionally shows DetailPanel only when an object is selected

---

## Part 7: How User Clicks Flow

### Clicking a Function in NavigationSidebar

```
User clicks "Material Tracking"
        │
        ▼
NavigationSidebar.tsx
        │
        │ setSelectedFunction(func)
        │ setSelectedObject(null)  // Clear previous selection
        ▼
ScenarioContext updates
        │
        ▼
MainContent re-renders
        │
        │ Reads selectedFunction from context
        │ Shows objects for that function
        ▼
User sees Material Tracking objects
```

### Clicking an Object Row

```
User clicks "Steel Beams" row
        │
        ▼
NavigationSidebar.tsx (or view component)
        │
        │ setSelectedObject(obj)
        ▼
ScenarioContext updates
        │
        ▼
SimulationDashboard re-renders
        │
        │ selectedObject is now truthy
        │ Conditionally renders DetailPanel
        ▼
DetailPanel.tsx renders
        │
        │ Reads selectedObject from context
        │ Shows object details
        ▼
User sees detail panel slide in
```

---

## Part 8: Component Relationships

```
                    ScenarioContext (provides global state)
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
   LeftSidebar     NavigationSidebar     MainContent ───────► DetailPanel
        │                  │                  │                    │
        │                  │                  │                    │
   Uses:              Uses:              Uses:                Uses:
   - scenario         - scenario          - scenario           - selectedObject
   - setAppView       - selectedFunction  - selectedFunction   - getChatForObject
   - setScenario      - setSelectedFunc   - (renders views)    - setSelectedObject
                      - setSelectedObject

                              │
                              ▼
                    View Components (children of MainContent)
                    ├── KanbanView.tsx
                    ├── ListView.tsx
                    ├── TableView.tsx
                    ├── DashboardView.tsx
                    └── StructureView.tsx
```

---

## Part 9: Data Types

### File: `src/types/scenario.ts`

```tsx
// The complete scenario structure
interface Scenario {
  scenario_meta: {
    industry: string;        // "Construction"
    company_name: string;    // "BuildRight Co."
  };
  active_space: {
    name: string;            // "PROJECT OPS"
    functions: ScenarioFunction[];
  };
  unified_chat: UnifiedChat[];
}

// A function (tab) within a space
interface ScenarioFunction {
  id: string;                // "func_1"
  name: string;              // "Material Tracking"
  icon: string;              // "Package" (Lucide icon name)
  viewType: "kanban" | "table" | "dashboard";
  objects: ScenarioObject[];
}

// An individual object/record
interface ScenarioObject {
  id: string;                // "obj_1"
  title: string;             // "Steel Beams - Tower A"
  status: string;            // "In Transit"
  priority: string;          // "High"
  assignee: string;          // "Mike Chen"
  custom_fields: Record<string, string>;  // { Quantity: "500", ETA: "Tomorrow" }
}

// Chat messages linked to an object
interface UnifiedChat {
  related_object_id: string;  // Links to object.id
  messages: ChatMessage[];
}
```

---

## Part 10: Visual Component Map

```
┌──────────────────────────────────────────────────────────────────────┐
│                         SimulationDashboard                          │
├────────┬─────────────────┬───────────────────────────────┬───────────┤
│        │                 │         MainContent           │           │
│  Left  │   Navigation    │  ┌─────────────────────────┐  │  Detail   │
│ Side   │    Sidebar      │  │ Header (function name)  │  │  Panel    │
│  bar   │                 │  ├─────────────────────────┤  │           │
│        │  ┌───────────┐  │  │ Tabs (Work/Activities)  │  │ ┌───────┐ │
│ ┌────┐ │  │ Company   │  │  ├─────────────────────────┤  │ │Title  │ │
│ │Logo│ │  │ Selector  │  │  │ View Controls           │  │ ├───────┤ │
│ └────┘ │  └───────────┘  │  │ (List/Kanban/Dashboard) │  │ │Fields │ │
│        │                 │  ├─────────────────────────┤  │ │       │ │
│ ┌────┐ │  ┌───────────┐  │  │                         │  │ │       │ │
│ │Bell│ │  │ Functions │  │  │   Active View           │  │ ├───────┤ │
│ └────┘ │  │  List     │  │  │   (KanbanView /         │  │ │Chat   │ │
│        │  │           │  │  │    ListView /           │  │ │       │ │
│        │  │ - Mat.Trk │──┼──│    DashboardView)       │  │ │       │ │
│        │  │ - Inspec. │  │  │                         │  │ │       │ │
│        │  │           │  │  │                         │  │ │       │ │
│        │  └───────────┘  │  │                         │  │ └───────┘ │
│        │                 │  └─────────────────────────┘  │           │
│  64px  │     320px       │          Flexible             │   400px   │
└────────┴─────────────────┴───────────────────────────────┴───────────┘
```

---

## Summary: The Complete Flow

1. **App loads** → `App.tsx` wraps everything in `ScenarioProvider`

2. **Initial state** → `appView = "briefing"`, `scenario = null`

3. **User sees BriefingRoom** → Types description, clicks Generate

4. **BriefingRoom calls** → `getScenarioByKeyword()` → gets scenario data

5. **Context updates** → `scenario` set, `appView` becomes "simulation"

6. **Index re-renders** → Now shows `SimulationDashboard`

7. **Dashboard reads context** → Gets `scenario`, `selectedFunction`

8. **Child components render**:
   - `LeftSidebar` → Shows dock icons
   - `NavigationSidebar` → Shows functions + objects list
   - `MainContent` → Shows current view (Kanban/List/etc)
   - `DetailPanel` → Shows when `selectedObject` is set

9. **User clicks object** → `setSelectedObject(obj)` → DetailPanel appears

10. **User clicks back** → `setAppView("briefing")` → Returns to input

---

## Key Files to Understand

| Priority | File | Purpose |
|----------|------|---------|
| 1 | `ScenarioContext.tsx` | Global state - understand this first |
| 2 | `types/scenario.ts` | Data structure definitions |
| 3 | `mockScenarios.ts` | Example data |
| 4 | `SimulationDashboard.tsx` | Main layout composition |
| 5 | `NavigationSidebar.tsx` | How functions/objects are listed |
| 6 | `MainContent.tsx` | How views are switched |
| 7 | `DetailPanel.tsx` | How object details are shown |

---

## How to Add New Features

### Adding a new scenario:
1. Edit `mockScenarios.ts`
2. Add new scenario object following `Scenario` type
3. Add keyword match in `getScenarioByKeyword()`

### Adding a new view type:
1. Create new view component in `simulation/views/`
2. Import in `MainContent.tsx`
3. Add to views array and render logic

### Adding new object fields:
1. Add to `custom_fields` in scenario data
2. They auto-render in `DetailPanel.tsx`

### Adding a tour system:
1. Create `TourOverlay.tsx` component
2. Add `showTour` state to context
3. Add `data-tour-target` attributes to regions
4. Render overlay in `SimulationDashboard.tsx`
