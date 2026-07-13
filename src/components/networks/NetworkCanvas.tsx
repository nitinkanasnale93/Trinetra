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
    <div className="relative h-full overflow-hidden bg-[#f7f5f1]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--gold-soft),transparent_70%)] opacity-60" />

      {/* Search */}

      <div className="absolute left-5 top-5 z-30 w-[280px]">
        <div className="flex h-11 items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-3 shadow-sm">
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
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        {search && (
          <div className="mt-2 overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-lg">
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
                  className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-[var(--surface-soft)]"
                >
                  <span className="font-medium text-[var(--navy)]">
                    {node.id}
                  </span>

                  <span className="text-xs text-[var(--text-muted)]">
                    {node.label}
                  </span>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Network Graph */}

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
  );
}