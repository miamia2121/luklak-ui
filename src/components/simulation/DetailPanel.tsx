import React, { useState } from "react";
import { useScenario } from "@/context/ScenarioContext";
import { 
  X, Send, MoreVertical, Reply, Smile, ArrowRight,
  FileText, User, DollarSign, CreditCard, FileCheck,
  Package, Truck, ClipboardCheck, Calendar, Target, Wrench,
  Users, Building, Clock
} from "lucide-react";

// Avatar component using colored backgrounds with initials
const avatarColors = [
  "bg-luklak-blue",
  "bg-luklak-teal", 
  "bg-luklak-orange",
  "bg-luklak-purple",
  "bg-pink-500"
];

const avatarStyles = [
  { bg: "bg-luklak-blue", hasGlasses: true, hair: "curly" },
  { bg: "bg-luklak-teal", hasGlasses: true, hair: "short" },
  { bg: "bg-amber-400", hasGlasses: false, hair: "spiky" },
  { bg: "bg-pink-400", hasGlasses: false, hair: "ponytail" },
  { bg: "bg-luklak-orange", hasGlasses: false, hair: "bob" },
];

interface AvatarProps {
  index?: number;
  name: string;
  size?: "sm" | "md" | "lg";
  showOnlineIndicator?: boolean;
}

function Avatar({ index = 0, name, size = "md", showOnlineIndicator = false }: AvatarProps) {
  const style = avatarStyles[index % avatarStyles.length];
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  };
  const fontSize = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };

  return (
    <div className="relative">
      <div className={`${sizeClasses[size]} rounded-full ${style.bg} flex items-center justify-center text-white ${fontSize[size]} font-semibold shadow-md`}>
        {name.charAt(0).toUpperCase()}
      </div>
      {showOnlineIndicator && (
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
      )}
    </div>
  );
}

// Icon mapping for object types
const objectIcons: Record<string, React.ReactNode> = {
  Contract: <FileText className="w-4 h-4 text-luklak-purple" />,
  Delivery: <Truck className="w-4 h-4 text-luklak-blue" />,
  Material: <Package className="w-4 h-4 text-luklak-teal" />,
  Inspection: <ClipboardCheck className="w-4 h-4 text-luklak-orange" />,
  Campaign: <Target className="w-4 h-4 text-pink-500" />,
  Maintenance: <Wrench className="w-4 h-4 text-slate-500" />,
  Task: <FileCheck className="w-4 h-4 text-luklak-blue" />,
};

function getObjectIcon(type?: string) {
  if (!type) return <FileText className="w-4 h-4 text-luklak-purple" />;
  return objectIcons[type] || <FileText className="w-4 h-4 text-luklak-purple" />;
}

