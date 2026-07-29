export default function Heading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-12 text-center">
      {subtitle && (
        <p className="mb-3 font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
          {subtitle}
        </p>
      )}

      <h2 className="text-4xl font-extrabold lg:text-5xl">
        {title}
      </h2>
    </div>
  );
}