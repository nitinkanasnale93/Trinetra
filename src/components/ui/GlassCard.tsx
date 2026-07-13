import { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export default function GlassCard({
  children,
  className = "",
}: GlassCardProps) {
  return (
    <div
      className={`
        rounded-[var(--radius-lg)]
        border
        border-[var(--border)]
        bg-white/75
        backdrop-blur-xl
        shadow-[var(--shadow-sm)]
        transition-all
        duration-300
        hover:shadow-[var(--shadow-md)]
        hover:-translate-y-0.5
        ${className}
      `}
    >
      {children}
    </div>
  );
}