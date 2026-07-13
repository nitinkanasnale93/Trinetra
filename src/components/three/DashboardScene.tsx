"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const nodes: [number, number, number][] = [
  [0, 0, 0],
  [-1.8, 0.9, 0.2],
  [1.6, 1.1, -0.3],
  [-1.5, -1.1, -0.2],
  [1.9, -0.8, 0.2],
  [0.3, 1.8, -0.5],
];

function IntelligenceMesh() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;

    group.current.rotation.y += delta * 0.04;

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y * 0.08,
      0.025
    );
  });

  return (
    <group ref={group}>
      {nodes.slice(1).map((node, index) => (
        <Line
          key={`line-${index}`}
          points={[nodes[0], node]}
          color="#a9863d"
          lineWidth={0.6}
          transparent
          opacity={0.32}
        />
      ))}

      {nodes.map((node, index) => (
        <Float
          key={`node-${index}`}
          speed={0.8 + index * 0.05}
          floatIntensity={0.25}
          rotationIntensity={0.1}
        >
          <mesh position={node}>
            <sphereGeometry
              args={[index === 0 ? 0.2 : 0.1, 24, 24]}
            />

            <meshStandardMaterial
              color={index === 0 ? "#14213d" : "#a9863d"}
              roughness={0.45}
              metalness={0.08}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function DashboardScene() {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{
          position: [0, 0, 6],
          fov: 42,
        }}
        dpr={[1, 1.25]}
        gl={{
          alpha: true,
          antialias: true,
        }}
        style={{
          background: "transparent",
        }}
      >
        <ambientLight intensity={2.5} />

        <directionalLight
          position={[4, 5, 5]}
          intensity={2.5}
        />

        <IntelligenceMesh />
      </Canvas>
    </div>
  );
}