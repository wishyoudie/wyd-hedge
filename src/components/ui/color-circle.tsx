type Props = {
  color: string | null;
  size?: number;
};

export default function ColorCircle(props: Props) {
  const size = props.size ?? 40;
  return (
    <span
      className="rounded-full border"
      style={{
        height: size,
        width: size,
        background: props.color ?? "var(--muted)",
      }}
    />
  );
}
