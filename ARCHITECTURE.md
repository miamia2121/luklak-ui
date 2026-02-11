# Luklak Demo Builder — CTO Architecture Brief

**Author**: Technical Architecture Review
**Date**: 2026-02-11
**Status**: Development Blueprint

---

## Executive Summary

You're building a **Demo Generation System** — a tool that lets sales/product teams create customized, interactive demos of Luklak's platform for different industries and use cases. Instead of maintaining dozens of static demos, you have:

1. **One flexible UI** (LUKLAK UI) that can render any scenario
2. **One AI agent** (LUKLAK-DEMO-AGENT) that generates scenario data on demand

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         LUKLAK DEMO SYSTEM                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────────────┐         ┌──────────────────────┐             │
│  │  LUKLAK-DEMO-AGENT   │         │     LUKLAK UI        │             │
│  │  (AI Code Generator) │         │  (React Renderer)    │             │
│  │                      │         │                      │             │
│  │  Input: "Build a     │ ──────► │  Renders scenario    │             │
│  │  construction demo"  │ JSON    │  with 6-region       │             │
│  │                      │ Data    │  layout system       │             │
│  │  Output: Complete    │         │                      │             │
│  │  scenarioData object │         │  Deployed on Vercel  │             │
│  └──────────────────────┘         └──────────────────────┘             │
│           │                                  │                          │
│           ▼                                  ▼                          │
│  ┌──────────────────────┐         ┌──────────────────────┐             │
│  │  System Prompt       │         │  Live Demo URL       │             │
│  │  (Design Spec)       │         │  luklak-ui.vercel.app│             │
│  └──────────────────────┘         └──────────────────────┘             │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Current Codebase Analysis

### What Already Exists (LUKLAK UI)

| Layer | Files | Status |
|-------|-------|--------|
| **App Shell** | `App.tsx`, routing | ✅ Complete |
| **State Management** | `ScenarioContext.tsx` | ✅ Complete |
| **Type System** | `types/scenario.ts` | ✅ Complete |
| **Sample Data** | `data/mockScenarios.ts` | ✅ 3 scenarios |
| **Layout Components** | `SimulationDashboard.tsx` | ✅ Working |
| **Region A** (Dock) | `LeftSidebar.tsx` | ✅ Exists |
| **Region B** (Structure) | `NavigationSidebar.tsx` | ✅ Exists |
| **Region C** (Content) | `MainContent.tsx` | ✅ Exists |
| **Region F** (Detail) | `DetailPanel.tsx` | ✅ Exists |
| **Views** | Table, Kanban, List, Dashboard | ✅ All exist |
| **UI Components** | shadcn/ui library | ✅ 40+ components |

### What's Missing (Gap Analysis)

| Component | Status | Work Needed |
|-----------|--------|-------------|
| **Tour System** | ❌ Missing | Build TourOverlay component |
| **Design Tokens** | ❌ Missing | Create centralized token file |
| **Region E** (FAB) | ❌ Missing | Add Quick Action button |
| **Spec Compliance** | ⚠️ Partial | Audit dimensions, spacing, colors |

---

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        DATA FLOW                                │
└─────────────────────────────────────────────────────────────────┘

1. SCENARIO DEFINITION (JSON)
   ┌────────────────────────────────────────────────────────────┐
   │ {                                                          │
   │   scenario_meta: { industry, company_name },               │
   │   active_space: {                                          │
   │     name: "PROJECT OPS",                                   │
   │     functions: [                                           │
   │       { id, name, icon, viewType, objects: [...] }         │
   │     ]                                                      │
   │   },                                                       │
   │   unified_chat: [{ related_object_id, messages }]          │
   │ }                                                          │
   └────────────────────────────────────────────────────────────┘
                              │
                              ▼
2. CONTEXT PROVIDER (React Context)
   ┌────────────────────────────────────────────────────────────┐
   │ ScenarioContext                                            │
   │ ├── scenario          → Current scenario data              │
   │ ├── selectedFunction  → Which function tab is active       │
   │ ├── selectedObject    → Which object opens detail panel    │
   │ └── getChatForObject  → Fetch chat for specific object     │
   └────────────────────────────────────────────────────────────┘
                              │
                              ▼
3. COMPONENT TREE
   ┌────────────────────────────────────────────────────────────┐
   │ SimulationDashboard                                        │
   │ ├── LeftSidebar       → Region A (64px dock)               │
   │ ├── NavigationSidebar → Region B (320px structure)         │
   │ ├── MainContent       → Region C (flexible content)        │
   │ │   ├── TableView                                          │
   │ │   ├── KanbanView                                         │
   │ │   ├── ListView                                           │
   │ │   └── DashboardView                                      │
   │ └── DetailPanel       → Region F (460px detail)            │
   └────────────────────────────────────────────────────────────┘
