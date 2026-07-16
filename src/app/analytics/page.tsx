"use client";

import { useMemo, useState } from "react";

import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Clock3,
  Database,
  MapPinned,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import MetricCard from "@/components/dashboard/MetricCard";
import AppShell from "@/components/layout/AppShell";
import { getAreaIntelligence } from "@/lib/areaIntelligence";

type TrendPoint = {
  day: string;
  incidents: number;
  baseline: number;
};

type Category = {
  name: string;
  incidents: number;
  change: number;
};

type TimePattern = {
  time: string;
  incidents: number;
};

type DistrictAnalytics = {
  district: string;
  score: number;
  incidents: number;
  trend: string;
  patterns: number;
  confidence: number;
  insightTitle: string;
  insight: string;
  peakWindow: string;
  priority: string;
  trendData: TrendPoint[];
  categories: Category[];
  timePatterns: TimePattern[];
};

const analyticsData: DistrictAnalytics[] = [
  {
    district: "Bengaluru Urban",
    score: 92,
    incidents: 1284,
    trend: "+18%",
    patterns: 18,
    confidence: 94,
    insightTitle:
      "Incident activity is moving above the historical baseline.",
    insight:
      "Recent records show sustained growth across Bengaluru Urban, with late-evening activity contributing to the strongest increase.",
    peakWindow: "9 PM – 12 AM",
    priority: "Review elevated urban clusters",
    trendData: [
      { day: "07 Jul", incidents: 142, baseline: 128 },
      { day: "08 Jul", incidents: 158, baseline: 132 },
      { day: "09 Jul", incidents: 151, baseline: 136 },
      { day: "10 Jul", incidents: 176, baseline: 139 },
      { day: "11 Jul", incidents: 194, baseline: 143 },
      { day: "12 Jul", incidents: 221, baseline: 147 },
      { day: "13 Jul", incidents: 238, baseline: 151 },
    ],
    categories: [
      { name: "Vehicle theft", incidents: 284, change: 18 },
      { name: "Burglary", incidents: 231, change: 12 },
      { name: "Cyber fraud", incidents: 198, change: 21 },
      { name: "Assault", incidents: 164, change: -4 },
      { name: "Robbery", incidents: 121, change: 7 },
    ],
    timePatterns: [
      { time: "12 AM", incidents: 48 },
      { time: "3 AM", incidents: 29 },
      { time: "6 AM", incidents: 21 },
      { time: "9 AM", incidents: 54 },
      { time: "12 PM", incidents: 71 },
      { time: "3 PM", incidents: 83 },
      { time: "6 PM", incidents: 126 },
      { time: "9 PM", incidents: 184 },
      { time: "12 AM ", incidents: 142 },
    ],
  },

    {
    district: "Mysuru",
    score: 81,
    incidents: 742,
    trend: "+12%",
    patterns: 12,
    confidence: 89,
    insightTitle:
      "Recurring spatial activity is strengthening across linked Mysuru zones.",
    insight:
      "Incident records indicate a gradual increase above baseline, with burglary and vehicle theft activity concentrated around evening operational windows.",
    peakWindow: "7 PM – 11 PM",
    priority: "Review connected transport corridors",
    trendData: [
      { day: "07 Jul", incidents: 76, baseline: 71 },
      { day: "08 Jul", incidents: 81, baseline: 73 },
      { day: "09 Jul", incidents: 79, baseline: 74 },
      { day: "10 Jul", incidents: 92, baseline: 76 },
      { day: "11 Jul", incidents: 104, baseline: 78 },
      { day: "12 Jul", incidents: 116, baseline: 80 },
      { day: "13 Jul", incidents: 124, baseline: 82 },
    ],
    categories: [
      { name: "Burglary", incidents: 168, change: 16 },
      { name: "Vehicle theft", incidents: 151, change: 13 },
      { name: "Cyber fraud", incidents: 124, change: 9 },
      { name: "Assault", incidents: 98, change: -3 },
      { name: "Robbery", incidents: 74, change: 4 },
    ],
    timePatterns: [
      { time: "12 AM", incidents: 34 },
      { time: "3 AM", incidents: 19 },
      { time: "6 AM", incidents: 17 },
      { time: "9 AM", incidents: 41 },
      { time: "12 PM", incidents: 52 },
      { time: "3 PM", incidents: 67 },
      { time: "6 PM", incidents: 104 },
      { time: "9 PM", incidents: 138 },
      { time: "12 AM ", incidents: 91 },
    ],
  },

  {
    district: "Tumakuru",
    score: 74,
    incidents: 516,
    trend: "+21%",
    patterns: 10,
    confidence: 87,
    insightTitle:
      "Tumakuru is showing the fastest district-level increase.",
    insight:
      "Recent incident volume has moved sharply above the historical baseline. Vehicle theft and burglary patterns are contributing to the current increase.",
    peakWindow: "8 PM – 11 PM",
    priority: "Review rapidly emerging activity zones",
    trendData: [
      { day: "07 Jul", incidents: 48, baseline: 52 },
      { day: "08 Jul", incidents: 53, baseline: 53 },
      { day: "09 Jul", incidents: 61, baseline: 54 },
      { day: "10 Jul", incidents: 74, baseline: 55 },
      { day: "11 Jul", incidents: 88, baseline: 56 },
      { day: "12 Jul", incidents: 109, baseline: 57 },
      { day: "13 Jul", incidents: 128, baseline: 58 },
    ],
    categories: [
      { name: "Vehicle theft", incidents: 132, change: 24 },
      { name: "Burglary", incidents: 116, change: 21 },
      { name: "Robbery", incidents: 84, change: 14 },
      { name: "Assault", incidents: 76, change: 8 },
      { name: "Cyber fraud", incidents: 61, change: 5 },
    ],
    timePatterns: [
      { time: "12 AM", incidents: 29 },
      { time: "3 AM", incidents: 18 },
      { time: "6 AM", incidents: 14 },
      { time: "9 AM", incidents: 32 },
      { time: "12 PM", incidents: 43 },
      { time: "3 PM", incidents: 57 },
      { time: "6 PM", incidents: 91 },
      { time: "9 PM", incidents: 127 },
      { time: "12 AM ", incidents: 83 },
    ],
  },

    {
    district: "Shivamogga",
    score: 58,
    incidents: 348,
    trend: "+6%",
    patterns: 7,
    confidence: 82,
    insightTitle:
      "Shivamogga shows moderate emerging incident concentration.",
    insight:
      "Activity remains moderately above baseline across selected zones, with evening assault and burglary reports forming the clearest recurring pattern.",
    peakWindow: "6 PM – 10 PM",
    priority: "Monitor emerging evening clusters",
    trendData: [
      { day: "07 Jul", incidents: 39, baseline: 37 },
      { day: "08 Jul", incidents: 42, baseline: 38 },
      { day: "09 Jul", incidents: 40, baseline: 39 },
      { day: "10 Jul", incidents: 47, baseline: 40 },
      { day: "11 Jul", incidents: 51, baseline: 41 },
      { day: "12 Jul", incidents: 57, baseline: 42 },
      { day: "13 Jul", incidents: 61, baseline: 43 },
    ],
    categories: [
      { name: "Assault", incidents: 91, change: 11 },
      { name: "Burglary", incidents: 78, change: 8 },
      { name: "Vehicle theft", incidents: 64, change: 5 },
      { name: "Robbery", incidents: 51, change: 2 },
      { name: "Cyber fraud", incidents: 43, change: -2 },
    ],
    timePatterns: [
      { time: "12 AM", incidents: 22 },
      { time: "3 AM", incidents: 12 },
      { time: "6 AM", incidents: 11 },
      { time: "9 AM", incidents: 27 },
      { time: "12 PM", incidents: 34 },
      { time: "3 PM", incidents: 48 },
      { time: "6 PM", incidents: 73 },
      { time: "9 PM", incidents: 86 },
      { time: "12 AM ", incidents: 57 },
    ],
  },

  {
    district: "Belagavi",
    score: 42,
    incidents: 291,
    trend: "-3%",
    patterns: 5,
    confidence: 78,
    insightTitle:
      "Belagavi activity remains near the operational baseline.",
    insight:
      "Current incident activity is stable with a slight decline. No strong district-wide escalation pattern is visible in the current analysis window.",
    peakWindow: "6 PM – 9 PM",
    priority: "Continue baseline monitoring",
    trendData: [
      { day: "07 Jul", incidents: 42, baseline: 44 },
      { day: "08 Jul", incidents: 41, baseline: 44 },
      { day: "09 Jul", incidents: 45, baseline: 45 },
      { day: "10 Jul", incidents: 40, baseline: 45 },
      { day: "11 Jul", incidents: 43, baseline: 46 },
      { day: "12 Jul", incidents: 39, baseline: 46 },
      { day: "13 Jul", incidents: 38, baseline: 47 },
    ],
    categories: [
      { name: "Burglary", incidents: 71, change: 3 },
      { name: "Vehicle theft", incidents: 62, change: -2 },
      { name: "Assault", incidents: 57, change: -4 },
      { name: "Cyber fraud", incidents: 49, change: 2 },
      { name: "Robbery", incidents: 38, change: -6 },
    ],
    timePatterns: [
      { time: "12 AM", incidents: 18 },
      { time: "3 AM", incidents: 10 },
      { time: "6 AM", incidents: 9 },
      { time: "9 AM", incidents: 24 },
      { time: "12 PM", incidents: 31 },
      { time: "3 PM", incidents: 42 },
      { time: "6 PM", incidents: 61 },
      { time: "9 PM", incidents: 58 },
      { time: "12 AM ", incidents: 37 },
    ],
  },
];

