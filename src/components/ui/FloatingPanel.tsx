import { ReactNode } from "react";

type FloatingPanelProps = {
  children: ReactNode;
  className?: string;
};

export default function FloatingPanel({
  children,
  className = "",
}: FloatingPanelProps) {
  return (
    <div
      className={`
        rounded-[var(--radius-lg)]
        border
        border-[var(--border)]
        bg-white/70
        backdrop-blur-xl
        shadow-[var(--shadow-lg)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}