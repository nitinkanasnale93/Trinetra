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
    <GlassCard className="group h-full p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--gold-soft)] transition duration-300 group-hover:scale-105 sm:h-12 sm:w-12">
          <Icon
            size={20}
            className="text-[var(--gold)] sm:h-[22px] sm:w-[22px]"
          />
        </div>

        <div
          className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium sm:px-3 sm:text-xs ${
            trend === "up"
              ? "bg-[#edf8f1] text-[var(--success)]"
              : "bg-[#fff4e5] text-[var(--warning)]"
          }`}
        >
          {trend === "up" ? (
            <ArrowUpRight size={13} />
          ) : (
            <ArrowDownRight size={13} />
          )}

          <span>{change}</span>
        </div>
      </div>

      <div className="mt-6 sm:mt-8">
        <p className="text-xs text-[var(--text-muted)] sm:text-sm">
          {title}
        </p>

        <h2 className="mt-2 break-words text-3xl font-semibold tracking-[-0.03em] text-[var(--navy)] sm:text-4xl">
          {value}
        </h2>

        <p className="mt-3 text-xs leading-5 text-[var(--text-secondary)] sm:text-sm sm:leading-6">
          {description}
        </p>
      </div>
    </GlassCard>
  );
}