const dateFilters = [
  "Last 7 days",
  "Last 30 days",
  "Last 90 days",
];

function calculateDistrictRiskScore(
  district: string,
) {
  const districtIntelligence =
    getAreaIntelligence(district);

    return Math.min(
    100,
    Math.round(
      districtIntelligence.totalIncidents * 2 +
        districtIntelligence.highRiskIncidents * 5 +
        districtIntelligence.similarCases * 6,
    ),
  );
}

export default function AnalyticsPage() {
  const [dateFilter, setDateFilter] =
    useState("Last 7 days");

  const [selectedDistrict, setSelectedDistrict] =
    useState<DistrictAnalytics>(analyticsData[0]);

  const intelligence = useMemo(
    () =>
      getAreaIntelligence(
        selectedDistrict.district,
      ),
    [selectedDistrict],
  );

  const topCategory = useMemo(() => {
    return [...selectedDistrict.categories].sort(
      (a, b) => b.change - a.change,
    )[0];
  }, [selectedDistrict]);

  const calculatedRiskScore = Math.min(
      100,
      Math.round(
        intelligence.totalIncidents * 1.5 +
          intelligence.highRiskIncidents * 5 +
          intelligence.similarCases * 4 +
          intelligence.confidence * 0.2,
      ),
    );

  const metrics = [
    {
      title: "Historical incident volume",
      value:
        selectedDistrict.incidents.toLocaleString(),
      change: selectedDistrict.trend.replace(
        "+",
        "",
      ),
      trend: selectedDistrict.trend.startsWith(
        "+",
      )
        ? ("up" as const)
        : ("down" as const),
      description: `${selectedDistrict.district} historical incident baseline`,
      icon: Database,
    },
    {
      title: "Emerging patterns",
      value: intelligence.similarCases.toString(),
      change: `${intelligence.similarCases > 0 ? "+" : ""}${intelligence.similarCases}`,
      trend:
        intelligence.similarCases > 0
          ? ("up" as const)
          : ("down" as const),
      description:
        "Repeated patterns detected in current records",
      icon: Activity,
    },
      {
        title: "District risk score",
        value: calculatedRiskScore.toString(),
        change: intelligence.riskLevel,
        trend:
          intelligence.riskLevel === "High"
            ? ("up" as const)
            : ("down" as const),
        description:
          "Current intelligence-based risk score",
        icon: MapPinned,
      },
    {
      title: "Pattern confidence",
      value: `${intelligence.confidence}%`,
      change:
        intelligence.confidence >= 80
          ? "High"
          : intelligence.confidence >= 60
            ? "Medium"
            : "Low",
      trend:
        intelligence.confidence >= 70
          ? ("up" as const)
          : ("down" as const),
      description:
        "Confidence in current intelligence analysis",
      icon: ShieldCheck,
    },
  ];

  const maxCategoryIncidents = Math.max(
    ...selectedDistrict.categories.map(
      (category) => category.incidents,
    ),
  );

  return (
  <AppShell>
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0 flex-1">
        <p className="mb-2 text-sm text-[var(--text-secondary)]">
          Operational intelligence
        </p>

        <h1 className="text-3xl font-medium tracking-[-0.04em] text-[var(--navy)] sm:text-[32px]">
          Analytics
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)] sm:text-[15px]">
          Explore crime trends, patterns and operational intelligence.
        </p>
      </div>

      <div className="flex h-11 w-full items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 sm:w-auto">
        <CalendarDays
          size={16}
          className="text-[var(--text-muted)]"
        />

        <select
          value={dateFilter}
          onChange={(e) =>
            setDateFilter(e.target.value)
          }
          className="bg-transparent text-sm text-[var(--navy)] outline-none"
        >
          {dateFilters.map((filter) => (
            <option
              key={filter}
              value={filter}
            >
              {filter}
            </option>
          ))}
        </select>
      </div>
    </div>

    {/* Metrics */}

    <section className="mt-8 sm:mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard
          key={metric.title}
          {...metric}
        />
      ))}
    </section>

    {/* Trend + Intelligence */}

    {/* Trend + Intelligence */}

