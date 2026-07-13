"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import type {
  MouseEvent,
  ReactNode,
} from "react";

type TiltCardProps = {
  children: ReactNode;
  delay?: number;
};

export default function TiltCard({
  children,
  delay = 0,
}: TiltCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateXRaw = useTransform(
    mouseY,
    [-0.5, 0.5],
    [3, -3]
  );

  const rotateYRaw = useTransform(
    mouseX,
    [-0.5, 0.5],
    [-3, 3]
  );

  const rotateX = useSpring(rotateXRaw, {
    stiffness: 180,
    damping: 24,
  });

  const rotateY = useSpring(rotateYRaw, {
    stiffness: 180,
    damping: 24,
  });

  function handleMouseMove(
    event: MouseEvent<HTMLDivElement>
  ) {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        y: -3,
      }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}