export function Chip({
  active,
  children,
  ...rest
}: { active?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`cursor-pointer whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
        active
          ? "border-transparent bg-forest-800 text-white"
          : "border-black/10 bg-white text-forest-800 hover:bg-green-50"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}
