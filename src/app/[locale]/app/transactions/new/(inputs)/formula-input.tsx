"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { calculate } from "@/shared/utils/calculate";
import { useFormatter } from "next-intl";

export default function FormulaInput(props: {
  name?: string;
  className?: string;
  right?: string;
}) {
  const [value, setValue] = useState<string>("");
  const derivedValue = calculate(value);
  const formatter = useFormatter();

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setValue(input);
  };

  return (
    <>
      <div className="relative">
        <Input
          type="text"
          className={props.className}
          value={value}
          onChange={handleUserInputChange}
        />
        <p className="absolute right-3 top-[50%] translate-y-[-50%] text-muted-foreground">
          {derivedValue > 0 && (
            <span>
              ={" "}
              {props.right
                ? formatter.number(derivedValue, {
                    style: "currency",
                    currencyDisplay: "narrowSymbol",
                    currency: props.right,
                  })
                : formatter.number(derivedValue)}
            </span>
          )}
        </p>
      </div>
      <input name={props.name} type="hidden" value={derivedValue} />
    </>
  );
}
