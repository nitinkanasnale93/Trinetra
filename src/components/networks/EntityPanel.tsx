"use client";

import { motion } from "motion/react";

import GlassCard from "@/components/ui/GlassCard";
import Badge from "@/components/ui/Badge";
import AIInsight from "./AIInsight";
import { networkData } from "./networkData";

type Entity = {
  id: string;
  label: string;
};

type Props = {
  entity: Entity;
};

export default function EntityPanel({
  entity,
}: Props) {
  const data = networkData[entity.id];

  return (
    <motion.div
      key={entity.id}
      initial={{
        opacity: 0,
        x: 20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="h-full"
    >
      <GlassCard className="h-full p-7">
        <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
          Selected Entity
        </p>

        <h2 className="mt-3 text-3xl font-semibold text-[var(--navy)]">
          {entity.id}
        </h2>

        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          {data.label}
        </p>

        <div className="mt-6">
          <div
            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
              data.risk === "Critical"
                ? "bg-red-100 text-red-600"
                : data.risk === "High"
                ? "bg-orange-100 text-orange-600"
                : data.risk === "Medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            {data.risk} Risk
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <p className="text-xs text-[var(--text-muted)]">
              Confidence
            </p>

            <div className="mt-2 h-2 rounded-full bg-[var(--border)]">
              <div
                className="h-2 rounded-full bg-[var(--gold)] transition-all duration-500"
                style={{
                  width: `${data.confidence}%`,
                }}
              />
            </div>

            <p className="mt-2 text-sm font-medium text-[var(--navy)]">
              {data.confidence}%
            </p>
          </div>

          <div>
            <p className="text-xs text-[var(--text-muted)]">
              Connected Cases
            </p>

            <h3 className="mt-1 text-2xl font-semibold text-[var(--navy)]">
              {data.cases}
            </h3>
          </div>

          <div>
            <p className="text-xs text-[var(--text-muted)]">
              Last Activity
            </p>

            <h3 className="mt-1 text-lg font-medium text-[var(--navy)]">
              {data.lastActivity}
            </h3>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--border)] pt-6">
          <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
            Connected Assets
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {data.assets.map((asset) => (
              <Badge key={asset}>
                {asset}
              </Badge>
            ))}
          </div>
        </div>

        <AIInsight
          insight={data.insight}
          confidence={data.confidence}
        />
      </GlassCard>
    </motion.div>
  );
}