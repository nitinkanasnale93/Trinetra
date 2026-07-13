type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function SectionTitle({
  eyebrow,
  title,
  description,
}: SectionTitleProps) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
          {eyebrow}
        </p>
      )}

      <h2 className="mt-2 text-4xl font-medium tracking-[-0.04em] text-[var(--navy)]">
        {title}
      </h2>

      {description && (
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[var(--text-secondary)]">
          {description}
        </p>
      )}
    </div>
  );
}