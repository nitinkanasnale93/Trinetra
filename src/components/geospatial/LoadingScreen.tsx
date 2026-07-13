"use client";

import { useEffect, useState } from "react";
import {
  Shield,
  Satellite,
  BrainCircuit,
  Database,
} from "lucide-react";

type Props = {
  onComplete: () => void;
};

const steps = [
  {
    icon: Satellite,
    text: "Connecting to satellite layer...",
  },
  {
    icon: Database,
    text: "Loading intelligence database...",
  },
  {
    icon: BrainCircuit,
    text: "Initializing AI prediction engine...",
  },
  {
    icon: Shield,
    text: "Preparing operational dashboard...",
  },
];

export default function LoadingScreen({
  onComplete,
}: Props) {
  const [active, setActive] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (active === steps.length) {
      setTimeout(() => {
        setFadeOut(true);

        setTimeout(() => {
          onComplete();
        }, 800);
      }, 600);

      return;
    }

    const timer = setTimeout(() => {
      setActive((prev) => prev + 1);
    }, 700);

    return () => clearTimeout(timer);
  }, [active, onComplete]);

  return (
    <div
      className={`absolute inset-0 z-[9999] flex items-center justify-center bg-[var(--navy)] text-white transition-all duration-700 ${
        fadeOut
          ? "opacity-0 scale-105"
          : "opacity-100"
      }`}
    >
      <div className="w-[430px]">

        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--gold)]/15">
            <Shield
              size={34}
              className="text-[var(--gold)]"
            />
          </div>

          <div>
            <h1 className="text-4xl font-semibold tracking-wide">
              TRINETRA
            </h1>

            <p className="text-sm text-white/70">
              Spatial Intelligence Engine
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            const completed = index < active;
            const current = index === active;

            return (
              <div
                key={step.text}
                className={`flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 transition-all duration-500 ${
                  completed || current
                    ? "bg-white/10"
                    : "opacity-40"
                }`}
              >
                <Icon
                  size={18}
                  className={
                    completed
                      ? "text-green-400"
                      : current
                      ? "text-[var(--gold)]"
                      : ""
                  }
                />

                <span className="text-sm">
                  {step.text}
                </span>

                {completed && (
                  <span className="ml-auto text-green-400">
                    ✓
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-[var(--gold)] transition-all duration-700"
            style={{
              width: `${(active / steps.length) * 100}%`,
            }}
          />
        </div>

        <p className="mt-5 text-center text-xs tracking-[0.18em] text-white/50 uppercase">
          Karnataka Police Crime Intelligence Platform
        </p>
      </div>
    </div>
  );
}