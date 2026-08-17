export function PageHeader({
  eyebrow,
  title,
  subcopy,
  className = "",
}: {
  eyebrow: string;
  title: React.ReactNode;
  subcopy?: string;
  className?: string;
}) {
  return (
    <div
      className={`px-6 pt-11 pb-5 bg-[linear-gradient(170deg,#F4FBF6_0%,#FFFFFF_78%)] ${className}`}
    >
      <div className="text-xs font-bold tracking-[0.14em] text-green-600 uppercase">
        {eyebrow}
      </div>
      <h1 className="mt-3 mb-2.5 max-w-2xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] text-balance text-forest-900 sm:text-5xl">
        {title}
      </h1>
      {subcopy && (
        <p className="max-w-2xl text-[16px] leading-relaxed text-pretty text-gray-600">
          {subcopy}
        </p>
      )}
    </div>
  );
}
