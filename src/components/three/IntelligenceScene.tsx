"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

type NetworkNode = {
  id: string;
  position: [number, number, number];
  size: number;
  primary?: boolean;
};

const nodes: NetworkNode[] = [
  {
    id: "primary",
    position: [0, 0, 0],
    size: 0.28,
    primary: true,
  },
  {
    id: "entity-1",
    position: [-2, 1.15, 0.2],
    size: 0.14,
  },
  {
    id: "entity-2",
    position: [1.8, 1.3, -0.3],
    size: 0.13,
  },
  {
    id: "entity-3",
    position: [-2.2, -1.2, -0.2],
    size: 0.15,
  },
  {
    id: "entity-4",
    position: [2.1, -1, 0.3],
    size: 0.14,
  },
  {
    id: "entity-5",
    position: [0.3, 2, -0.5],
    size: 0.11,
  },
  {
    id: "entity-6",
    position: [0.5, -2, 0.4],
    size: 0.12,
  },
];

function NetworkNode({
  node,
}: {
  node: NetworkNode;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!mesh.current) return;

    const targetScale = hovered ? 1.35 : 1;

    mesh.current.scale.lerp(
      new THREE.Vector3(
        targetScale,
        targetScale,
        targetScale
      ),
      0.08
    );
  });

  return (
    <Float
      speed={0.8}
      floatIntensity={0.25}
      rotationIntensity={0.08}
    >
      <mesh
        ref={mesh}
        position={node.position}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <sphereGeometry
          args={[node.size, 32, 32]}
        />

        <meshStandardMaterial
          color={
            node.primary
              ? "#14213d"
              : hovered
                ? "#c7a65a"
                : "#a9863d"
          }
          roughness={0.32}
          metalness={0.12}
        />
      </mesh>
    </Float>
  );
}

function IntelligenceNetwork() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x * 0.12,
      0.025
    );

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y * 0.08,
      0.025
    );
  });

  return (
    <group ref={group}>
      {nodes.slice(1).map((node) => (
        <Line
          key={`primary-${node.id}`}
          points={[
            nodes[0].position,
            node.position,
          ]}
          color="#c9b98f"
          lineWidth={0.7}
          transparent
          opacity={0.55}
        />
      ))}

      <Line
        points={[
          nodes[1].position,
          nodes[5].position,
        ]}
        color="#ded8c9"
        lineWidth={0.5}
        transparent
        opacity={0.5}
      />

      <Line
        points={[
          nodes[2].position,
          nodes[4].position,
        ]}
        color="#ded8c9"
        lineWidth={0.5}
        transparent
        opacity={0.5}
      />

      <Line
        points={[
          nodes[3].position,
          nodes[6].position,
        ]}
        color="#ded8c9"
        lineWidth={0.5}
        transparent
        opacity={0.5}
      />

      {nodes.map((node) => (
        <NetworkNode
          key={node.id}
          node={node}
        />
      ))}
    </group>
  );
}

export default function IntelligenceScene() {
  return (
    <div className="relative h-full min-h-[560px] w-full overflow-hidden bg-[#fbfaf7]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--gold-soft)] opacity-50 blur-[110px]" />

      <Canvas
        camera={{
          position: [0, 0, 6.5],
          fov: 44,
        }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
        }}
        style={{
          background: "transparent",
        }}
      >
        <ambientLight intensity={2.2} />

        <directionalLight
          position={[4, 5, 5]}
          intensity={2.4}
        />

        <pointLight
          position={[-3, -2, 4]}
          intensity={1.4}
        />

        <IntelligenceNetwork />
      </Canvas>
    </div>
  );
}