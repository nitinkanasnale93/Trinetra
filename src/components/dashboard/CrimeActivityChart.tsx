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
  { day: "Mon", incidents: 42 },
  { day: "Tue", incidents: 51 },
  { day: "Wed", incidents: 46 },
  { day: "Thu", incidents: 68 },
  { day: "Fri", incidents: 61 },
  { day: "Sat", incidents: 79 },
  { day: "Sun", incidents: 72 },
];

export default function CrimeActivityChart() {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[16px] font-medium tracking-[-0.02em] text-[var(--navy)]">
            Crime activity
          </h2>

          <p className="mt-1 text-xs text-[var(--text-muted)]">
            Recorded incidents over the last 7 days
          </p>
        </div>

        <button className="rounded-lg border border-[var(--border)] px-3 py-2 text-xs text-[var(--text-secondary)] transition hover:bg-[var(--surface-soft)]">
          Last 7 days
        </button>
      </div>

      <div className="mt-8 h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="crimeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#14213d"
                  stopOpacity={0.14}
                />

                <stop
                  offset="95%"
                  stopColor="#14213d"
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
              cursor={{
                stroke: "#d8d5cd",
                strokeDasharray: "4 4",
              }}
              contentStyle={{
                border: "1px solid #e7e5df",
                borderRadius: "12px",
                boxShadow: "none",
                fontSize: "12px",
              }}
            />

            <Area
              type="monotone"
              dataKey="incidents"
              stroke="#14213d"
              strokeWidth={2}
              fill="url(#crimeGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}