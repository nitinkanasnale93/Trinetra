"use client";

import { Handle, Position } from "@xyflow/react";
import {
  Car,
  Landmark,
  ShieldAlert,
  Smartphone,
  User,
} from "lucide-react";

type Props = {
  data: {
    label: string;
    type: string;
    confidence: number;
    selected?: boolean;
  };
};

export default function EntityNode({ data }: Props) {
  const icons: Record<string, any> = {
    Person: User,
    Vehicle: Car,
    Device: Smartphone,
    Financial: Landmark,
    Incident: ShieldAlert,
  };

  const Icon = icons[data.type] ?? User;

  return (
    <>
      <Handle type="target" position={Position.Left} />

      <div
        className={`group relative w-[210px] rounded-2xl border transition-all duration-300 ${
          data.selected
            ? "border-[var(--gold)] bg-white shadow-[0_12px_40px_rgba(201,167,77,0.25)] scale-105"
            : "border-[var(--border)] bg-white hover:-translate-y-1 hover:shadow-xl"
        }`}
      >
        {data.selected && (
          <div className="absolute inset-0 rounded-2xl bg-[var(--gold)]/10 animate-pulse" />
        )}

        <div className="relative p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--gold-soft)]">
              <Icon
                size={20}
                className="text-[var(--gold)]"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-semibold text-[var(--navy)]">
                {data.label}
              </h3>

              <p className="text-xs text-[var(--text-muted)]">
                {data.type}
              </p>
            </div>

            <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
          </div>

          <div className="mt-5">
            <div className="flex justify-between text-[11px]">
              <span className="text-[var(--text-muted)]">
                Confidence
              </span>

              <span className="font-medium text-[var(--navy)]">
                {data.confidence}%
              </span>
            </div>

            <div className="mt-2 h-2 rounded-full bg-[var(--border)]">
              <div
                className="h-2 rounded-full bg-[var(--gold)] transition-all duration-700"
                style={{
                  width: `${data.confidence}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Right} />
    </>
  );
}