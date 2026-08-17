export function Logo({ size = 30 }: { size?: number }) {
  return (
    <span
      className="relative inline-block flex-none rounded-full"
      style={{
        width: size,
        height: size,
        background: "radial-gradient(circle at 32% 30%,#22C55E,#12833C)",
        boxShadow: "0 4px 12px rgba(22,163,74,.3)",
      }}
    >
      <span
        className="absolute rounded-full border-2 border-white bg-orange-500"
        style={{
          right: -2,
          bottom: -1,
          width: size * 0.4,
          height: size * 0.4,
        }}
      />
    </span>
  );
}
