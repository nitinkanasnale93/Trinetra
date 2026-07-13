import {
  Activity,
  Flame,
  MapPinned,
  TrendingUp,
} from "lucide-react";

import HotspotIntelligence from "@/components/hotspots/HotspotIntelligence";
import HotspotTrend from "@/components/hotspots/HotspotTrend";
import PriorityZones from "@/components/hotspots/PriorityZones";
import MetricCard from "@/components/dashboard/MetricCard";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

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

export default function HotspotsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Sidebar />

      <main className="ml-[240px] min-h-screen">
        <Topbar />

        <div className="px-10 py-10">
          <div className="mx-auto max-w-[1400px]">
            <p className="mb-2 text-sm text-[var(--text-secondary)]">
              Spatial intelligence
            </p>

            <h1 className="text-[32px] font-medium tracking-[-0.04em] text-[var(--navy)]">
              Hotspots
            </h1>

            <p className="mt-2 text-[15px] text-[var(--text-secondary)]">
              Identify concentrated crime activity and emerging risk zones.
            </p>

            <section className="mt-9 grid grid-cols-4 gap-4">
              {metrics.map((metric) => (
                <MetricCard
                  key={metric.title}
                  {...metric}
                />
              ))}
            </section>

            <section className="mt-4 grid grid-cols-[minmax(0,1.7fr)_minmax(320px,0.8fr)] gap-4">
              <HotspotTrend />

              <HotspotIntelligence />
            </section>

            <section className="mt-4">
              <PriorityZones />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}