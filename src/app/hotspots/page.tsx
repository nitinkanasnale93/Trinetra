"use client";

import { useMemo, useState } from "react";

import {
  Activity,
  Flame,
  MapPinned,
  Search,
  TrendingUp,
} from "lucide-react";

import MetricCard from "@/components/dashboard/MetricCard";
import HotspotIntelligence from "@/components/hotspots/HotspotIntelligence";
import HotspotTrend from "@/components/hotspots/HotspotTrend";
import PriorityZones from "@/components/hotspots/PriorityZones";
import AppShell from "@/components/layout/AppShell";

import { hotspots } from "@/data/hotspots";

const metrics = [
  {
    title: "Active hotspots",
    value: "24",
    change: "8.1%",
    trend: "up" as const,
    description: "Across seven monitored districts",
    icon: Flame,
  },
  {
    title: "Elevated zones",
    value: "6",
    change: "12.4%",
    trend: "up" as const,
    description: "Require operational attention",
    icon: MapPinned,
  },
  {
    title: "Average risk score",
    value: "72",
    change: "5.8%",
    trend: "up" as const,
    description: "Calculated from recent incident activity",
    icon: Activity,
  },
  {
    title: "Weekly intensity",
    value: "+18%",
    change: "3.2%",
    trend: "up" as const,
    description: "Compared with the previous seven days",
    icon: TrendingUp,
  },
];

const riskFilters = [
  "All",
  "Critical",
  "High",
  "Medium",
  "Low",
];

export default function HotspotsPage() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [selectedHotspot, setSelectedHotspot] = useState(
    hotspots[0]
  );

  const filteredHotspots = useMemo(() => {
    const query = search.trim().toLowerCase();

    return hotspots.filter((hotspot) => {
      const matchesSearch =
        hotspot.id.toLowerCase().includes(query) ||
        hotspot.district.toLowerCase().includes(query);

      const matchesRisk =
        riskFilter === "All" ||
        hotspot.risk === riskFilter;

      return matchesSearch && matchesRisk;
    });
  }, [search, riskFilter]);


  return (
    <AppShell>
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="mb-2 text-sm text-[var(--text-secondary)]">
            Spatial intelligence
          </p>

          <h1 className="text-[32px] font-medium tracking-[-0.04em] text-[var(--navy)]">
            Hotspots
          </h1>

          <p className="mt-2 text-[15px] text-[var(--text-secondary)]">
            Identify concentrated crime activity and emerging risk zones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-[260px] items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 shadow-sm">
            <Search
              size={16}
              className="shrink-0 text-[var(--text-muted)]"
            />

            <input
              value={search}
              onChange={(event) => {
                const value = event.target.value;

                setSearch(value);

                const query = value.trim().toLowerCase();

                const matches = hotspots.filter((hotspot) => {
                  const matchesSearch =
                    hotspot.id.toLowerCase().includes(query) ||
                    hotspot.district.toLowerCase().includes(query);

                  const matchesRisk =
                    riskFilter === "All" ||
                    hotspot.risk === riskFilter;

                  return matchesSearch && matchesRisk;
                });

                if (query && matches.length === 1) {
                  setSelectedHotspot(matches[0]);
                }
              }}
              placeholder="Search hotspot..."
              className="w-full bg-transparent text-sm text-[var(--navy)] outline-none placeholder:text-[var(--text-muted)]"
            />
          </div>

          <select
            value={riskFilter}
            onChange={(event) =>
              setRiskFilter(event.target.value)
            }
            className="h-11 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-sm text-[var(--navy)] outline-none"
          >
            {riskFilters.map((risk) => (
              <option
                key={risk}
                value={risk}
              >
                {risk === "All"
                  ? "All risk levels"
                  : `${risk} risk`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Metrics */}

      <section className="mt-9 grid grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            {...metric}
          />
        ))}
      </section>

      {/* Intelligence */}

      <section className="mt-4 grid grid-cols-[minmax(0,1.7fr)_minmax(320px,0.8fr)] gap-4">
        <HotspotTrend
          hotspot={selectedHotspot}
        />

        <HotspotIntelligence
          hotspot={selectedHotspot}
        />
      </section>

      {/* Priority Zones */}

      <section className="mt-4">
        <PriorityZones
          hotspot={selectedHotspot}
        />
      </section>

      {/* Search Results */}

      {(search || riskFilter !== "All") && (
        <section className="mt-4 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-5">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
                Intelligence results
              </p>

              <h2 className="mt-1 text-lg font-semibold text-[var(--navy)]">
                Matching hotspots
              </h2>
            </div>

            <span className="text-sm text-[var(--text-muted)]">
              {filteredHotspots.length} results
            </span>
          </div>

          {filteredHotspots.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm font-medium text-[var(--navy)]">
                No hotspots found
              </p>

              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Try another district, hotspot ID, or risk level.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[var(--border)]">
              {filteredHotspots.map((hotspot) => {
                const isSelected =
                  selectedHotspot.id === hotspot.id;

                return (
                  <button
                    key={hotspot.id}
                    type="button"
                    onClick={() =>
                      setSelectedHotspot(hotspot)
                    }
                    className={`grid w-full grid-cols-[1.1fr_0.8fr_0.7fr_0.7fr] items-center gap-4 px-6 py-4 text-left transition ${
                      isSelected
                        ? "bg-[var(--gold-soft)]/40"
                        : "hover:bg-[var(--surface-soft)]"
                    }`}
                  >
                    <div>
                      <p className="font-medium text-[var(--navy)]">
                        {hotspot.district}
                      </p>

                      <p className="mt-1 text-xs text-[var(--text-muted)]">
                        {hotspot.id}
                      </p>
                    </div>

                    <p className="text-sm text-[var(--text-secondary)]">
                      {hotspot.incidents} incidents
                    </p>

                    <p className="text-sm font-medium text-[var(--navy)]">
                      {hotspot.risk}
                    </p>

                    <p className="text-sm text-[var(--text-secondary)]">
                      {hotspot.confidence}% confidence
                    </p>
                  </button>
                );
              })}
            </div>
          )}
        </section>
      )}
    </AppShell>
  );
}