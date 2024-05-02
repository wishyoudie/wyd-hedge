import { useCallback, useState } from "react";

export const useCenteredTree = (): [
  { width: number; height: number } | undefined,
  { x: number; y: number },
  (containerElem: HTMLElement | null) => void,
] => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>();

  const containerRef = useCallback((containerElem: HTMLElement | null) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setDimensions({ width, height });
      setTranslate({ x: width / 2, y: height / 2 });
    }
  }, []);

  return [dimensions, translate, containerRef];
};
