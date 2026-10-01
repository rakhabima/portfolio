"use client";

import { useEffect } from "react";
import Lenis from "lenis";

let lenis: Lenis | null = null;

// Scroll through Lenis once it is mounted, otherwise jump natively.
export function scrollToId(id: string) {
  const target = id === "top" ? 0 : document.getElementById(id);
  if (target === null) return;

  if (lenis) {
    lenis.scrollTo(target);
  } else if (typeof target === "number") {
    window.scrollTo({ top: target });
  } else {
    target.scrollIntoView();
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    lenis = new Lenis({
      // Light smoothing: follows the wheel closely instead of gliding a whole section.
      // Raise toward 0.2 for snappier, lower toward 0.05 for floatier.
      lerp: 0.15,
      autoRaf: true,
    });

    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return null;
}