<section className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(340px,0.8fr)]">
  <div className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
    <div className="flex items-start justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-[16px] font-medium text-[var(--navy)]">
          Incident activity
        </h2>

        <p className="mt-1 text-xs text-[var(--text-muted)]">
          {selectedDistrict.district} historical incident activity baseline
        </p>
      </div>

      <span
        className={`rounded-full px-3 py-1.5 text-[10px] font-medium ${
          selectedDistrict.trend.startsWith("+")
            ? "bg-[#f8e8e8] text-[var(--danger)]"
            : "bg-[#e8f5ee] text-[var(--success)]"
        }`}
      >
        {selectedDistrict.trend.startsWith("+")
          ? "Elevated activity"
          : "Stable activity"}
      </span>
    </div>

    <div className="mt-8 h-[250px] sm:h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          key={selectedDistrict.district}
          data={selectedDistrict.trendData}
        >
          <defs>
            <linearGradient
              id="analyticsGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor="#a9863d" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#a9863d" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            vertical={false}
            stroke="#e7e5df"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#98a2b3", fontSize: 11 }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#98a2b3", fontSize: 11 }}
            width={35}
          />

          <Tooltip
  contentStyle={{
    borderRadius: "12px",
    border: "1px solid #e7e5df",
    boxShadow: "none",
    fontSize: "12px",
  }}
