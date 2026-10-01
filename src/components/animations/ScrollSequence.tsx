"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import FadeUp from "./FadeUp";

/* ─── constants ─── */
const FRAME_COUNT = 240;
const PRELOAD_STRIDE = 8; // load every 8th frame first
const frameSrc = (i: number) =>
  `/assets/animasi-tennis/ezgif-frame-${String(i + 1).padStart(3, "0")}.webp`;
const SCROLL_DISTANCE_VH = 200; // scroll runway for the animation
const WRAPPER_HEIGHT_VH = 100 + SCROLL_DISTANCE_VH; // viewport + runway
const CANVAS_END = 0.80;
const CANVAS_FADE_START = 0.65;
const CANVAS_FADE_END = 0.80;
const COURT_FADE_START = 0.75;
const COURT_FADE_END = 1.0;

// Lerp factor per frame — higher = snappier, lower = smoother
const LERP_FACTOR = 0.10;

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/* ─── shared court content ─── */

function TennisContent() {
  return (
    <div className="tennis-grid grid md:grid-cols-2 gap-10 lg:gap-20 max-w-7xl w-full items-center">
      <div className="flex flex-col justify-center gap-6 text-left">
        <h2 className="h1 max-w-4xl">STAYING SANE ON THE COURT.</h2>
        <p className="hero-lead max-w-3xl">
          When the code gets too loud, I find clarity at the baseline. Much
          like engineering, tennis is a game of footwork, focus, and strategic
          angles. It&apos;s my favorite way to trade screen time for court time and
          reset the system before the next deployment.
        </p>
        <div className="pt-2">
          <a
            href="https://www.instagram.com/rakhabas"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary inline-flex items-center gap-2 w-fit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            Let&apos;s hit the court 🎾
          </a>
        </div>
      </div>

      <div className="tennis-image relative aspect-[2/3] w-full max-w-[320px] md:max-w-md mx-auto md:ml-auto border-4 border-paper shadow-[8px_8px_0_#d7ff3f] bg-ink">
        <Image
          src="/assets/tennis/tennis-art.jpg"
          alt="Tennis Art"
          fill
          sizes="(min-width: 768px) 28rem, 320px"
          className="object-cover"
        />
      </div>
    </div>
  );
}

/* ─── desktop: JS-managed pinned scroll timeline ─── */

type PinState = "before" | "pinned" | "after";