```

---

## Tech Stack Reference

### Current Stack (What You're Using)

| Technology | Purpose | You Need to Know |
|------------|---------|------------------|
| **React 18** | UI Framework | Components, hooks, state |
| **TypeScript** | Type safety | Interfaces, generics |
| **Vite** | Build tool | Just works, minimal config |
| **Tailwind CSS** | Styling | Utility classes |
| **shadcn/ui** | Component library | Pre-built accessible components |
| **React Router** | Navigation | Routes, params |
| **React Query** | Server state | (Not heavily used yet) |
| **Lucide React** | Icons | Icon components |

### Key Files Map

```
src/
├── App.tsx                          ← Entry point, routing
├── context/
│   └── ScenarioContext.tsx          ← Global state for scenarios
├── types/
│   └── scenario.ts                  ← TypeScript interfaces
├── data/
│   └── mockScenarios.ts             ← Sample scenario data
├── components/
│   ├── simulation/
│   │   ├── SimulationDashboard.tsx  ← Main layout (6 regions)
│   │   ├── LeftSidebar.tsx          ← Region A
│   │   ├── NavigationSidebar.tsx    ← Region B
│   │   ├── MainContent.tsx          ← Region C
│   │   ├── DetailPanel.tsx          ← Region F
│   │   └── views/
│   │       ├── TableView.tsx
│   │       ├── KanbanView.tsx
│   │       ├── ListView.tsx
│   │       └── DashboardView.tsx
│   └── ui/                          ← shadcn components (don't modify)
└── pages/
    └── Index.tsx                    ← Home page
```

---

## What You Need to Learn

### Tier 1: Essential (Must Know)

| Skill | Why | How to Learn with AI |
|-------|-----|---------------------|
| **React Components** | Everything is a component | "Explain this component to me" |
| **useState/useContext** | State management | "What does useState do here?" |
| **TypeScript Interfaces** | Data shapes | "Create an interface for X" |
| **Tailwind Classes** | All styling | "What does `px-5 py-4` mean?" |
| **Props Pattern** | Data passing | "How do props work in React?" |

### Tier 2: Important (Should Know)

| Skill | Why | How to Learn with AI |
|-------|-----|---------------------|
| **Custom Hooks** | Reusable logic | "Create a hook for X" |
| **Context API** | Global state | "Explain ScenarioContext" |
| **Conditional Rendering** | Show/hide UI | "How to conditionally render?" |
| **Map/Filter** | Rendering lists | "Map this array to components" |

### Tier 3: Nice to Have

| Skill | Why | How to Learn with AI |
|-------|-----|---------------------|
| **React Query** | Server state | Skip for now, not needed |
| **Testing** | Quality | "Write a test for this component" |
| **Performance** | Optimization | Defer until needed |

---

## Development Workflow (With AI)

### How to Work on This Project

```
┌─────────────────────────────────────────────────────────────────┐
│                    YOUR WORKFLOW                                │
└─────────────────────────────────────────────────────────────────┘

1. UNDERSTAND → Read existing code with AI
   "Explain what SimulationDashboard.tsx does"
   "What is the Scenario type structure?"

2. PLAN → Discuss changes with AI
   "I want to add a tour system. What components do I need?"
   "How should the TourOverlay component work?"

3. BUILD → AI writes code, you review
   "Create a TourOverlay component following the spec"
   "Add data-tour-target to the regions"

4. TEST → Run locally, verify visually
   npm run dev → http://localhost:5173

5. COMMIT → Save progress
   git add . && git commit -m "Add tour system"

6. DEPLOY → Push to trigger Vercel
   git push
```

---

## Implementation Roadmap

### Phase 1: Foundation (Day 1)
```
[ ] Verify Vercel deployment works
[ ] Run locally: npm install && npm run dev
[ ] Understand existing code structure
[ ] Read through mockScenarios.ts
```

### Phase 2: Spec Compliance (Day 2-3)
```
[ ] Audit DetailPanel → ensure 460px width
[ ] Audit LeftSidebar → ensure 64px width
[ ] Audit NavigationSidebar → ensure 320px width
[ ] Check icon rendering (solid bg + white icon)
[ ] Check table padding (px-5)
```

### Phase 3: Tour System (Day 4-5)
```
[ ] Create src/components/tour/TourOverlay.tsx
[ ] Create src/data/tourSteps.ts
[ ] Add data-tour-target attributes to regions
[ ] Add tour state to ScenarioContext
[ ] Add "Start Tour" button
```

### Phase 4: Design Tokens (Day 6)
```
[ ] Create src/tokens/designTokens.ts
[ ] Define colors, spacing, zIndex
[ ] Refactor components to use tokens
```

### Phase 5: Polish & Test (Day 7)
```
[ ] Test all 3 scenarios render correctly
[ ] Test tour walkthrough
[ ] Test responsive behavior
[ ] Final Vercel deployment
```

---

## Quick Commands Reference

```bash
# Navigate to project
cd "E:/Mia's Corner/MP/LUKLAK UI"

# Install dependencies (first time)
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Git workflow
git status
git add .
git commit -m "Your message"
git push
```

---

## Questions to Ask AI When Stuck

### Understanding Code
- "Explain what this component does line by line"
- "What props does DetailPanel accept?"
- "How does useScenario() work?"

### Making Changes
- "Add a new property X to the Scenario type"
- "Create a new view component for Y"
- "Modify MainContent to support Z"

### Debugging
- "This error says X, what does it mean?"
- "The component isn't rendering, help me debug"
- "The styles aren't applying, what's wrong?"

### Best Practices
- "Is this the right way to do X in React?"
- "Should I use useState or useContext for this?"
- "How do I make this component reusable?"

---

## Summary

**You have**: A working React app with scenario-driven rendering
**You need**: Tour system, design tokens, spec compliance
**Your approach**: AI-assisted development, review each change
**Timeline**: ~1 week for full implementation

The hardest part is already done (component structure, state management, views). The remaining work is refinement and adding the tour feature.

**Next Step**: Run `npm run dev` and explore the existing UI in your browser.
