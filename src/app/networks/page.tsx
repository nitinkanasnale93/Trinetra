"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import EntityPanel from "@/components/networks/EntityPanel";
import NetworkAnalytics from "@/components/networks/NetworkAnalytics";
import NetworkCanvas from "@/components/networks/NetworkCanvas";
import Timeline from "@/components/networks/Timeline";

import { networkData } from "@/components/networks/networkData";

const nodes = [
  {
    id: "OFF-2941",
    label: "Primary subject",
    x: 52,
    y: 44,
    size: 84,
  },
  {
    id: "OFF-102",
    label: "Linked offender",
    x: 18,
    y: 18,
    size: 64,
  },
  {
    id: "VEH-82",
    label: "Vehicle",
    x: 82,
    y: 18,
    size: 60,
  },
  {
    id: "INC-291",
    label: "Incident",
    x: 18,
    y: 74,
    size: 58,
  },
  {
    id: "INC-284",
    label: "Incident",
    x: 82,
    y: 74,
    size: 58,
  },
];

const connections = [
  {
    source: "OFF-2941",
    target: "OFF-102",
  },
  {
    source: "OFF-2941",
    target: "INC-291",
  },
  {
    source: "OFF-2941",
    target: "VEH-82",
  },
  {
    source: "OFF-2941",
    target: "INC-284",
  },
];

export default function NetworksPage() {
  const [selected, setSelected] = useState(nodes[0]);
  const [search, setSearch] = useState("");
  const [focusNodeId, setFocusNodeId] = useState<string | null>(
    null
  );

  const filteredNodes = nodes.filter((node) => {
    const query = search.trim().toLowerCase();

    return (
      node.id.toLowerCase().includes(query) ||
      node.label.toLowerCase().includes(query)
    );
  });

  const networkEntities = Object.values(networkData);

  const highRisk = networkEntities.filter(
    (entity) =>
      entity.risk === "Critical" ||
      entity.risk === "High"
  ).length;

  const averageConfidence =
    networkEntities.length > 0
      ? Math.round(
          networkEntities.reduce(
            (total, entity) =>
              total + entity.confidence,
            0
          ) / networkEntities.length
        )
      : 0;

  const handleNodeSelect = (
    node: (typeof nodes)[number]
  ) => {
    setSelected(node);
  };

  const handleSearchSelect = (
    node: (typeof nodes)[number]
  ) => {
    setSelected(node);
    setFocusNodeId(node.id);
    setSearch("");
  };

  return (
    <AppShell>
      <div className="flex items-end justify-between">
        <div>
          <p className="mb-2 text-sm text-[var(--text-secondary)]">
            Relationship intelligence
          </p>

          <h1 className="text-[32px] font-medium tracking-[-0.04em] text-[var(--navy)]">
            Networks
          </h1>

          <p className="mt-2 text-[15px] text-[var(--text-secondary)]">
            Explore relationships between offenders, incidents,
            and entities.
          </p>
        </div>

        <button
          type="button"
          className="flex h-11 items-center gap-2 rounded-xl bg-[var(--navy)] px-4 text-sm text-white transition hover:opacity-90"
        >
          <Share2 size={16} />

          Export network
        </button>
      </div>

      <NetworkAnalytics
        entities={nodes.length}
        connections={connections.length}
        highRisk={highRisk}
        averageConfidence={averageConfidence}
      />

      <section className="mt-4 grid min-h-[680px] grid-cols-[1fr_320px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        <NetworkCanvas
          nodes={nodes}
          selected={selected}
          onSelect={handleNodeSelect}
          onSearchSelect={handleSearchSelect}
          search={search}
          setSearch={setSearch}
          filteredNodes={filteredNodes}
          focusNodeId={focusNodeId}
        />

        <aside className="border-l border-[var(--border)] p-6">
          <EntityPanel entity={selected} />
        </aside>
      </section>

      <section className="mt-6">
        <Timeline />
      </section>
    </AppShell>
  );
}