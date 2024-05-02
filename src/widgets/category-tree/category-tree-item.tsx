type Props = {
  name: string;
  attributes: Record<string, string | number | boolean> | undefined;
};

export default function CategoryTreeItem(props: Props) {
  return (
    <div className="rounded-xl border border-input bg-background py-3 text-center shadow-sm transition-all hover:bg-accent hover:text-accent-foreground">
      <h3 className="font-medium">{props.name}</h3>
    </div>
  );
}
