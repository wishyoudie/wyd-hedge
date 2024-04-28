"use client";

import {
  type ElementRef,
  useEffect,
  useRef,
  type PropsWithChildren,
} from "react";
import { useRouter } from "~/navigation";
import { createPortal } from "react-dom";

export default function Modal({ children }: PropsWithChildren) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <dialog
      className="h-screen w-screen bg-black/80"
      ref={dialogRef}
      onClose={onDismiss}
    >
      {children}
    </dialog>,
    document.getElementById("modal-root")!,
  );
}
