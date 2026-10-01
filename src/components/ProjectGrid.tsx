"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { projects } from "@/data/portfolio";
import FadeUp from "./animations/FadeUp";

type Project = (typeof projects)[number];

export default function ProjectGrid() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Project | null>(null);
  const [slide, setSlide] = useState(0);

  function open(project: Project) {
    setActive(project);
    setSlide(0);
    dialogRef.current?.showModal();
  }

  function go(step: number) {
    const track = trackRef.current;
    track?.scrollBy({ left: step * track.clientWidth, behavior: "smooth" });
  }

  return (
    <>
      <div className="project-grid">
        {projects.map((project, index) => (
          <FadeUp delay={index * 0.15} key={project.title}>
            <button type="button" className="project-card" onClick={() => open(project)}>
              <h3>{project.title}</h3>
              <p className="project-type">{project.type}</p>
              <p>{project.description}</p>
              <div className="project-specs">
                <div>
                  <span>Role</span>
                  <p>{project.role}</p>
                </div>
                <div>
                  <span>Stack / Focus</span>
                  <p>{project.stack}</p>
                </div>
                <div>
                  <span>Built For</span>
                  <p>{project.focus.join(" · ")}</p>
                </div>
              </div>
              <p className="project-line">{project.line}</p>
              <span className="project-open">
                VIEW_DETAILS
                <ArrowUpRight size={16} />
              </span>
            </button>
          </FadeUp>
        ))}
      </div>

      {/* Native <dialog>: Esc to close, focus handled by the browser.
          data-lenis-prevent lets the modal scroll natively instead of the page. */}
      <dialog
        ref={dialogRef}
        className="project-modal"
        data-lenis-prevent
        onClose={() => setActive(null)}
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
        aria-labelledby="project-modal-title"
      >
        {active && (
          <div className="project-modal-body">
            <button
              type="button"
              className="project-modal-close"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <p className="section-kicker">{active.number}</p>
            <h3 id="project-modal-title">{active.title}</h3>
            <p className="project-type">{active.type}</p>
            <p className="text-paper/80 leading-relaxed">{active.description}</p>

            {active.images.length ? (
              <div className="project-modal-slides">
                {/* Native scroll-snap: swipe on touch, buttons on desktop */}
                <div
                  ref={trackRef}
                  className="project-modal-track"
                  onScroll={(e) =>
                    setSlide(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))
                  }
                >
                  {active.images.map((src, i) => (
                    <figure className="project-modal-media" key={src}>
                      <Image
                        src={src}
                        alt={`${active.title} screenshot ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 720px"
                      />
                    </figure>
                  ))}
                </div>
                {active.images.length > 1 && (
                  <div className="project-modal-slide-nav">
                    <button type="button" onClick={() => go(-1)} disabled={slide === 0} aria-label="Previous image">
                      <ChevronLeft size={18} />
                    </button>
                    <span>
                      {slide + 1} / {active.images.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      disabled={slide === active.images.length - 1}
                      aria-label="Next image"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <figure className="project-modal-media">
                <span>IMAGE_COMING_SOON</span>
              </figure>
            )}

            <div className="project-modal-grid">
              <section>
                <p className="modal-label">ROLE</p>
                <p className="font-bold">{active.role}</p>
              </section>

              <section>
                <p className="modal-label">STACK</p>
                <div className="flex flex-wrap gap-3">
                  {active.stack.split(" · ").map((tech) => (
                    <span className="tech-pill" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <p className="modal-label">WHAT_I_BUILT</p>
                <ul className="flex flex-col gap-2">
                  {active.details.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-paper/90 leading-snug">
                      <Play size={10} className="text-[#d7ff3f] mt-1.5 shrink-0" fill="currentColor" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="project-modal-links">
              {active.links.map((link, i) => (
                <a
                  key={link.label}
                  className={`btn ${i === 0 ? "btn-primary" : "btn-secondary"}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                  <ArrowUpRight size={16} />
                </a>
              ))}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
