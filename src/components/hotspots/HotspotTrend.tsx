"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Hotspot = {
  id: string;
  district: string;
  lat: number;
  lng: number;
  incidents: number;
  risk: string;
  confidence: number;
  insight: string;
};

type Props = {
  hotspot: Hotspot;
};

const trendData: Record<
  string,
  {
    status: string;
    description: string;
    data: {
      day: string;
      score: number;
    }[];
  }
> = {
  "HS-001": {
    status: "Elevated trend",
    description: "Bengaluru Urban hotspot risk intensity",
    data: [
      { day: "07 Jul", score: 38 },
      { day: "08 Jul", score: 44 },
      { day: "09 Jul", score: 41 },
      { day: "10 Jul", score: 56 },
      { day: "11 Jul", score: 63 },
      { day: "12 Jul", score: 78 },
      { day: "13 Jul", score: 84 },
    ],
  },

  "HS-002": {
    status: "Rising trend",
    description: "Mysuru hotspot risk intensity",
    data: [
      { day: "07 Jul", score: 34 },
      { day: "08 Jul", score: 39 },
      { day: "09 Jul", score: 46 },
      { day: "10 Jul", score: 52 },
      { day: "11 Jul", score: 61 },
      { day: "12 Jul", score: 67 },
      { day: "13 Jul", score: 73 },
    ],
  },

  "HS-003": {
    status: "Rapid increase",
    description: "Tumakuru hotspot risk intensity",
    data: [
      { day: "07 Jul", score: 28 },
      { day: "08 Jul", score: 31 },
      { day: "09 Jul", score: 35 },
      { day: "10 Jul", score: 48 },
      { day: "11 Jul", score: 59 },
      { day: "12 Jul", score: 72 },
      { day: "13 Jul", score: 81 },
    ],
  },

  "HS-004": {
    status: "Emerging trend",
    description: "Shivamogga hotspot risk intensity",
    data: [
      { day: "07 Jul", score: 25 },
      { day: "08 Jul", score: 31 },
      { day: "09 Jul", score: 29 },
      { day: "10 Jul", score: 36 },
      { day: "11 Jul", score: 42 },
      { day: "12 Jul", score: 48 },
      { day: "13 Jul", score: 54 },
    ],
  },

  "HS-005": {
    status: "Stable trend",
    description: "Belagavi hotspot risk intensity",
    data: [
      { day: "07 Jul", score: 31 },
      { day: "08 Jul", score: 29 },
      { day: "09 Jul", score: 33 },
      { day: "10 Jul", score: 30 },
      { day: "11 Jul", score: 35 },
      { day: "12 Jul", score: 32 },
      { day: "13 Jul", score: 34 },
    ],
  },
};

export default function HotspotTrend({
  hotspot,
}: Props) {
  const trend =
    trendData[hotspot.id] ?? trendData["HS-001"];

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[16px] font-medium tracking-[-0.02em] text-[var(--navy)]">
            Hotspot intensity
          </h2>

          <p className="mt-1 text-xs text-[var(--text-muted)]">
            {trend.description}
          </p>
        </div>

        <div className="rounded-full bg-[#f8e8e8] px-3 py-1.5 text-[10px] font-medium text-[var(--danger)]">
          {trend.status}
        </div>
      </div>

      <div className="mt-8 h-[300px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart data={trend.data}>
            <defs>
              <linearGradient
                id={`hotspotGradient-${hotspot.id}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#a9863d"
                  stopOpacity={0.2}
                />

                <stop
                  offset="95%"
                  stopColor="#a9863d"
                  stopOpacity={0}
                />
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
              tick={{
                fill: "#98a2b3",
                fontSize: 11,
              }}
              dy={10}
            />

            <YAxis
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#98a2b3",
                fontSize: 11,
              }}
              width={30}
            />

            <Tooltip
              formatter={(value) => [
                `${value}`,
                "Risk score",
              ]}
              contentStyle={{
                border: "1px solid #e7e5df",
                borderRadius: "12px",
                boxShadow: "none",
                fontSize: "12px",
              }}
            />

            <Area
              key={hotspot.id}
              type="monotone"
              dataKey="score"
              stroke="#a9863d"
              strokeWidth={2}
              fill={`url(#hotspotGradient-${hotspot.id})`}
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}