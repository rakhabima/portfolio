import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { SVGProps } from "react";
import { projects } from "@/data/portfolio";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionTitle from "@/components/SectionTitle";
import ContactForm from "@/components/ContactForm";
import TechMarquee from "@/components/TechMarquee";
import FadeUp from "@/components/animations/FadeUp";
import ScrollSequence from "@/components/animations/ScrollSequence";
import Experience from "@/components/Experience";

function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M15.46 3c.34 2.74 1.89 4.38 4.54 4.56v3.05a7.74 7.74 0 0 1-4.49-1.43v6.18c0 3.86-3.18 6.64-6.93 6.64A6.57 6.57 0 0 1 2 15.41c0-3.72 2.92-6.41 6.48-6.41.29 0 .57.02.85.07v3.17a4.9 4.9 0 0 0-.85-.08 3.25 3.25 0 0 0-3.33 3.27 3.37 3.37 0 0 0 3.5 3.42c1.9 0 3.51-1.22 3.51-3.81V3h3.3Z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.9A3.85 3.85 0 0 0 3.9 7.75v8.5A3.85 3.85 0 0 0 7.75 20.1h8.5a3.85 3.85 0 0 0 3.85-3.85v-8.5A3.85 3.85 0 0 0 16.25 3.9h-8.5ZM17.3 5.35a1.35 1.35 0 1 1 0 2.7 1.35 1.35 0 0 1 0-2.7ZM12 6.85A5.15 5.15 0 1 1 6.85 12 5.16 5.16 0 0 1 12 6.85Zm0 1.9A3.25 3.25 0 1 0 15.25 12 3.25 3.25 0 0 0 12 8.75Z" />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5A1.98 1.98 0 1 1 3 5.48 1.98 1.98 0 0 1 4.98 3.5ZM3.27 8.25h3.42V21H3.27ZM9.4 8.25h3.28v1.74h.05c.46-.87 1.57-1.79 3.23-1.79 3.46 0 4.1 2.28 4.1 5.24V21h-3.42v-6.63c0-1.58-.03-3.61-2.2-3.61-2.2 0-2.53 1.72-2.53 3.5V21H9.4Z" />
    </svg>
  );
}

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.65.5.5 5.66.5 12.03c0 5.1 3.3 9.42 7.88 10.95.58.11.79-.25.79-.56 0-.28-.01-1.2-.02-2.17-3.2.7-3.88-1.37-3.88-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.73.08-.71.08-.71 1.16.08 1.76 1.2 1.76 1.2 1.03 1.78 2.7 1.27 3.36.97.1-.75.4-1.27.72-1.56-2.55-.29-5.24-1.29-5.24-5.74 0-1.27.45-2.31 1.19-3.13-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.19 1.2a10.9 10.9 0 0 1 5.8 0c2.22-1.51 3.19-1.2 3.19-1.2.63 1.6.23 2.78.11 3.07.74.82 1.19 1.86 1.19 3.13 0 4.46-2.69 5.44-5.26 5.73.41.36.78 1.08.78 2.18 0 1.57-.01 2.83-.01 3.22 0 .31.21.68.8.56A11.54 11.54 0 0 0 23.5 12.03C23.5 5.66 18.35.5 12 .5Z" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-ink text-paper">
      <Header />
      
      <section className="hero-grid section-pad !pb-6 lg:!pb-10" id="top">
        <div className="hero-copy">
          <FadeUp delay={0.1}>
            <h1>FROM MESSY WORKFLOWS TO USABLE PRODUCTS.</h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="hero-lead">
              Scaling businesses through custom web apps, internal tools, and AI automation.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="hero-support">
              I&apos;m Rakha Bima, an AI Software Engineer and IS major at Universitas Indonesia. I help businesses stop fighting their own workflows by engineering custom web apps and AI agents that actually do the heavy lifting for them.
            </p>
          </FadeUp>
          <FadeUp delay={0.4}>
            <div className="flex flex-wrap gap-4">
              <Link className="btn btn-primary" href="#work">
                VIEW_SELECTED_WORK
                <ArrowUpRight size={18} />
              </Link>
              <Link className="btn btn-secondary" href="#contact">
                START_A_PROJECT
              </Link>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.3} className="relative w-full aspect-[4/5] max-w-[300px] mx-auto lg:max-w-[380px] xl:max-w-[420px] border-[3px] border-[#f4f1ea] shadow-[10px_10px_0_#00f5ff] bg-[#191919] p-2">
          <div className="relative w-full h-full overflow-hidden border border-[#f4f1ea]/50">
            <Image
              src="/assets/hero/hero_dark.jpg"
              alt="Rakha Bima"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </FadeUp>

        <FadeUp delay={0.5} className="hero-meta">
          <span>AI_ENGINEERING / FULL-STACK_DEV / AGENTIC_WORKFLOWS</span>
          <span>BASED_IN_JAKARTA</span>
        </FadeUp>
      </section>

      <section className="section-pad !pt-6 lg:!pt-10" id="work">
        <FadeUp className="section-headline">
          <SectionTitle eyebrow="ENGINEERED & DEPLOYED WORKS" />
        </FadeUp>

        <div className="project-grid">
          {projects.map((project, index) => (
            <FadeUp delay={index * 0.15} key={project.title}>
              <article className="project-card">
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
              </article>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.2} id="stack">
          <TechMarquee />
        </FadeUp>
      </section>

      <Experience />

      <ScrollSequence />



      <section className="contact section-pad" id="contact">
        <FadeUp className="contact-copy mb-12">
          <SectionTitle
            eyebrow="BUILD_WITH_ME"
            title="HAVE A PROJECT THAT NEEDS TO BE BUILT?"
          />
          <p className="mt-6 text-paper/70 text-lg max-w-2xl">
            I&apos;m open to freelance projects, engineering collaborations, and AI automation opportunities.
          </p>
          <p className="mt-4 font-bold text-[#00f5ff] uppercase">LET&apos;S SHIFT FROM IDEA TO PRODUCTION.</p>
          <div className="contact-socials" aria-label="Social links">
            <Link
              className="contact-social"
              href="https://www.instagram.com/rakhabas"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-[18px] w-[18px]" />
            </Link>
            <Link
              className="contact-social"
              href="https://www.tiktok.com/@rakhabas"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
            >
              <TikTokIcon className="h-[18px] w-[18px]" />
            </Link>
            <Link
              className="contact-social"
              href="https://www.linkedin.com/in/rakhabimaaryasambarana/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="h-[18px] w-[18px]" />
            </Link>
            <Link
              className="contact-social"
              href="https://github.com/rakhabima"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <GitHubIcon className="h-[18px] w-[18px]" />
            </Link>
          </div>
        </FadeUp>
        <FadeUp delay={0.2}>
          <ContactForm />
        </FadeUp>
      </section>

      <Footer />
    </main>
  );
}
