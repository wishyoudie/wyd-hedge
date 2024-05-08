"use client";

import {
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

export default function ThemeDropdown() {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenuSubContent>
      <DropdownMenuLabel>Select Theme</DropdownMenuLabel>
      <DropdownMenuRadioGroup value={theme}>
        <DropdownMenuRadioItem value="light" onClick={() => setTheme("light")}>
          Light
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="dark" onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem
          value="system"
          onClick={() => setTheme("system")}
        >
          System
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuSubContent>
  );
}
