"use client";

import { useState } from "react";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectList,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";

type Props = {
  categories: { label: string; value: string }[];
};

export default function SelectCategory(props: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <>
      <MultiSelect value={selected} onValueChange={setSelected}>
        <MultiSelectTrigger>
          <MultiSelectValue placeholder="Select categories" />
        </MultiSelectTrigger>
        <MultiSelectContent>
          <MultiSelectList>
            <MultiSelectGroup heading="Categories">
              {props.categories.map((cat) => (
                <MultiSelectItem value={cat.value} key={cat.value}>
                  {cat.label}
                </MultiSelectItem>
              ))}
            </MultiSelectGroup>
          </MultiSelectList>
        </MultiSelectContent>
      </MultiSelect>
      <input type="hidden" name="categories" value={selected.join("_")} />
    </>
  );
}