function DesktopScrollSequence() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasLayerRef = useRef<HTMLDivElement>(null);
  const courtLayerRef = useRef<HTMLDivElement>(null);
  const currentFrameRef = useRef(0);
  const rafRef = useRef(0);
  const lerpRafRef = useRef(0);
  const pinRef = useRef<PinState>("before");

  // Raw scroll progress (0→1) set by scroll handler
  const targetProgressRef = useRef(0);
  // Smoothed progress used for rendering
  const smoothProgressRef = useRef(0);

  const [images, setImages] = useState<HTMLImageElement[]>([]);

  /* ── draw a single canvas frame ── */
  const drawFrame = useCallback(
    (imgs: HTMLImageElement[], index: number) => {
      if (!canvasRef.current || imgs.length === 0) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const ci = Math.max(0, Math.min(index, imgs.length - 1));
      let img = imgs[ci];

      if (!img?.complete || img.naturalWidth === 0) {
        for (let off = 1; off < imgs.length; off += 1) {
          const prev = imgs[ci - off];
          const next = imgs[ci + off];
          if (prev?.complete && prev.naturalWidth > 0) {
            img = prev;
            break;
          }
          if (next?.complete && next.naturalWidth > 0) {
            img = next;
            break;
          }
        }
      }

      if (!img?.complete || img.naturalWidth === 0) return;

      // Only resize canvas when viewport dimensions actually change
      const needsResize =
        canvas.width !== window.innerWidth ||
        canvas.height !== window.innerHeight;

      if (needsResize) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      const drawHeight =
        canvasRatio > imgRatio ? canvas.height : canvas.width / imgRatio;
      const drawWidth =
        canvasRatio > imgRatio ? canvas.height * imgRatio : canvas.width;
      const offsetX = (canvas.width - drawWidth) / 2;
      const offsetY = (canvas.height - drawHeight) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    },
    []
  );

  /* ── draw canvas for a given frame progress 0→1 ── */
  const drawFrameForProgress = useCallback(
    (imgs: HTMLImageElement[], frameProgress: number) => {
      if (imgs.length === 0) return;

      const clamped = clamp(frameProgress, 0, 1);
      const frameIndex = Math.max(
        0,
        Math.min(
          FRAME_COUNT - 1,
          Math.floor(clamped * (FRAME_COUNT - 1))
        )
      );

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        drawFrame(imgs, frameIndex);
      }
    },
    [drawFrame]
  );

  /* ── apply pin state to stage DOM element ── */
  const applyPinState = useCallback((state: PinState) => {
    const stage = stageRef.current;
    if (!stage) return;

    if (state === "pinned") {
      stage.style.position = "fixed";
      stage.style.top = "0";
      stage.style.bottom = "";
      stage.style.left = "0";
      stage.style.width = "100%";
      stage.style.height = "100vh";
      stage.style.zIndex = "2";
    } else if (state === "after") {
      stage.style.position = "absolute";
      stage.style.top = "";
      stage.style.bottom = "0";
      stage.style.left = "0";
      stage.style.width = "100%";
      stage.style.height = "100vh";
      stage.style.zIndex = "";
    } else {
      stage.style.position = "relative";
      stage.style.top = "";
      stage.style.bottom = "";
      stage.style.left = "";
      stage.style.width = "100%";
      stage.style.height = "100vh";
      stage.style.zIndex = "";
    }
  }, []);

  /* ── update layer opacities / transforms directly on DOM ── */
  const updateVisuals = useCallback((p: number) => {
    const canvasOp =
      p <= CANVAS_FADE_START
        ? 1
        : p >= CANVAS_FADE_END
          ? 0
          : 1 - (p - CANVAS_FADE_START) / (CANVAS_FADE_END - CANVAS_FADE_START);

    const courtOp =
      p <= COURT_FADE_START
        ? 0
        : p >= COURT_FADE_END
          ? 1
          : (p - COURT_FADE_START) / (COURT_FADE_END - COURT_FADE_START);

    const canvasLayer = canvasLayerRef.current;
    const courtLayer = courtLayerRef.current;

    if (canvasLayer) {
      canvasLayer.style.opacity = String(canvasOp.toFixed(4));
      canvasLayer.style.visibility = canvasOp > 0.001 ? "visible" : "hidden";
    }

    if (courtLayer) {
      courtLayer.style.opacity = String(courtOp.toFixed(4));
      courtLayer.style.visibility = courtOp > 0.001 ? "visible" : "hidden";
      courtLayer.style.pointerEvents = courtOp > 0.95 ? "auto" : "none";
      // Smooth eased translate: starts 36px down, eases to 0
      const translateY = (1 - courtOp) * 36;
      courtLayer.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`;
    }
  }, []);

  /* ── load image sequence once the section is near the viewport ── */
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || images.length > 0) return;

    // Hidden on mobile (display: none) → never intersects → never loads.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const loadedImages = Array.from({ length: FRAME_COUNT }, () => document.createElement("img"));

        // Every Nth frame first so scrubbing works early, then fill the gaps.
        const order = [
          ...Array.from({ length: FRAME_COUNT }, (_, i) => i).filter((i) => i % PRELOAD_STRIDE === 0),
          ...Array.from({ length: FRAME_COUNT }, (_, i) => i).filter((i) => i % PRELOAD_STRIDE !== 0),
        ];

        for (const i of order) {
          const img = loadedImages[i];
          // Redraw as frames arrive so the canvas upgrades from the nearest loaded frame.
          // No-op after unmount: drawFrame bails when canvasRef is null.
          img.onload = () => drawFrame(loadedImages, currentFrameRef.current);
          img.src = frameSrc(i);
        }

        setImages(loadedImages);
      },
      { rootMargin: "200% 0px" }
    );

    observer.observe(wrapper);

    return () => observer.disconnect();
  }, [drawFrame, images.length]);

  /* ── scroll-driven progress + pin state ── */
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || images.length === 0) return;

    const computeTarget = () => {
      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollDistance = wrapper.offsetHeight - vh;

      if (scrollDistance <= 0) return;

      let nextPin: PinState;
      let nextProgress: number;

      if (rect.top >= 0) {
        nextPin = "before";
        nextProgress = 0;
      } else if (rect.bottom <= vh) {
        nextPin = "after";
        nextProgress = 1;
      } else {
        nextPin = "pinned";
        nextProgress = clamp(-rect.top / scrollDistance, 0, 1);
      }

      if (nextPin !== pinRef.current) {
        pinRef.current = nextPin;
        applyPinState(nextPin);
      }

      targetProgressRef.current = nextProgress;
    };

    // Lerp render loop — runs every frame while pinned
    const renderLoop = () => {
      lerpRafRef.current = requestAnimationFrame(renderLoop);

      const target = targetProgressRef.current;
      const current = smoothProgressRef.current;
      const delta = target - current;

      // Skip tiny updates to avoid unnecessary DOM writes
      if (Math.abs(delta) < 0.0001) return;

      const next = lerp(current, target, LERP_FACTOR);
      smoothProgressRef.current = next;

      updateVisuals(next);
      drawFrameForProgress(images, clamp(next / CANVAS_END, 0, 1));
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(computeTarget);
    };

    // Initial computation
    computeTarget();

    // Start lerp loop
    lerpRafRef.current = requestAnimationFrame(renderLoop);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(lerpRafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [images, drawFrameForProgress, updateVisuals, applyPinState]);

  return (
    <div
      ref={wrapperRef}
      className="tennis-desktop-sequence relative hidden md:block"
      style={{ height: `${WRAPPER_HEIGHT_VH}vh`, background: "#0d0d0d" }}
      id="sequence"
    >
      {/* Stage — switches between relative / fixed / absolute via JS */}
      <div
        ref={stageRef}
        className="overflow-hidden"
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          background: "#0d0d0d",
        }}
      >
        {/* Canvas layer — tennis ball animation */}
        <div
          ref={canvasLayerRef}
          className="absolute inset-0"
          style={{ opacity: 1, visibility: "visible", willChange: "opacity" }}
        >
          {/* Static first frame under the canvas — visible until the canvas draws over it.
              Raw <img> on purpose: next/image would re-encode the lossless frame. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={frameSrc(0)}
            loading="lazy"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 block h-full w-full"
          />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,#0d0d0d_100%)]" />
        </div>

        {/* Court content layer — "STAYING SANE ON THE COURT." */}
        <div
          ref={courtLayerRef}
          className="absolute inset-0"
          style={{
            opacity: 0,
            visibility: "hidden",
            pointerEvents: "none",
            background: "#0d0d0d",
            transform: "translate3d(0, 36px, 0)",
            willChange: "opacity, transform",
          }}
        >
          <div className="section-pad h-full">
            <TennisContent />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── mobile fallback ─── */

function MobileTennisFallback() {
  return (
    <section
      className="tennis-mobile-fallback tennis-section section-pad bg-ink block md:hidden"
      id="sequence-mobile"
    >
      <FadeUp>
        <TennisContent />
      </FadeUp>
    </section>
  );
}

/* ─── export ─── */

// Both render; CSS shows one per breakpoint.
export default function ScrollSequence() {
  return (
    <>
      <DesktopScrollSequence />
      <MobileTennisFallback />
    </>
  );
}
