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

export type CrimeActivityPoint = {
  date: string;
  label: string;
  incidents: number;
};

type CrimeActivityChartProps = {
  data: CrimeActivityPoint[];
};

export default function CrimeActivityChart({
  data,
}: CrimeActivityChartProps) {
  const totalIncidents = data.reduce(
    (total, point) => total + point.incidents,
    0
  );

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5 lg:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-[15px] font-medium tracking-[-0.02em] text-[var(--navy)] sm:text-[16px]">
            Crime activity
          </h2>

          <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
            Verified incident activity across the current dataset
          </p>
        </div>

        <div className="self-start rounded-lg border border-[var(--border)] px-3 py-2 text-xs text-[var(--text-secondary)]">
          {totalIncidents} incidents
        </div>
      </div>

      <div className="mt-6 h-[240px] w-full sm:h-[260px] lg:mt-8 lg:h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -10,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="crimeGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
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
              dataKey="label"
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
              minTickGap={20}
              tick={{
                fill: "#98a2b3",
                fontSize: 11,
              }}
              dy={10}
            />

            <YAxis
              allowDecimals={false}
              domain={[0, "auto"]}
              axisLine={false}
              tickLine={false}
              width={28}
              tick={{
                fill: "#98a2b3",
                fontSize: 11,
              }}
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
              labelFormatter={(_, payload) => {
                const point =
                  payload?.[0]?.payload as
                    | CrimeActivityPoint
                    | undefined;

                return point?.date || "";
              }}
              formatter={(value) => [
                `${Number(value)} incident${
                  Number(value) === 1 ? "" : "s"
                }`,
                "Verified activity",
              ]}
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