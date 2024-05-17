"use client";

import type { Attributes } from "./types";

type Props = {
  name: string;
  attributes: Attributes;
  onClick?: (id: number) => void;
  className?: string;
};

export default function TreeItemView(props: Props) {
  const attributes = props.attributes as { id: number; isRoot: boolean };

  if (attributes.isRoot) {
    return (
      <div
        className={`rounded-xl bg-primary py-3 text-center text-primary-foreground shadow transition-colors`}
      >
        <h3 className="font-medium">All</h3>
      </div>
    );
  }

  const handleClick = () => {
    props.onClick && props.onClick(attributes.id);
  };

  return (
    <div
      className={`rounded-xl border border-input bg-background py-3 text-center shadow-sm transition-colors hover:bg-accent ${props.className}`}
      onClick={handleClick}
    >
      <h3 className="font-medium">{props.name}</h3>
    </div>
  );
}