/>

          <Area
            type="monotone"
            dataKey="baseline"
            stroke="#c8c5bc"
            strokeWidth={1.5}
            strokeDasharray="5 5"
            fill="transparent"
          />

          <Area
            type="monotone"
            dataKey="incidents"
            stroke="#a9863d"
            strokeWidth={2}
            fill="url(#analyticsGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>

  <aside className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
    <div className="flex items-center gap-2">
      <Sparkles size={16} className="text-[var(--gold)]" />
      <p className="text-xs font-medium text-[var(--gold)]">
        TRINETRA analytical insight
      </p>
    </div>

    <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
      {selectedDistrict.district}
    </p>

    <h2 className="mt-2 text-xl font-medium leading-7 tracking-[-0.03em] text-[var(--navy)] sm:text-[21px]">
      {intelligence.crimeStory}
    </h2>

    <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
      {intelligence.intelligenceSummary}
    </p>

    <div className="mt-7 rounded-xl bg-[var(--surface-soft)] p-4">
      <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
        Historical category trend
      </p>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--navy)]">
          {topCategory.name}
        </span>

        <span className="flex items-center gap-1 text-sm font-medium text-[var(--danger)]">
          <TrendingUp size={14} />+{topCategory.change}%
        </span>
      </div>
    </div>

    <div className="mt-4 rounded-xl border border-[var(--border)] p-4">
      <div className="flex items-center gap-3">
        <Clock3 size={16} className="text-[var(--gold)]" />

        <div className="min-w-0 flex-1">
          <p className="text-[10px] text-[var(--text-muted)]">
            Peak activity period
          </p>

          <p className="mt-1 text-sm font-medium text-[var(--navy)]">
            {intelligence.peakActivityWindow}
          </p>
        </div>
      </div>
    </div>

    <div className="mt-4 rounded-xl border border-[var(--border)] p-4">
      <div className="flex items-center gap-3">
        <ShieldAlert size={16} className="text-[var(--gold)]" />

        <div className="min-w-0 flex-1">
          <p className="text-[10px] text-[var(--text-muted)]">
            Analyst priority
          </p>

          <p className="mt-1 text-sm font-medium text-[var(--navy)]">
                      {intelligence.riskLevel === "High"
            ? `Immediate patrol and pattern review in ${intelligence.topArea}`
            : intelligence.riskLevel === "Medium"
              ? `Increase monitoring around ${intelligence.topArea}`
              : `Continue routine monitoring in ${intelligence.topArea}`}
          </p>
        </div>
      </div>
    </div>
  </aside>
