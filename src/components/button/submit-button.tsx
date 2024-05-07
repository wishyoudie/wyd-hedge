"use client";

import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "../ui/button";
import type { MouseEvent } from "react";

export function SubmitButton(props: ButtonProps) {
  const { pending } = useFormStatus();

  const onClickCallback = (e: MouseEvent<HTMLButtonElement>) => {
    !pending && props.onClick && props.onClick(e);
  };

  return (
    <Button
      type="submit"
      disabled={pending}
      {...props}
      onClick={onClickCallback}
    />
  );
}
