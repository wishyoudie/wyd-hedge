"use client";

import { type ReactNode, useState } from "react";
import { Input } from "@/components/ui/input";
import { calculate } from "@/shared/utils/calculate";

export default function FormulaInput(props: {
  name?: string;
  className?: string;
  right?: ReactNode;
}) {
  const [value, setValue] = useState<string>("");
  const derivedValue = calculate(value);

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setValue(input);
  };

  return (
    <>
      <Input
        type="text"
        className={props.className}
        value={value}
        onChange={handleUserInputChange}
      />
      {props.right}
      <input name={props.name} type="hidden" value={derivedValue} />
    </>
  );
}
