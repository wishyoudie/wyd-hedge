"use client";

import Lottie from "lottie-react";
import animationData from "~/../public/static/duck_work.json";

export default function DuckWorkLottie(props: { className?: string }) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center ${props.className}`}
    >
      <Lottie
        animationData={animationData}
        className="flex items-center justify-center"
        loop={true}
      />
    </div>
  );
}
