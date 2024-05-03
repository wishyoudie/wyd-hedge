"use client";

import { isMac } from "~/shared/lib/utils";

export default function Shortcut(props: { letter: string }) {
  return (
    <p className="text-sm text-muted-foreground">
      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
        <span className="text-xs">{isMac() ? "⌘" : "Ctrl+"}</span>
        {props.letter}
      </kbd>
    </p>
  );
}
