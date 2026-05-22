"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/#top" },
  { label: "Work", href: "/#work" },
  { label: "Journey", href: "/#experience" }
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMenuOpen(false); // Close menu on click
    if (href.startsWith("/#")) {
      e.preventDefault();
      const id = href.replace("/#", "");
      if (id === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", "/");
      } else {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", `#${id}`);
        }
      }
    }
  };

  return (
    <header className="site-header">
      <div className="site-header-inner relative">
        <div className="flex justify-start">
          <Link className="brand" href="/#top" onClick={(e) => handleScroll(e, "/#top")}>
            <span>RAKHBIM</span>
          </Link>
        </div>
        
        {/* Desktop Nav */}
        <nav className="site-nav hidden md:flex">
          {navItems.map((item) => (
            <Link 
              className="nav-link" 
              href={item.href} 
              key={item.label}
              onClick={(e) => handleScroll(e, item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex justify-end items-center gap-3">
          <Link className="nav-hire hidden md:flex" href="/#contact" onClick={(e) => handleScroll(e, "/#contact")}>
            LET&apos;S TALK
          </Link>
          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle md:hidden flex items-center justify-center text-[#f4f1ea] p-1 border-2 border-[#f4f1ea] bg-[#191919]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      <div
        className={`mobile-menu md:hidden absolute top-full left-0 w-full bg-[#0d0d0d] border-b border-[#f4f1ea] p-4 flex flex-col gap-4 shadow-[0_10px_0_#00f5ff] z-50 ${
          isMenuOpen ? "is-open" : ""
        }`}
        id="mobile-menu"
        aria-hidden={!isMenuOpen}
      >
        {navItems.map((item) => (
          <Link
            className="font-black text-lg uppercase tracking-wider text-[#f4f1ea] hover:text-[#00f5ff] transition-colors"
            href={item.href}
            key={item.label}
            onClick={(e) => handleScroll(e, item.href)}
            tabIndex={isMenuOpen ? 0 : -1}
          >
            {item.label}
          </Link>
        ))}
        <Link
          className="font-black text-lg uppercase tracking-wider text-[#00f5ff] hover:text-[#ff4fea] transition-colors mt-2"
          href="/#contact"
          onClick={(e) => handleScroll(e, "/#contact")}
          tabIndex={isMenuOpen ? 0 : -1}
        >
          LET&apos;S TALK
        </Link>
      </div>
    </header>
  );
}
