"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  id?: string;
}

// Expo-out curve — fast start, silky deceleration
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function FadeUp({ children, delay = 0, className = "", id }: FadeUpProps) {
  return (
    <motion.div
      id={id}
      className={className}
      style={{ willChange: "opacity, transform" }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
