"use client";

import { motion } from "motion/react";

type PageTransitionProps = {
  children: React.ReactNode;
};

export default function PageTransition({
  children,
}: PageTransitionProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}