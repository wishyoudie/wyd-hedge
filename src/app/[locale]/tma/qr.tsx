"use client";

import { useQRScanner } from "@tma.js/sdk-react";
import React from "react";
import { Button } from "@/components/ui/button";

export default function QrScanner() {
  const scanner = useQRScanner();

  const handleOpenClick = () => {
    scanner
      .open("Title")
      .then((value) => {
        alert(value);
      })
      .catch((reason) => {
        alert("Catch " + JSON.stringify(reason));
      });
  };

  return (
    <Button variant="outline" onClick={handleOpenClick}>
      Scan QR
    </Button>
  );
}
