interface SectionTitleProps {
  label: string;
  title: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionTitle({ label, title, centered = false, light = false }: SectionTitleProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <span className={`text-label font-body font-semibold uppercase tracking-[3px] ${light ? "text-black" : "text-accent"}`}>
        {label}
      </span>
      <h2 className={`font-heading text-display mt-2 font-light ${light ? "text-black" : "text-[var(--text-primary)]"}`}>
        {title}
      </h2>
    </div>
  );
}
