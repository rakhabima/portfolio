"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(scrollTop / docHeight);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="scroll-progress-track"
      aria-hidden="true"
    >
      <div
        className="scroll-progress-thumb"
        style={{ height: `${(progress * 100).toFixed(2)}%` }}
      />
    </div>
  );
}
