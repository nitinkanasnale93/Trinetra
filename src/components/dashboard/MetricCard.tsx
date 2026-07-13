import { ArrowDownRight, ArrowUpRight, LucideIcon } from "lucide-react";

import GlassCard from "@/components/ui/GlassCard";

type MetricCardProps = {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  description: string;
  icon: LucideIcon;
};

export default function MetricCard({
  title,
  value,
  change,
  trend,
  description,
  icon: Icon,
}: MetricCardProps) {
  return (
    <GlassCard className="group p-6">
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--gold-soft)] transition group-hover:scale-105">
          <Icon
            size={22}
            className="text-[var(--gold)]"
          />
        </div>

        <div
          className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
            trend === "up"
              ? "bg-[#edf8f1] text-[var(--success)]"
              : "bg-[#fff4e5] text-[var(--warning)]"
          }`}
        >
          {trend === "up" ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}

          {change}
        </div>
      </div>

      <div className="mt-8">
        <p className="text-sm text-[var(--text-muted)]">
          {title}
        </p>

        <h2 className="mt-2 text-4xl font-semibold tracking-[-0.03em] text-[var(--navy)]">
          {value}
        </h2>

        <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
          {description}
        </p>
      </div>
    </GlassCard>
  );
}