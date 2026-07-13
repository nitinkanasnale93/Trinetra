"use client";

import {
  ArrowUpRight,
  Circle,
  MapPin,
  MoreHorizontal,
} from "lucide-react";

const zones = [
  {
    city: "Bengaluru",
    incidents: 428,
    risk: "Elevated",
    change: "+18%",
  },
  {
    city: "Mysuru",
    incidents: 184,
    risk: "Moderate",
    change: "+4%",
  },
  {
    city: "Mangaluru",
    incidents: 142,
    risk: "Moderate",
    change: "-3%",
  },
  {
    city: "Hubballi",
    incidents: 96,
    risk: "Low",
    change: "-8%",
  },
];

const markers = [
  {
    city: "Bengaluru",
    top: "68%",
    left: "58%",
    level: "high",
  },
  {
    city: "Mysuru",
    top: "80%",
    left: "46%",
    level: "medium",
  },
  {
    city: "Mangaluru",
    top: "62%",
    left: "18%",
    level: "medium",
  },
  {
    city: "Hubballi",
    top: "31%",
    left: "38%",
    level: "low",
  },
  {
    city: "Belagavi",
    top: "18%",
    left: "28%",
    level: "low",
  },
];

export default function KarnatakaOverview() {
  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      <div className="flex items-start justify-between border-b border-[var(--border)] px-6 py-5">
        <div>
          <h2 className="text-[16px] font-medium tracking-[-0.02em] text-[var(--navy)]">
            Karnataka operational overview
          </h2>

          <p className="mt-1 text-xs text-[var(--text-muted)]">
            Regional incident activity and monitored risk zones
          </p>
        </div>

        <button className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-muted)] transition hover:bg-[var(--surface-soft)]">
          <MoreHorizontal size={18} strokeWidth={1.8} />
        </button>
      </div>

      <div className="grid min-h-[420px] grid-cols-[1.45fr_0.85fr]">
        <div className="relative overflow-hidden border-r border-[var(--border)] bg-[#f3f1eb]">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute left-[8%] top-[15%] h-[260px] w-[260px] rounded-full border border-[var(--border-strong)]" />

            <div className="absolute bottom-[-80px] right-[5%] h-[340px] w-[340px] rounded-full border border-[var(--border-strong)]" />

            <div className="absolute left-[42%] top-[-100px] h-[300px] w-[300px] rounded-full border border-[var(--border-strong)]" />
          </div>

          <div className="absolute left-6 top-6 z-10 rounded-xl border border-[var(--border)] bg-white/90 px-4 py-3 backdrop-blur">
            <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
              State activity
            </p>

            <p className="mt-1 text-sm font-medium text-[var(--navy)]">
              7 monitored districts
            </p>
          </div>

          <div className="absolute inset-[12%_16%]">
            <div className="relative h-full w-full">
              <div className="absolute left-[28%] top-[5%] h-[84%] w-[45%] rotate-[8deg] rounded-[42%_34%_46%_38%] border border-[var(--border-strong)] bg-white/50" />

              {markers.map((marker) => (
                <button
                  key={marker.city}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    top: marker.top,
                    left: marker.left,
                  }}
                >
                  <span
                    className={`relative flex items-center justify-center rounded-full border-4 border-white shadow-sm ${
                      marker.level === "high"
                        ? "h-5 w-5 bg-[var(--danger)]"
                        : marker.level === "medium"
                          ? "h-4 w-4 bg-[var(--gold)]"
                          : "h-3.5 w-3.5 bg-[var(--success)]"
                    }`}
                  >
                    {marker.level === "high" && (
                      <span className="absolute h-8 w-8 animate-ping rounded-full bg-[var(--danger)] opacity-10" />
                    )}
                  </span>

                  <span className="pointer-events-none absolute left-1/2 top-7 -translate-x-1/2 whitespace-nowrap rounded-lg border border-[var(--border)] bg-white px-2.5 py-1.5 text-[10px] font-medium text-[var(--navy)] opacity-0 transition group-hover:opacity-100">
                    {marker.city}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="absolute bottom-5 left-6 flex items-center gap-5 rounded-xl border border-[var(--border)] bg-white/90 px-4 py-3 backdrop-blur">
            <div className="flex items-center gap-2 text-[10px] text-[var(--text-secondary)]">
              <Circle
                size={8}
                fill="var(--success)"
                strokeWidth={0}
              />
              Low
            </div>

            <div className="flex items-center gap-2 text-[10px] text-[var(--text-secondary)]">
              <Circle
                size={8}
                fill="var(--gold)"
                strokeWidth={0}
              />
              Moderate
            </div>

            <div className="flex items-center gap-2 text-[10px] text-[var(--text-secondary)]">
              <Circle
                size={8}
                fill="var(--danger)"
                strokeWidth={0}
              />
              Elevated
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between px-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">
              Priority regions
            </p>

            <button className="text-xs text-[var(--gold)]">
              View all
            </button>
          </div>

          <div className="mt-4">
            {zones.map((zone) => (
              <button
                key={zone.city}
                className="group flex w-full items-center gap-4 rounded-xl px-2 py-4 text-left transition hover:bg-[var(--surface-soft)]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                  <MapPin
                    size={15}
                    strokeWidth={1.8}
                    className="text-[var(--text-muted)]"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[var(--navy)]">
                      {zone.city}
                    </p>

                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] ${
                        zone.risk === "Elevated"
                          ? "bg-[#f8e8e8] text-[var(--danger)]"
                          : zone.risk === "Moderate"
                            ? "bg-[var(--gold-soft)] text-[var(--warning)]"
                            : "bg-[#e8f2ed] text-[var(--success)]"
                      }`}
                    >
                      {zone.risk}
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] text-[var(--text-muted)]">
                    {zone.incidents} recorded incidents
                  </p>
                </div>

                <div className="text-right">
                  <p
                    className={`text-xs font-medium ${
                      zone.change.startsWith("+")
                        ? "text-[var(--danger)]"
                        : "text-[var(--success)]"
                    }`}
                  >
                    {zone.change}
                  </p>

                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.7}
                    className="ml-auto mt-2 text-[var(--text-muted)] opacity-0 transition group-hover:opacity-100"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}