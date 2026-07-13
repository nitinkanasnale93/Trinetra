import { ButtonHTMLAttributes } from "react";

type SecondaryButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement>;

export default function SecondaryButton({
  children,
  className = "",
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      {...props}
      className={`
        inline-flex
        items-center
        justify-center
        rounded-[var(--radius-md)]
        border
        border-[var(--border)]
        bg-white/80
        backdrop-blur
        px-5
        py-3
        text-sm
        font-medium
        text-[var(--text-secondary)]
        transition-all
        duration-300
        hover:bg-white
        hover:-translate-y-0.5
        active:scale-[0.98]
        ${className}
      `}
    >
      {children}
    </button>
  );
}