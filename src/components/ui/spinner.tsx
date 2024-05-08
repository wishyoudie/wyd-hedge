const buildLine = (index: number) => {
  const transform = `rotate(${45 * index + (index < 4 ? 180 : -180)}deg)`;
  const animationDelay = `${(1000 * index) / 8 - 1000}ms`;

  return (
    <svg
      key={index}
      className="spinner-line absolute left-0 top-0 size-full"
      viewBox={"0 0 64 64"}
      style={{
        animationDuration: "1s",
        transform,
        animationDelay,
      }}
    >
      <line transform="translate(32,32)" y1={14} y2={26} />
    </svg>
  );
};

export default function Spinner({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={`select-nones relative inline-block size-[${size ?? 28}px] ${className}`}
    >
      {[0, 1, 2, 3, 4, 5, 6, 7].map(buildLine)}
    </span>
  );
}
