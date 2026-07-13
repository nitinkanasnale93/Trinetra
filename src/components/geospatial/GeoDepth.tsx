"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import type { MouseEvent } from "react";

const hotspots = [
  {
    id: 1,
    top: "26%",
    left: "34%",
    size: 14,
    delay: 0,
  },
  {
    id: 2,
    top: "43%",
    left: "58%",
    size: 18,
    delay: 0.5,
  },
  {
    id: 3,
    top: "61%",
    left: "42%",
    size: 12,
    delay: 1,
  },
  {
    id: 4,
    top: "34%",
    left: "71%",
    size: 10,
    delay: 1.5,
  },
  {
    id: 5,
    top: "72%",
    left: "66%",
    size: 15,
    delay: 2,
  },
];

export default function GeoDepth() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, {
    stiffness: 90,
    damping: 24,
  });

  const smoothY = useSpring(y, {
    stiffness: 90,
    damping: 24,
  });

  function handleMouseMove(
    event: MouseEvent<HTMLDivElement>
  ) {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const pointerX =
      (event.clientX - rect.left) / rect.width - 0.5;

    const pointerY =
      (event.clientY - rect.top) / rect.height - 0.5;

    x.set(pointerX * 14);
    y.set(pointerY * 10);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="pointer-events-auto absolute inset-0 overflow-hidden"
    >
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="absolute inset-[-20px]"
      >
        <div className="absolute left-[22%] top-[18%] h-[320px] w-[320px] rounded-full bg-[var(--gold-soft)] opacity-40 blur-[100px]" />

        <div className="absolute bottom-[8%] right-[10%] h-[260px] w-[260px] rounded-full bg-[#e8edf3] opacity-60 blur-[100px]" />

        {hotspots.map((hotspot) => (
          <div
            key={hotspot.id}
            className="absolute"
            style={{
              top: hotspot.top,
              left: hotspot.left,
            }}
          >
            <motion.div
              animate={{
                scale: [1, 2.2],
                opacity: [0.35, 0],
              }}
              transition={{
                duration: 2.8,
                delay: hotspot.delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute rounded-full border border-[var(--gold)]"
              style={{
                width: hotspot.size * 3,
                height: hotspot.size * 3,
                left: -(hotspot.size * 1.5),
                top: -(hotspot.size * 1.5),
              }}
            />

            <motion.div
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 3,
                delay: hotspot.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative rounded-full bg-[var(--gold)] shadow-[0_8px_30px_rgba(169,134,61,0.25)]"
              style={{
                width: hotspot.size,
                height: hotspot.size,
              }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}