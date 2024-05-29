"use client";

import { Button } from "@/components/ui/button";
import { createTransaction } from "@/server/actions";
import { useFormStatusToast } from "@/shared/hooks/useFormStatusToast";
import { useFormState, useFormStatus } from "react-dom";
import InputName from "./(inputs)/input-name";
import type { PropsWithChildren } from "react";
import SelectType from "./(inputs)/select-type";

const initialState = {
  message: null,
  ok: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending} disabled={pending} size="lg">
      Submit
    </Button>
  );
}

export default function NewTransactionForm({ children }: PropsWithChildren) {
  const [state, dispatch] = useFormState(createTransaction, initialState);

  useFormStatusToast({ state: state, redirect: true });

  return (
    <form action={dispatch} className="grid gap-4 lg:gap-8">
      <div className="grid gap-4 lg:grid-cols-3 lg:gap-8">
        <InputName className="col-span-3 lg:col-span-2" />
        <SelectType className="col-span-3 lg:col-span-1" />
        {children}
      </div>
      <SubmitButton />
    </form>
  );
}
