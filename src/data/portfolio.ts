export const professionalExperience = [
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

export const otherExperiences = [
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

export const projects = [
  {
    number: "PROJECT 001",
    title: "CATET-STOK",
    type: "SMART INVENTORY MANAGER",
    description:
      "An operational management system (MVP) for small-to-medium businesses (UMKM), with a NestJS REST API backend, a mobile-first Next.js frontend, and PostgreSQL managed through Prisma ORM.",
    role: "Full-Stack Developer · Product Architect",
    stack: "Next.js · NestJS · PostgreSQL · Prisma · Docker",
    focus: ["Critical stock alerts", "Sales reporting", "Role-based access control"],
    line: "Turning daily business operations into a cleaner, faster, and more controlled workflow.",
    cta: "VIEW_CASE_STUDY",
    visual: "inventory",
    images: [
      "/assets/project/catet-stok/catet-stok-1.png",
      "/assets/project/catet-stok/catet-stok-2.png",
      "/assets/project/catet-stok/catet-stok-3.png"
    ],
    details: [
      "Designed a multi-tenant database schema covering products, transactions, stock movements, and user roles",
      "Built 20+ REST API endpoints for auth, inventory, transactions, and reporting using NestJS + Prisma",
      "Implemented a stock movement audit trail with automatic adjustment on every transaction",
      "Developed a mobile-first frontend UI with Next.js covering dashboard, products, and transactions",
      "Configured deployment with Docker"
    ],
    links: [{ label: "SOURCE_CODE", href: "https://github.com/rakhabima/catet-stok" }],
    slug: "catet-stok"
  },
  {
    number: "PROJECT 002",
    title: "BOROS LU MISKIN",
    type: "AI-POWERED EXPENSE TRACKER",
    description:
      "A full-stack web app for recording and analyzing personal expenses, built with React + TypeScript, Express.js + Node.js, and PostgreSQL, with Google OAuth authentication and Telegram Bot integration.",
    role: "Full-Stack Developer",
    stack: "React · TypeScript · Express.js · PostgreSQL · Redis · Docker",
    focus: ["AI spending insights", "Telegram Bot input", "Category-based reports"],
    line: "Making personal spending visible, and a little harder to ignore.",
    cta: "VIEW_CASE_STUDY",
    visual: "finance",
    images: [
      "/assets/project/boros-lu-miskin/boros-lu-miskin-1.png",
      "/assets/project/boros-lu-miskin/boros-lu-miskin-2.png"
    ],
    details: [
      "Designed a database schema for expense tracking with category-based grouping",
      "Built a RESTful API with Express.js for expense CRUD and AI-powered spending insights",
      "Implemented Google OAuth 2.0 authentication with Redis-backed session management",
      "Integrated a Telegram Bot for adding expenses via chat with inline keyboard menus",
      "Built a responsive frontend with React and Tailwind CSS",
      "Containerized the full stack using Docker Compose"
    ],
    links: [
      { label: "SOURCE_CODE", href: "https://github.com/rakhabima/Boros-Lu-Miskin" },
      { label: "LIVE_DEMO", href: "https://boros-lu-miskin.vercel.app/" }
    ],
    slug: "boros-lu-miskin"
  },
  {
    number: "PROJECT 003",
    title: "BAS-HIRING",
    type: "RECRUITMENT MANAGEMENT SYSTEM",
    description:
      "An outsourcing recruitment platform built on the MERN stack, connecting candidates, recruiters, coordinators (Korlap), and General Managers in one hiring workflow, from job posting and application to technical tests, interviews, and employee data management.",
    role: "Full-Stack Developer",
    stack: "MongoDB · Express.js · React · Node.js · Railway",
    focus: ["Candidate pipeline", "Role-based access", "Outsourcing requests"],
    line: "One hiring workflow for every role, from application to employee record.",
    cta: "VIEW_CASE_STUDY",
    visual: "hiring",
    // TODO: add screenshots under public/assets/project/bas-hiring/
    images: [] as string[],
    details: [
      "Designed MongoDB data models for users, job postings, applications, interviews, and notifications",
      "Built RESTful APIs for authentication, the candidate pipeline, and outsourcing request management",
      "Implemented role-based access for Admin, Recruiter, Korlap, General Manager, and Candidate",
      "Integrated the frontend with the backend across the full recruitment workflow and deployed on Railway"
    ],
    links: [{ label: "LIVE_DEMO", href: "https://bas-hiring.vercel.app/" }],
    slug: "bas-hiring"
  }
];
