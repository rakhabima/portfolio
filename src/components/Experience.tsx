"use client";

import FadeUp from "./animations/FadeUp";
import { Play } from "lucide-react";

const professionalExperience = [
  {
    role: "Data Engineer Intern",
    company: "Central Bank of Indonesia (DIDD)",
    period: "JUL 2025 - SEP 2025",
    location: "JAKARTA, ID",
    bullets: [
      "Engineered a web-based internal interface to replace manual database queries for data vault configuration, reducing operator friction.",
      "Developed a centralized dashboard to provide real-time visibility into complex data tables and configuration records across teams.",
      "Implemented structured input forms with custom validation logic to improve configuration accuracy and eliminate data entry errors."
    ],
    theme: {
      text: "text-[#FF6B00]",
      borderHover: "hover:border-[#FF6B00]",
      shadow: "shadow-[6px_6px_0_#FF6B00]",
      shadowHover: "hover:shadow-[3px_3px_0_#FF6B00]"
    }
  },
  {
    role: "Freelance Web Developer",
    company: "Independent Projects",
    period: "JAN 2023 - PRESENT",
    bullets: [
      "Delivered production-ready web applications for SMEs, spanning operational tools, e-commerce stores, and donation platforms.",
      "Built and deployed an inventory and sales recording system currently utilized in active business operations.",
      "Developed responsive, SEO-optimized applications using Next.js and the MERN stack to meet diverse client requirements."
    ],
    theme: {
      text: "text-[#00FF6B]",
      borderHover: "hover:border-[#00FF6B]",
      shadow: "shadow-[6px_6px_0_#00FF6B]",
      shadowHover: "hover:shadow-[3px_3px_0_#00FF6B]"
    }
  }
];

const otherExperiences = [
  {
    role: "Information Systems Student",
    company: "Universitas Indonesia (Fasilkom)",
    period: "2022 - 2026 (EXPECTED)",
    bullets: [
      "Maintaining a 3.14 GPA while specializing in full-stack web development and data engineering.",
      "Currently developing a thesis focused on user intention factors within job portal platforms in Indonesia.",
      "Relevant Coursework: Web Development, Database Systems, Systems Analysis & Design, and Data Structures & Algorithms."
    ],
    theme: {
      text: "text-[#6B00FF]",
      borderHover: "hover:border-[#6B00FF]",
      shadow: "shadow-[6px_6px_0_#6B00FF]",
      shadowHover: "hover:shadow-[3px_3px_0_#6B00FF]"
    }
  }
];

export default function Experience() {
  return (
    <section className="experience-section section-pad bg-ink min-h-screen" id="experience">
      <FadeUp className="experience-heading mb-8 pb-4">
        <h1>THE JOURNEY.</h1>
      </FadeUp>

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
        {/* Professional Experience Column */}
        <div>
          <FadeUp delay={0.1}>
            <div className="experience-label inline-block bg-paper text-ink font-black px-2 py-1 text-[10px] sm:text-xs border-2 border-paper shadow-[3px_3px_0_#FF6B00] uppercase tracking-widest mb-4">
              PROFESSIONAL_SYSTEMS
            </div>
          </FadeUp>

          <div className="flex flex-col gap-4">
            {professionalExperience.map((exp, idx) => (
              <FadeUp delay={0.2 + idx * 0.1} key={exp.role}>
                <div className={`experience-card relative p-4 md:p-5 border-[3px] border-paper bg-[#191919] transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] ${exp.theme.shadow} ${exp.theme.shadowHover} ${exp.theme.borderHover}`}>
                  <h3 className="font-black text-lg md:text-xl mb-1 uppercase tracking-tight">{exp.role}</h3>
                  <div className={`${exp.theme.text} text-sm md:text-base font-bold mb-3 uppercase`}>{exp.company}</div>
                  
                  <div className="font-mono text-[10px] sm:text-xs text-paper font-bold tracking-wider mb-4 flex flex-wrap gap-2 items-center">
                    <span className="border-[1.5px] border-paper/40 px-1.5 py-0.5 shadow-[2px_2px_0_rgba(244,241,234,0.4)]">{exp.period}</span>
                    {exp.location && (
                      <span className="border-[1.5px] border-paper/40 px-1.5 py-0.5 shadow-[2px_2px_0_rgba(244,241,234,0.4)]">{exp.location}</span>
                    )}
                  </div>
                  
                  <ul className="flex flex-col gap-2">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-paper/90 leading-snug text-xs sm:text-sm flex items-start gap-2">
                        <Play size={10} className={`${exp.theme.text} mt-0.5 shrink-0`} fill="currentColor" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Other Experiences Column */}
        <div>
          <FadeUp delay={0.3}>
            <div className="experience-label inline-block bg-paper text-ink font-black px-2 py-1 text-[10px] sm:text-xs border-2 border-paper shadow-[3px_3px_0_#6B00FF] uppercase tracking-widest mb-4">
              ACADEMIC_FOUNDATION
            </div>
          </FadeUp>

          <div className="flex flex-col gap-4">
            {otherExperiences.map((exp, idx) => (
              <FadeUp delay={0.4 + idx * 0.1} key={exp.role}>
                <div className={`experience-card relative p-4 md:p-5 border-[3px] border-paper bg-[#191919] transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] ${exp.theme.shadow} ${exp.theme.shadowHover} ${exp.theme.borderHover}`}>
                  <h3 className="font-black text-lg md:text-xl mb-1 uppercase tracking-tight">{exp.role}</h3>
                  <div className={`${exp.theme.text} text-sm md:text-base font-bold mb-3 uppercase`}>{exp.company}</div>
                  
                  <div className="font-mono text-[10px] sm:text-xs text-paper font-bold tracking-wider mb-4 flex flex-wrap gap-2 items-center">
                    <span className="border-[1.5px] border-paper/40 px-1.5 py-0.5 shadow-[2px_2px_0_rgba(244,241,234,0.4)]">{exp.period}</span>
                  </div>
                  
                  <ul className="flex flex-col gap-2">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-paper/90 leading-snug text-xs sm:text-sm flex items-start gap-2">
                        <Play size={10} className={`${exp.theme.text} mt-0.5 shrink-0`} fill="currentColor" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
