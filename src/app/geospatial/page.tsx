"use client";

import { useEffect, useState } from "react";

import {
  Layers3,
  LocateFixed,
  MapPinned,
  Radar,
  Sparkles,
} from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import MetricCard from "@/components/dashboard/MetricCard";
import KarnatakaMap from "@/components/geospatial/KarnatakaMap";
import LoadingScreen from "@/components/geospatial/LoadingScreen";

import { hotspots } from "@/data/hotspots";

const metrics = [
  {
    title: "Mapped incidents",
    value: "1,284",
    change: "12.4%",
    trend: "up" as const,
    description: "Geocoded incident records",
    icon: MapPinned,
  },
  {
    title: "Active layers",
    value: "6",
    change: "2.1%",
    trend: "up" as const,
    description: "Operational intelligence layers",
    icon: Layers3,
  },
  {
    title: "Tracked zones",
    value: "24",
    change: "8.1%",
    trend: "down" as const,
    description: "Spatial monitoring regions",
    icon: Radar,
  },
  {
    title: "Location accuracy",
    value: "96%",
    change: "1.8%",
    trend: "up" as const,
    description: "Successfully geocoded records",
    icon: LocateFixed,
  },
];

const mapLayers = [
  "Incident density",
  "Active hotspots",
  "Offender activity",
  "Police stations",
  "District boundaries",
  "Prediction zones",
];

export default function GeospatialPage() {
  const [selectedHotspot, setSelectedHotspot] = useState(
    hotspots[0]
  );

  const [loading, setLoading] = useState(true);

  const [activeLayers, setActiveLayers] = useState<string[]>([
    "Incident density",
    "Active hotspots",
  ]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const alreadyLoaded = sessionStorage.getItem(
      "trinetra-geospatial-loaded"
    );

    if (alreadyLoaded) {
      setLoading(false);
    }
  }, []);

  const toggleLayer = (layer: string) => {
    setActiveLayers((layers) =>
      layers.includes(layer)
        ? layers.filter((l) => l !== layer)
        : [...layers, layer]
    );
  };

  return (
  if (loading) {
  return (
    <LoadingScreen
      onComplete={() => {
        sessionStorage.setItem(
          "trinetra-geospatial-loaded",
          "true"
        );
        setLoading(false);
      }}
    />
  );
}

return (
  <AppShell>

      <p className="mb-2 text-sm text-[var(--text-secondary)]">
        Spatial operations
      </p>

      <h1 className="text-[32px] font-medium tracking-[-0.04em] text-[var(--navy)]">
        Geospatial
      </h1>

      <p className="mt-2 text-[15px] text-[var(--text-secondary)]">
        Explore incident distribution and operational intelligence layers.
      </p>

      <section className="mt-9 grid grid-cols-4 gap-4">
  {metrics.map((metric) => (
    <MetricCard
      key={metric.title}
      {...metric}
    />
  ))}
</section>

<section className="mt-4 grid min-h-[620px] grid-cols-[1fr_320px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">

  {/* Map */}

  <div className="relative h-full overflow-hidden">

    {!loading && (
      <KarnatakaMap
        hotspots={hotspots}
        selectedHotspot={selectedHotspot}
        onSelect={setSelectedHotspot}
      />
    )}

    <div className="absolute left-5 top-5 z-[1000] rounded-xl border border-[var(--border)] bg-white/90 px-4 py-3 shadow-lg backdrop-blur">

      <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
        Operational Map
      </p>

      <p className="mt-1 text-sm font-medium text-[var(--navy)]">
        Karnataka Intelligence Layer
      </p>

    </div>

  </div>

  {/* Sidebar */}

  <aside className="border-l border-[var(--border)] p-5">

  <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">
    Selected Hotspot
  </p>

  <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[var(--navy)]">
    {selectedHotspot.district}
  </h2>

  <p className="mt-1 text-xs text-[var(--text-muted)]">
    {selectedHotspot.id}
  </p>

  <div className="mt-6 space-y-4">

    <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
      <span className="text-xs text-[var(--text-muted)]">
        Risk Level
      </span>

      <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-600">
        {selectedHotspot.risk}
      </span>
    </div>

    <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
      <span className="text-xs text-[var(--text-muted)]">
        Incidents
      </span>

      <span className="text-sm font-semibold text-[var(--navy)]">
        {selectedHotspot.incidents}
      </span>
    </div>

    <div className="flex items-center justify-between">
      <span className="text-xs text-[var(--text-muted)]">
        Confidence
      </span>

      <span className="text-sm font-semibold text-[var(--navy)]">
        {selectedHotspot.confidence}%
      </span>
    </div>

  </div>

  {/* AI Insight */}

  <div className="mt-7 rounded-2xl border border-[var(--border)] bg-[var(--gold-soft)]/40 p-4">

    <div className="flex items-center gap-2">

      <Sparkles
        size={15}
        className="text-[var(--gold)]"
      />

      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--gold)]">
        TRINETRA AI Insight
      </p>

    </div>

    <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
      {selectedHotspot.insight}
    </p>

  </div>

  {/* Layers */}

  <div className="mt-8 border-t border-[var(--border)] pt-6">

    <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">
      Map Layers
    </p>

    <div className="mt-3 space-y-2">

      {mapLayers.map((layer) => (
        <label
          key={layer}
          className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 transition hover:bg-[var(--surface-soft)]"
        >
          <span className="text-sm text-[var(--text-secondary)]">
            {layer}
          </span>

          <input
            type="checkbox"
            checked={activeLayers.includes(layer)}
            onChange={() => toggleLayer(layer)}
            className="h-4 w-4 accent-[var(--navy)]"
          />
        </label>
      ))}

    </div>

  </div>

</aside>

</section>

</AppShell>
);
}