</section>

<section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">

  {/* AI Prediction */}

  <div className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
    <h3 className="text-lg font-semibold text-[var(--navy)]">
      AI Prediction
    </h3>

    <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
      {intelligence.prediction}
    </p>

    <div className="mt-auto pt-6 space-y-2 text-sm">
      <div className="flex justify-between">
        <span>Risk Level</span>

        <span className="font-semibold">
          {intelligence.riskLevel}
        </span>
      </div>

      <div className="flex justify-between">
        <span>Confidence</span>

        <span className="font-semibold">
          {intelligence.confidence}%
        </span>
      </div>
    </div>
  </div>

  {/* Recommended Patrol */}

  <div className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
    <h3 className="text-lg font-semibold text-[var(--navy)]">
      Recommended Patrol Actions
    </h3>

    <div className="mt-4 flex-1 space-y-3">
      {intelligence.recommendedPatrol.map((action) => (
        <div
          key={action}
          className="rounded-xl border border-[var(--border)] p-3 text-sm leading-6"
        >
          {action}
        </div>
      ))}
    </div>
  </div>

  {/* Intelligence Signals */}

  <div className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
    <h3 className="text-lg font-semibold text-[var(--navy)]">
      Intelligence Signals
    </h3>

    <div className="mt-4 flex-1 space-y-3">
      {intelligence.signals.length > 0 ? (
        intelligence.signals.map((signal, index) => (
          <div
            key={index}
            className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-6"
          >
            <p className="truncate text-sm text-[var(--text-secondary)]">
              {signal}
            </p>
          </div>
        ))
      ) : (
        <p className="truncate text-sm text-[var(--text-secondary)]">
          No significant intelligence signals detected.
        </p>
      )}
    </div>
  </div>

</section>

<section className="mt-6 overflow-hidden">
  <div className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
    <div className="flex items-start justify-between">
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--text-muted)]">
          District Risk
        </p>

        <h3 className="mt-4 text-3xl font-bold text-[var(--navy)]">
          {intelligence.riskLevel}
        </h3>

        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Current operational risk
        </p>
      </div>

      <div className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
        {intelligence.riskLevel}
      </div>
    </div>

    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase text-[var(--text-muted)]">
          Confidence
        </p>

        <p className="mt-2 text-xl font-semibold text-[var(--navy)]">
          {intelligence.confidence}%
        </p>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase text-[var(--text-muted)]">
          Similar Cases
        </p>

        <p className="mt-2 text-xl font-semibold text-[var(--navy)]">
          {intelligence.similarCases}
        </p>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase text-[var(--text-muted)]">
          Trend
        </p>

        <p className="mt-2 text-lg font-semibold text-red-600">
          {selectedDistrict.trend.startsWith("+")
            ? "Increasing"
            : "Stable"}
        </p>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase text-[var(--text-muted)]">
          Priority
        </p>

        <p className="mt-2 break-words text-lg font-semibold text-[var(--navy)]">
                  {intelligence.riskLevel === "High"
          ? `Immediate patrol and pattern review in ${intelligence.topArea}`
          : intelligence.riskLevel === "Medium"
            ? `Increase monitoring around ${intelligence.topArea}`
            : `Continue routine monitoring in ${intelligence.topArea}`}
        </p>
      </div>
    </div>
  </div>
</section>

{/* Categories + Time */}

