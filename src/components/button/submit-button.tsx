"use client";

import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "../ui/button";
import type { MouseEvent } from "react";
import { toast } from "sonner";

export function SubmitButton(
  props: ButtonProps & {
    toastMessage?: React.ReactNode;
    toastDescription?: React.ReactNode;
  },
) {
  const { pending } = useFormStatus();

  const onClickCallback = (e: MouseEvent<HTMLButtonElement>) => {
    !pending && props.onClick && props.onClick(e);
    props.toastMessage &&
      toast(props.toastMessage, {
        description: props.toastDescription,
      });
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
