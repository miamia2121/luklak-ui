import React from "react";
import { useScenario } from "@/context/ScenarioContext";
import { Target, Users, FileText, TrendingUp } from "lucide-react";

// Mini pie chart component
function PieChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let currentAngle = 0;

  const slices = data.map((d) => {
    const angle = (d.value / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (startAngle + angle - 90) * (Math.PI / 180);
    
    const x1 = 50 + 40 * Math.cos(startRad);
    const y1 = 50 + 40 * Math.sin(startRad);
    const x2 = 50 + 40 * Math.cos(endRad);
    const y2 = 50 + 40 * Math.sin(endRad);
    
    const largeArc = angle > 180 ? 1 : 0;
    
    const path = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`;
    
    return { ...d, path };
  });

  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 100 100" className="w-32 h-32">
        {slices.map((slice, i) => (
          <path key={i} d={slice.path} fill={slice.color} stroke="white" strokeWidth="1" />
        ))}
      </svg>
      <div className="space-y-2">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: d.color }} />
            <span className="text-muted-foreground truncate max-w-[140px]">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Bar chart component
function BarChart({ data }: { data: { label: string; values: number[]; colors: string[] }[] }) {
  const maxValue = Math.max(...data.flatMap(d => d.values));

  return (
    <div className="flex items-end gap-3 h-32">
      {data.map((bar, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div className="flex gap-0.5">
            {bar.values.map((value, j) => (
              <div
                key={j}
                className="w-5 rounded-t"
                style={{
                  height: `${(value / maxValue) * 100}px`,
                  backgroundColor: bar.colors[j],
                }}
              />
            ))}
          </div>
          <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center overflow-hidden">
            <span className="text-[8px]">👤</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// Metric card component
interface MetricCardProps {
  value: string;
  label: string;
  color: "blue" | "red" | "green" | "orange" | "gray";
  suffix?: string;
}

function MetricCard({ value, label, color, suffix }: MetricCardProps) {
  const colorMap = {
    blue: "text-luklak-blue",
    red: "text-luklak-red",
    green: "text-luklak-green",
    orange: "text-luklak-orange",
    gray: "text-foreground",
  };

  const bgMap = {
    blue: "bg-luklak-blue",
    red: "bg-luklak-red",
    green: "bg-luklak-green",
    orange: "bg-luklak-orange",
    gray: "bg-foreground",
  };

  return (
    <div className="text-center">
      <div className={`text-3xl font-bold ${colorMap[color]}`}>
        {value}
        {suffix && <span className="text-lg ml-0.5">{suffix}</span>}
      </div>
      <div className={`mt-2 px-3 py-1 rounded text-xs font-medium text-white ${bgMap[color]}`}>
        {label}
      </div>
    </div>
  );
}

// Badge component
function FilterBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 border border-border rounded-full text-xs font-medium text-muted-foreground bg-background">
      {icon}
      <span>{label}</span>
    </div>
  );
}

// ROI Table component
function ROITable() {
  const campaigns = [
    { name: "Scandinavian...", status: "ACTIVE", spend: "$10,000", leads: 60, wonLeads: 15, revenue: "$125,000", roas: "12.5x" },
    { name: "Modern Living...", status: "ACTIVE", spend: "$5,000", leads: 22, wonLeads: 4, revenue: "$35,000", roas: "7x" },
    { name: "Sustainable ...", status: "OFF", spend: "$2,000", leads: 12, wonLeads: 1, revenue: "$5,000", roas: "0.71x" },
    { name: "", status: "PREPARE", spend: "", leads: null, wonLeads: null, revenue: "", roas: "" },
    { name: "", status: "PREPARE", spend: "", leads: null, wonLeads: null, revenue: "", roas: "" },
    { name: "", status: "IDEA", spend: "", leads: null, wonLeads: null, revenue: "", roas: "" },
  ];

  const getStatusColor = (status: string) => {
    if (status === "ACTIVE") return "text-luklak-green";
    if (status === "OFF") return "text-luklak-red";
    if (status === "PREPARE") return "text-luklak-blue";
    return "text-muted-foreground";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-muted-foreground text-xs border-b border-border">
            <th className="text-left py-2 font-medium">Campaign</th>
            <th className="text-left py-2 font-medium">Status</th>
            <th className="text-right py-2 font-medium">Spend</th>
            <th className="text-right py-2 font-medium">Leads</th>
            <th className="text-right py-2 font-medium">WON Leads</th>
            <th className="text-right py-2 font-medium">Revenue</th>
            <th className="text-right py-2 font-medium">ROAS</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((c, i) => (
            <tr key={i} className="border-b border-border/50">
              <td className="py-2.5 flex items-center gap-2">
                {c.name && (
                  <div className="w-6 h-6 rounded bg-amber-50 border border-amber-200 flex items-center justify-center">
                    <Target className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                )}
                {c.name || <div className="w-6 h-6 rounded bg-muted" />}
                <span className="text-foreground truncate max-w-[100px]">{c.name}</span>
              </td>
              <td className={`py-2.5 font-semibold ${getStatusColor(c.status)}`}>{c.status}</td>
              <td className="py-2.5 text-right">{c.spend || <div className="h-3 w-16 bg-muted rounded ml-auto" />}</td>
              <td className="py-2.5 text-right">{c.leads ?? <div className="h-3 w-8 bg-muted rounded ml-auto" />}</td>
              <td className="py-2.5 text-right">{c.wonLeads ?? <div className="h-3 w-8 bg-muted rounded ml-auto" />}</td>
              <td className="py-2.5 text-right">{c.revenue || <div className="h-3 w-16 bg-muted rounded ml-auto" />}</td>
              <td className="py-2.5 text-right font-medium">{c.roas || <div className="h-3 w-8 bg-muted rounded ml-auto" />}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DashboardView() {
  const { selectedFunction } = useScenario();

  if (!selectedFunction) return null;

  // Mock data for the dashboard
  const pieData = [
    { label: "Scandinavian inspired...", value: 40, color: "#1E56A0" },
    { label: "Sustainable interior design...", value: 30, color: "#59C9D5" },
    { label: "Modern living space...", value: 30, color: "#CBD5E1" },
  ];

  const barData = [
    { label: "A", values: [3, 5, 8, 2], colors: ["#94A3B8", "#3B82F6", "#F97316", "#22C55E"] },
    { label: "B", values: [4, 6, 3, 5], colors: ["#94A3B8", "#3B82F6", "#F97316", "#22C55E"] },
    { label: "C", values: [6, 4, 7, 3], colors: ["#94A3B8", "#3B82F6", "#F97316", "#22C55E"] },
    { label: "D", values: [5, 8, 4, 6], colors: ["#94A3B8", "#3B82F6", "#F97316", "#22C55E"] },
    { label: "E", values: [7, 3, 5, 4], colors: ["#94A3B8", "#3B82F6", "#F97316", "#22C55E"] },
  ];

  return (
    <div className="flex-1 overflow-auto p-6 bg-muted/30">
      <div className="grid grid-cols-12 gap-6">
        {/* Top Performing Ads */}
        <div className="col-span-4 bg-card rounded-lg border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Top Performing Ads</h3>
            <FilterBadge icon={<FileText className="w-3.5 h-3.5" />} label="Ad Creative" />
          </div>
          <PieChart data={pieData} />
        </div>

        {/* Q2 Marketing Performance At-a-Glance */}
        <div className="col-span-8 bg-card rounded-lg border border-border p-5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-foreground">Q2 Marketing Performance At-a-Glance</h3>
            <div className="flex gap-2">
              <FilterBadge icon={<Users className="w-3.5 h-3.5" />} label="Customer" />
              <FilterBadge icon={<FileText className="w-3.5 h-3.5" />} label="Ad Creative" />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <MetricCard value="182" label="Total New Leads" color="blue" />
            <MetricCard value="$15,000" label="Total Marketing Spend" color="red" />
            <MetricCard value="$82.41" label="Average Cost Per Lead (CPL)" color="green" />
            <MetricCard value="29" label="Lead-to-UNQUALIFIED" color="gray" suffix="%" />
            <MetricCard value="21" label="Lead-to-WON" color="green" suffix="%" />
            <MetricCard value="3.75" label="ROAS" color="red" suffix="x" />
          </div>
        </div>

        {/* Campaign ROI Deep Dive */}
        <div className="col-span-8 bg-card rounded-lg border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Campaign ROI Deep Dive</h3>
            <FilterBadge icon={<Target className="w-3.5 h-3.5" />} label="Campaign" />
          </div>
          <ROITable />
        </div>

        {/* Content Pipeline by Marketer */}
        <div className="col-span-4 bg-card rounded-lg border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Content Pipeline by Marketer</h3>
            <FilterBadge icon={<FileText className="w-3.5 h-3.5" />} label="Content" />
          </div>
          <p className="text-sm text-luklak-green font-medium mb-3">Content pieces</p>
          <BarChart data={barData} />
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              <span className="text-muted-foreground">IDEA</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-luklak-blue" />
              <span className="text-muted-foreground">DRAFTING</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-luklak-orange" />
              <span className="text-muted-foreground">PENDING APPROVAL</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-luklak-green" />
              <span className="text-muted-foreground">PUBLISHED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
