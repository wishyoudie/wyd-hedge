"use client";

import ColorCircle from "@/components/ui/color-circle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Settings from "@/shared/lib/settings";
import { useState } from "react";

/**
 * @todo Add premium colors or custom color picker
 */
export default function ColorSelect(props: { defaultValue?: string }) {
  const [value, setValue] = useState<string | undefined>(props.defaultValue);
  return (
    <>
      <ToggleGroup type="single" value={value} onValueChange={setValue}>
        {Settings.colors.map((color) => (
          <ToggleGroupItem value={color} key={color} className="px-1">
            <ColorCircle color={color} size={30} />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <input type="hidden" name="color" value={value} />
    </>
  );
}
