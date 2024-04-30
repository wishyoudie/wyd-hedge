type Props = {
  color: string;
  size?: number;
};

export default function ColorCircle(props: Props) {
  const size = props.size ?? 40;
  return (
    <span
      className="rounded-full"
      style={{ height: size, width: size, background: props.color }}
    />
  );
}
