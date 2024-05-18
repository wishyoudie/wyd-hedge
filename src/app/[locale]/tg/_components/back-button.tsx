"use client";

import { useBackButton } from "@tma.js/sdk-react";
import { useRouter } from "@/navigation";
import { useEffect } from "react";

type BackButtonProps =
  | {
      hide: true;
    }
  | {
      hide?: false;
      to: string | -1;
    };

function SetupBackButton({ to }: { to: string | -1 }) {
  const bb = useBackButton();
  const router = useRouter();

  useEffect(() => {
    const onClick = () => (to === -1 ? router.back() : router.push(to));

    bb.on("click", onClick);
    bb.show();

    return () => {
      bb.off("click", onClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

function HideBackButton() {
  const bb = useBackButton();

  useEffect(() => {
    bb.hide();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default function BackButton(props: BackButtonProps) {
  if (props.hide) {
    return <HideBackButton />;
  } else {
    return <SetupBackButton to={props.to} />;
  }
}
