import { ButtonHTMLAttributes } from "react";

type PrimaryButtonProps =
  ButtonHTMLAttributes<HTMLButtonElement>;

export default function PrimaryButton({
  children,
  className = "",
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      {...props}
      className={`
        inline-flex
        items-center
        justify-center
        rounded-[var(--radius-md)]
        bg-[var(--navy)]
        px-5
        py-3
        text-sm
        font-medium
        text-white
        shadow-[var(--shadow-sm)]
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-[var(--shadow-md)]
        active:scale-[0.98]
        ${className}
      `}
    >
      {children}
    </button>
  );
}