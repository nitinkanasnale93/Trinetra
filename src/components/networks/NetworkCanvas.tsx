"use client";

import "@xyflow/react/dist/style.css";

import React from "react";
import { Edge, Node } from "@xyflow/react";
import { Search } from "lucide-react";

import EntityNode from "./EntityNode";
import GraphView from "./GraphView";
import { getLayoutedElements } from "./graphUtils";
import { networkData } from "./networkData";

type NetworkNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  size: number;
};

type Props = {
  nodes: NetworkNode[];
  selected: NetworkNode;
  onSelect: (node: NetworkNode) => void;
  onSearchSelect: (node: NetworkNode) => void;
  search: string;
  setSearch: (value: string) => void;
  filteredNodes: NetworkNode[];
  focusNodeId: string | null;
};

const nodeTypes = {
  entity: EntityNode,
};

const edgeStyle = {
  stroke: "#C8B27D",
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
};

export default function NetworkCanvas({
  nodes,
  selected,
  onSelect,
  onSearchSelect,
  search,
  setSearch,
  filteredNodes,
  focusNodeId,
}: Props) {
  const flowNodes: Node[] = nodes.map((node) => ({
    id: node.id,
    type: "entity",

    position: {
      x: node.x * 8,
      y: node.y * 6,
    },

    data: {
      label: node.id,

      type: node.id.startsWith("OFF")
        ? "Person"
        : node.id.startsWith("VEH")
          ? "Vehicle"
          : node.id.startsWith("INC")
            ? "Incident"
            : "Entity",

      confidence: networkData[node.id]?.confidence ?? 0,

      selected: selected.id === node.id,
    },
  }));

  const flowEdges: Edge[] = [
    {
      id: "e1",
      source: "OFF-2941",
      target: "OFF-102",
      animated: true,
      style: edgeStyle,
      type: "smoothstep",
    },
    {
      id: "e2",
      source: "OFF-2941",
      target: "INC-291",
      animated: true,
      style: edgeStyle,
      type: "smoothstep",
    },
    {
      id: "e3",
      source: "OFF-2941",
      target: "VEH-82",
      animated: true,
      style: edgeStyle,
      type: "smoothstep",
    },
    {
      id: "e4",
      source: "OFF-2941",
      target: "INC-284",
      animated: true,
      style: edgeStyle,
      type: "smoothstep",
    },
  ];

  const {
    nodes: layoutedNodes,
    edges: layoutedEdges,
  } = getLayoutedElements(flowNodes, flowEdges);

  return (
    <div className="relative h-[450px] sm:h-[550px] lg:h-[650px] xl:h-full min-h-[450px] overflow-hidden rounded-2xl bg-[#f7f5f1]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--gold-soft),transparent_70%)] opacity-60" />

      {/* Search */}

      <div className="absolute left-4 right-4 top-4 z-30 sm:left-5 sm:right-auto sm:w-[320px]">
        <div className="flex h-11 w-full items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-3 shadow-md backdrop-blur">
          <Search
            size={16}
            className="text-[var(--text-muted)]"
          />

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search entity..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--text-muted)]"
          />
        </div>

        {search && (
          <div className="mt-2 max-h-72 overflow-y-auto overflow-x-hidden rounded-xl border border-[var(--border)] bg-white shadow-xl">
            {filteredNodes.length === 0 ? (
              <div className="px-4 py-3 text-sm text-[var(--text-muted)]">
                No entity found
              </div>
            ) : (
              filteredNodes.map((node) => (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => {
                    onSearchSelect(node);
                  }}
                  className="flex w-full flex-col items-start gap-1 px-4 py-3 text-left transition hover:bg-[var(--surface-soft)] sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="truncate font-medium text-[var(--navy)]">
                    {node.id}
                  </span>

                  <span className="truncate text-xs text-[var(--text-muted)]">
                    {node.label}
                  </span>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Network Graph */}

      <div className="h-full w-full overflow-hidden">
        <GraphView
          nodes={layoutedNodes}
          edges={layoutedEdges}
          nodeTypes={nodeTypes}
          selected={selected.id}
          focusNodeId={focusNodeId}
          onNodeClick={(_event: React.MouseEvent, node: Node) => {
            const entity = nodes.find(
              (item) => item.id === node.id
            );

            if (entity) {
              onSelect(entity);
            }
          }}
        />
      </div>
    </div>
  );
}