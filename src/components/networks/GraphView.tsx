"use client";

import { useEffect } from "react";

import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useReactFlow,
} from "@xyflow/react";

type Props = {
  nodes: any[];
  edges: any[];
  nodeTypes: any;
  onNodeClick: any;
  selected: string;
  focusNodeId: string | null;
};

function SearchFocusController({
  focusNodeId,
}: {
  focusNodeId: string | null;
}) {
  const reactFlow = useReactFlow();

  useEffect(() => {
    if (!focusNodeId) return;

    const timer = window.setTimeout(() => {
      const node = reactFlow.getNode(focusNodeId);

      if (!node) return;

      const width =
        node.measured?.width ??
        node.width ??
        210;

      const height =
        node.measured?.height ??
        node.height ??
        110;

      const centerX =
        node.position.x + width / 2;

      const centerY =
        node.position.y + height / 2;

      reactFlow.setCenter(
        centerX,
        centerY,
        {
          zoom: 1.35,
          duration: 800,
        }
      );
    }, 100);

    return () => {
      window.clearTimeout(timer);
    };
  }, [focusNodeId, reactFlow]);

  return null;
}

export default function GraphView({
  nodes,
  edges,
  nodeTypes,
  onNodeClick,
  selected,
  focusNodeId,
}: Props) {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{
        padding: 0.35,
        minZoom: 0.55,
        maxZoom: 0.9,
      }}
      nodesDraggable
      nodesConnectable={false}
      elementsSelectable
      zoomOnScroll
      panOnDrag
      minZoom={0.4}
      maxZoom={1.8}
      onNodeClick={onNodeClick}
    >
      <SearchFocusController
        focusNodeId={focusNodeId}
      />

      <Background
        gap={28}
        size={1}
        color="#e4dfd3"
      />

      <MiniMap
        pannable
        zoomable={false}
        nodeStrokeWidth={2}
        position="bottom-right"
        style={{
          width: 120,
          height: 80,
          borderRadius: 14,
          background: "#ffffffdd",
          border: "1px solid #e8e3d8",
          overflow: "hidden",
          opacity: 0.8,
        }}
      />

      <Controls
        position="bottom-left"
        showInteractive={false}
      />
    </ReactFlow>
  );
}