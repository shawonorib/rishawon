import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
import { salesData } from "@/lib/portfolio";

const scatterData = [0, 1, 2].map(group => Array.from({ length: 22 }, (_, i) => ({ x: 14 + group * 29 + Math.sin(i * 2.3) * 14, y: 18 + group * 25 + Math.cos(i * 1.7) * 16 })));
const tooltipStyle = { background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 4, color: "hsl(var(--foreground))", fontSize: 11 };

export function PortfolioChart({ type, year = "2025" }: { type: string; year?: string }) {
  const data = salesData.map(item => ({ ...item, revenue: year === "2024" ? item.previous : item.revenue }));
  return <ResponsiveContainer width="100%" height="100%">
    {type === "scatter" ? <ScatterChart margin={{ top: 12, right: 15, bottom: 0, left: -24 }}>
      <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 5" />
      <XAxis type="number" dataKey="x" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} axisLine={false} tickLine={false} />
      <YAxis type="number" dataKey="y" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} axisLine={false} tickLine={false} />
      <Tooltip cursor={{ strokeDasharray: "3 3" }} contentStyle={tooltipStyle} />
      {scatterData.map((points, index) => <Scatter key={index} name={["Loyal", "Growing", "High value"][index]} data={points} fill={`hsl(var(--chart-${index + 1}))`} />)}
    </ScatterChart> : type === "bars" ? <BarChart data={[{ name: "North", delivered: 86, target: 95 }, { name: "South", delivered: 72, target: 95 }, { name: "East", delivered: 94, target: 95 }, { name: "West", delivered: 81, target: 95 }, { name: "Central", delivered: 90, target: 95 }]} margin={{ top: 12, right: 8, bottom: 0, left: -24 }}>
      <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeDasharray="3 5" />
      <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} axisLine={false} tickLine={false} />
      <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} axisLine={false} tickLine={false} />
      <Tooltip contentStyle={tooltipStyle} cursor={false} />
      <Bar dataKey="delivered" name="On-time delivery (%)" fill="hsl(var(--chart-1))" radius={[2, 2, 0, 0]} />
      <Bar dataKey="target" name="Target (%)" fill="hsl(var(--chart-3))" radius={[2, 2, 0, 0]} />
    </BarChart> : <AreaChart data={data} margin={{ top: 12, right: 8, bottom: 0, left: -24 }}>
      <defs><linearGradient id={`revenue-fill-${type}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={.26} /><stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} /></linearGradient></defs>
      <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeDasharray="3 5" />
      <XAxis dataKey="month" interval={2} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} axisLine={false} tickLine={false} />
      <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} axisLine={false} tickLine={false} />
      <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => [`$${value.toFixed(1)}k`, "Revenue"]} />
      <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} fill={`url(#revenue-fill-${type})`} />
    </AreaChart>}
  </ResponsiveContainer>;
}