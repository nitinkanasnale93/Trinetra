type BadgeProps = {
  children: React.ReactNode;
};

export default function Badge({
  children,
}: BadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-[var(--gold-soft)] px-3 py-1 text-xs font-medium text-[var(--gold)]">
      {children}
    </span>
  );
}