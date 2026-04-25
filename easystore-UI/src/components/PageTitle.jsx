export default function PageTitle({ title, subtitle, eyebrow }) {
  return (
    <div className="text-center mb-8">
      {eyebrow && (
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-coral mb-3">
          {eyebrow}
        </p>
      )}
      <h1 className="font-display text-5xl sm:text-6xl text-ink dark:text-paper leading-[0.95]">
        <span className="italic">{title?.split(" ")[0]}</span>
        {title?.split(" ").length > 1 && (
          <> {title.split(" ").slice(1).join(" ")}</>
        )}
      </h1>
      {subtitle && (
        <p className="font-primary text-base text-sepia dark:text-paper/70 mt-3 max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