<section className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-[1.2fr_0.8fr]">

  {/* Crime Categories */}

  <div className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">

    <h2 className="text-lg font-semibold text-[var(--navy)]">
      Crime Category Movement
    </h2>

    <p className="mt-1 text-sm text-[var(--text-secondary)]">
      {selectedDistrict.district} incident volume and recent change
    </p>

    <div className="mt-6 flex-1 space-y-4">

      {selectedDistrict.categories.map((category) => (

        <div
            key={category.name}
            className="rounded-xl border border-[var(--border)] p-4 transition hover:bg-[var(--surface-soft)]"
          >

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="min-w-0 flex-1">

              <p className="truncate font-medium text-[var(--navy)]">
                {category.name}
              </p>

              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {category.incidents} incidents
              </p>

            </div>

            <span
              className={`flex items-center gap-1 text-sm font-semibold ${
                category.change >= 0
                  ? "text-[var(--danger)]"
                  : "text-[var(--success)]"
              }`}
            >
              {category.change >= 0 ? (
                <ArrowUpRight size={16} />
              ) : (
                <ArrowDownRight size={16} />
              )}

              {category.change > 0 ? "+" : ""}
              {category.change}%
            </span>

          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--surface-soft)]">

            <div
              className="h-full rounded-full bg-[var(--gold)]"
              style={{
                width: `${
                  (category.incidents /
                    maxCategoryIncidents) *
                  100
                }%`,
              }}
            />

          </div>

        </div>

      ))}

    </div>

  </div>

  {/* Activity by Time */}

  <div className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">

    <h2 className="text-lg font-semibold text-[var(--navy)]">
      Activity by Time
    </h2>

    <p className="mt-1 text-sm text-[var(--text-secondary)]">
      {selectedDistrict.district} incident concentration across the daily cycle
    </p>

    <div className="mt-6 h-[280px] sm:h-[340px] lg:h-[360px]">

      <ResponsiveContainer width="100%" height="100%">

        <BarChart data={selectedDistrict.timePatterns}>

          <CartesianGrid
            vertical={false}
            stroke="#e7e5df"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#98a2b3", fontSize: 11 }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#98a2b3", fontSize: 11 }}
          />

          <Tooltip
  contentStyle={{
    borderRadius: "12px",
    border: "1px solid #e7e5df",
    boxShadow: "none",
    fontSize: "12px",
  }}
/>

          <Bar
            dataKey="incidents"
            radius={[6, 6, 0, 0]}
          >
            {selectedDistrict.timePatterns.map(
              (_, index) => (
                <Cell
                  key={index}
                  fill="#a9863d"
                />
              ),
            )}
          </Bar>

        </BarChart>

      </ResponsiveContainer>

    </div>

  </div>

</section>

{/* District Ranking */}

<section className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">

  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

    <div className="min-w-0 flex-1">

      <h2 className="text-lg font-semibold text-[var(--navy)]">
        District Intelligence Ranking
      </h2>

      <p className="mt-1 text-sm text-[var(--text-secondary)]">
        Select a district to explore its analytical profile
      </p>

    </div>

    <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-secondary)]">
      {dateFilter}
    </span>

  </div>

  <div className="mt-6 space-y-3">

    {[...analyticsData]
      .sort(
  (a, b) =>
    calculateDistrictRiskScore(b.district) -
    calculateDistrictRiskScore(a.district),
)
      .map((district, index) => (

        <button
          key={district.district}
          onClick={() => setSelectedDistrict(district)}
          className={`flex w-full flex-col gap-4 rounded-xl border p-4 text-left transition sm:flex-row sm:items-center sm:justify-between ${
            selectedDistrict.district === district.district
              ? "border-[var(--gold)] bg-[var(--surface-soft)]"
              : "border-[var(--border)] hover:bg-[var(--surface-soft)]"
          }`}
        >

          <div className="flex items-center gap-4 min-w-0">

            <div className="w-8 shrink-0 text-lg font-semibold text-[var(--gold)]">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="min-w-0 flex-1">

              <p className="truncate font-medium text-[var(--navy)]">
                {district.district}
              </p>

              <p className="truncate text-sm text-[var(--text-secondary)]">
                {district.incidents.toLocaleString()} incidents
              </p>

            </div>

          </div>

          <div className="text-left sm:text-right">

            <p className="text-xs uppercase text-[var(--text-muted)]">
              Risk Score
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-2 sm:justify-end">

              <span className="font-semibold text-[var(--navy)]">
                                {calculateDistrictRiskScore(
                  district.district,
                )}
              </span>

              <span
                className={`text-sm font-medium ${
                  district.trend.startsWith("+")
                    ? "text-[var(--danger)]"
                    : "text-[var(--success)]"
                }`}
              >
                {district.trend}
              </span>

            </div>

          </div>

        </button>

      ))}

  </div>

</section>

</AppShell>
);
}