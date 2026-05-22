"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const stackRowTop = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "NestJS",
  "Python",
  "Java",
  "C#",
  "Flutter",
  "PostgreSQL",
  "Docker",
  "Git"
];

const stackRowBottom = [
  "MongoDB",
  "Prisma",
  "OracleDB",
  ".NET",
  "OpenClaw",
  "Antigravity",
  "Claude Code",
  "Codex",
  "OpenAI API",
  "n8n",
  "Data Vault",
  "AI Agents",
  "Tableau",
  "Power BI",
  "Cloudinary",
  "WordPress"
];

function TechGroup({ items }: { items: string[] }) {
  return (
    <div className="tech-marquee-group">
      {items.map((item) => (
        <span className="tech-pill" key={item}>
          {item}
        </span>
      ))}
    </div>
  );
}

export default function TechMarquee() {
  const [isVibe, setIsVibe] = useState(false);

  return (
    <div className="tech-marquee" aria-label="Technology stack">
      <div className="tech-marquee-copy select-none">
        <AnimatePresence mode="wait">
          <motion.h3
            key={isVibe ? "vibe" : "skill"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsVibe(!isVibe)}
            className="cursor-pointer w-fit"
          >
            {isVibe ? "I'M A VIBECODER🤪" : "MY SKILLSET"}
          </motion.h3>
        </AnimatePresence>
      </div>

      <div className="tech-marquee-rows">
        <div className="tech-marquee-row top" aria-label={stackRowTop.join(", ")}>
          <div className="tech-marquee-track">
            <TechGroup items={stackRowTop} />
            <TechGroup items={stackRowTop} />
          </div>
        </div>

        <div className="tech-marquee-row bottom" aria-label={stackRowBottom.join(", ")}>
          <div className="tech-marquee-track">
            <TechGroup items={stackRowBottom} />
            <TechGroup items={stackRowBottom} />
          </div>
        </div>
      </div>
    </div>
  );
}
