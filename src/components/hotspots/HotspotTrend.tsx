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

const data = [
  { day: "07 Jul", score: 38 },
  { day: "08 Jul", score: 44 },
  { day: "09 Jul", score: 41 },
  { day: "10 Jul", score: 56 },
  { day: "11 Jul", score: 63 },
  { day: "12 Jul", score: 78 },
  { day: "13 Jul", score: 84 },
];

export default function HotspotTrend() {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[16px] font-medium tracking-[-0.02em] text-[var(--navy)]">
            Hotspot intensity
          </h2>

          <p className="mt-1 text-xs text-[var(--text-muted)]">
            Aggregated risk score across priority zones
          </p>
        </div>

        <div className="rounded-full bg-[#f8e8e8] px-3 py-1.5 text-[10px] font-medium text-[var(--danger)]">
          Elevated trend
        </div>
      </div>

      <div className="mt-8 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="hotspotGradient"
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
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#98a2b3",
                fontSize: 11,
              }}
              width={30}
            />

            <Tooltip
              contentStyle={{
                border: "1px solid #e7e5df",
                borderRadius: "12px",
                boxShadow: "none",
                fontSize: "12px",
              }}
            />

            <Area
              type="monotone"
              dataKey="score"
              stroke="#a9863d"
              strokeWidth={2}
              fill="url(#hotspotGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}