export default function Badge({
  text,
}: {
  text: string;
}) {
  return (
    <span className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white">
      {text}
    </span>
  );
}