// Status badge component
function StatusBadge({ status }: { status: string }) {
  const getStatusColor = (status: string) => {
    const lower = status.toLowerCase();
    if (lower.includes("draft") || lower.includes("pending")) return "bg-amber-100 text-amber-700";
    if (lower.includes("progress") || lower.includes("transit")) return "bg-blue-100 text-blue-700";
    if (lower.includes("complete") || lower.includes("deliver")) return "bg-green-100 text-green-700";
    if (lower.includes("delay") || lower.includes("critical")) return "bg-red-100 text-red-700";
    if (lower.includes("review")) return "bg-purple-100 text-purple-700";
    return "bg-slate-100 text-slate-700";
  };

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-semibold uppercase ${getStatusColor(status)}`}>
      {status}
    </span>
  );
}

// Progress bar with avatars
function ProgressBar() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        <Avatar index={0} name="D" size="sm" />
        <Avatar index={1} name="E" size="sm" />
      </div>
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <div className="w-2/3 h-full bg-gradient-to-r from-luklak-blue to-luklak-teal rounded-full" />
      </div>
    </div>
  );
}

// Chat message bubble
interface ChatBubbleProps {
  message: { user: string; text: string; timestamp?: string; avatarIndex?: number };
  isOwnMessage?: boolean;
}

function ChatBubble({ message, isOwnMessage = false }: ChatBubbleProps) {
  // Parse @mentions in text
  const parseText = (text: string) => {
    const parts = text.split(/(@\w+)/g);
    return parts.map((part, i) => {
      if (part.startsWith("@")) {
        return <span key={i} className="text-luklak-blue font-medium">{part}</span>;
      }
      return part;
    });
  };

  const avatarIndex = message.avatarIndex ?? message.user.charCodeAt(0) % 5;

  if (isOwnMessage) {
    return (
      <div className="flex flex-col items-end gap-1">
        <span className="text-xs text-muted-foreground mr-12">{message.user}</span>
        <div className="flex items-start gap-2">
          <div className="flex items-center gap-1 text-muted-foreground">
            <MoreVertical className="w-4 h-4" />
            <Reply className="w-4 h-4" />
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl rounded-tr-sm px-4 py-2.5 max-w-[240px]">
            <p className="text-sm text-foreground leading-relaxed">{parseText(message.text)}</p>
          </div>
          <Avatar index={avatarIndex} name={message.user} size="sm" showOnlineIndicator />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground ml-12">{message.user}</span>
      <div className="flex items-start gap-2">
        <Avatar index={avatarIndex} name={message.user} size="sm" />
        <div className="bg-slate-50 border border-slate-100 rounded-xl rounded-tl-sm px-4 py-2.5 max-w-[240px]">
          <p className="text-sm text-foreground leading-relaxed">{parseText(message.text)}</p>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <MoreVertical className="w-4 h-4" />
          <Reply className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

// Typing indicator
function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-luklak-teal">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-luklak-teal rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="w-2 h-2 bg-luklak-teal rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="w-2 h-2 bg-luklak-teal rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
      <span className="text-sm italic">someone's typing</span>
    </div>
  );
}

// Workflow status bar
function WorkflowBar({ currentStatus }: { currentStatus: string }) {
  const stages = ["DRAFTING", "REVIEW", "APPROVED", "COMPLETED"];
  const currentIndex = stages.findIndex(s => currentStatus.toUpperCase().includes(s)) || 0;

  return (
    <div className="flex items-center gap-2 py-2">
      <StatusBadge status={stages[0]} />
      <ArrowRight className="w-4 h-4 text-muted-foreground" />
      <div className="flex-1 flex gap-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`flex-1 h-2 rounded-full ${i <= currentIndex ? "bg-luklak-blue" : "bg-muted"}`}
          />
        ))}
      </div>
    </div>
  );
}

// Field row component
interface FieldRowProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  isHighlighted?: boolean;
  isProgress?: boolean;
}

function FieldRow({ label, value, icon, isHighlighted, isProgress }: FieldRowProps) {
  return (
    <div className="flex items-center py-2.5 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground w-32 flex-shrink-0">{label}</span>
      <div className="flex-1">
        {isProgress ? (
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="w-3/4 h-full bg-gradient-to-r from-luklak-blue to-luklak-teal rounded-full" />
          </div>
        ) : isHighlighted ? (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded text-luklak-blue font-medium text-sm">
            {icon}
            {value}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-foreground">
            {icon}
            {value}
          </div>
        )}
      </div>
    </div>
  );
}

export function DetailPanel() {
  const { selectedObject, setSelectedObject, getChatForObject, selectedFunction } = useScenario();
  const [activeTab, setActiveTab] = useState<"chat" | "activities">("chat");
  const [message, setMessage] = useState("");

  if (!selectedObject) return null;

  const chat = getChatForObject(selectedObject.id);
  const objectType = selectedObject.objectType || selectedFunction?.name?.split(" ")[0] || "Task";

  return (
    <div className="w-[400px] bg-card border-l border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b border-border">
        {/* Title row */}
        <div className="flex items-start justify-between mb-4">
          <h2 className="font-semibold text-lg text-foreground leading-tight pr-4 flex-1">
            {selectedObject.title}
          </h2>
          <button
            onClick={() => setSelectedObject(null)}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Meta row: Type badge + Assignee */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="h-1.5 w-16 bg-muted rounded-full" />
            <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 border border-purple-100 rounded-lg">
              {getObjectIcon(objectType)}
              <span className="text-sm font-medium text-foreground">{objectType}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg bg-background">
            <Avatar 
              index={selectedObject.assigneeAvatarIndex ?? selectedObject.assignee.charCodeAt(0) % 5} 
              name={selectedObject.assignee} 
              size="sm" 
            />
            <span className="text-sm font-medium">{selectedObject.assignee.split(" ")[0]}</span>
          </div>
        </div>

        {/* Status + Date + Progress */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <StatusBadge status={selectedObject.status} />
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs">{selectedObject.date || "Today"}</span>
            </div>
          </div>
          <ProgressBar />
        </div>
      </div>

      {/* Custom Fields */}
      <div className="overflow-y-auto px-5 py-4">
        <div className="space-y-0">
          {Object.entries(selectedObject.custom_fields).slice(0, 5).map(([key, value], idx) => {
            const isMonetary = key.toLowerCase().includes("value") || 
                               key.toLowerCase().includes("budget") || 
                               key.toLowerCase().includes("price") ||
                               value.startsWith("$");
            const isCustomer = key.toLowerCase().includes("customer") || 
                               key.toLowerCase().includes("client");
            const isProgress = key.toLowerCase().includes("progress") ||
                               key.toLowerCase().includes("structure") ||
                               key.toLowerCase().includes("range");

            let icon = undefined;
            if (isCustomer) {
              icon = (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-green-100 flex items-center justify-center">
                    <Users className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-xs text-muted-foreground">ID-{Math.floor(Math.random() * 900) + 100}</span>
                </div>
              );
            }

            return (
              <FieldRow
                key={key}
                label={key}
                value={value}
                icon={icon}
                isHighlighted={isMonetary}
                isProgress={isProgress}
              />
            );
          })}

          {/* Person fields with avatars */}
          {Object.entries(selectedObject.custom_fields).some(([key]) => 
            key.toLowerCase().includes("manager") || 
            key.toLowerCase().includes("architect") ||
            key.toLowerCase().includes("lead")
          ) && (
            <>
              {Object.entries(selectedObject.custom_fields)
                .filter(([key]) => 
                  key.toLowerCase().includes("manager") || 
                  key.toLowerCase().includes("architect") ||
                  key.toLowerCase().includes("lead")
                )
                .map(([key, value], idx) => (
                  <div key={key} className="flex items-center py-2.5 border-b border-border/50 last:border-0">
                    <span className="text-sm text-muted-foreground w-32 flex-shrink-0">{key}</span>
                    <div className="flex items-center gap-2 flex-1">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-lg">
                        <Avatar index={idx} name={value} size="sm" />
                        <span className="text-sm">{value}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>

        {/* Object Connection Section */}
        <div className="mt-4 pt-4 border-t border-border">
          <button className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
            <span className="text-xs">▼</span>
            <span className="font-medium text-foreground">Object Connection</span>
          </button>
          <div className="ml-4 space-y-2">
            <div className="text-xs text-muted-foreground">▼ Design</div>
            <div className="ml-4 flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-blue-50 border border-blue-200 flex items-center justify-center">
                <FileCheck className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <span className="text-xs text-muted-foreground">DE-162</span>
              <span className="text-sm truncate">Design - {selectedObject.title.split(" ").slice(0, 3).join(" ")}...</span>
              <Avatar index={1} name="O" size="sm" />
              <span className="text-xs text-luklak-blue font-medium ml-auto">TO DO ▼</span>
            </div>
            <div className="text-xs text-muted-foreground">▼ Production</div>
            <div className="ml-4 flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-amber-50 border border-amber-200 flex items-center justify-center">
                <Building className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <span className="text-xs text-muted-foreground">CO-117</span>
              <span className="text-sm truncate">Construction - {selectedObject.title.split(" ").slice(0, 2).join(" ")}...</span>
              <Avatar index={2} name="A" size="sm" />
              <span className="text-xs text-luklak-blue font-medium ml-auto">TO D... ▼</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <div className="border-t border-border flex flex-col" style={{ maxHeight: "45%" }}>
        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === "chat"
                ? "border-b-2 border-foreground text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Live chat
          </button>
          <button
            onClick={() => setActiveTab("activities")}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === "activities"
                ? "border-b-2 border-foreground text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Activities
          </button>
        </div>

        {/* Chat Content */}
        {activeTab === "chat" && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chat?.messages.map((msg, idx) => (
              <ChatBubble 
                key={idx} 
                message={msg} 
                isOwnMessage={idx % 3 === 1}
              />
            ))}
            {!chat?.messages.length && (
              <div className="text-center text-sm text-muted-foreground py-8">
                No messages for this item yet
              </div>
            )}
            {chat?.messages.length > 0 && <TypingIndicator />}
          </div>
        )}

        {activeTab === "activities" && (
          <div className="p-4 text-center text-sm text-muted-foreground">
            Activity log will appear here
          </div>
        )}

        {/* Workflow bar */}
        <div className="px-4 border-t border-border">
          <WorkflowBar currentStatus={selectedObject.status} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <Avatar index={2} name="You" size="sm" />
            <div className="flex-1 flex items-center gap-2 border border-border rounded-full px-4 py-2 bg-background">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type message..."
                className="flex-1 bg-transparent text-sm focus:outline-none"
              />
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Smile className="w-5 h-5" />
              </button>
            </div>
            <button className="p-2.5 text-luklak-blue hover:text-luklak-blue/80 transition-colors">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
