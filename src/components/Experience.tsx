"use client";

import FadeUp from "./animations/FadeUp";
import { Play } from "lucide-react";
import { professionalExperience, otherExperiences } from "@/data/portfolio";

export default function Experience() {
  return (
    <section className="experience-section section-pad bg-ink min-h-screen" id="experience">
      <FadeUp className="experience-heading mb-8 pb-4">
        <h2 className="h1">THE JOURNEY.</h2>
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
