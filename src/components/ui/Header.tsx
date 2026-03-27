"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/* ================= ANIMATION ================= */

const menuSlide = {
  initial: { y: "-100%" },
  animate: { y: "0%" },
  exit: { y: "-100%" },
  transition: {
    duration: 0.6,
    ease: [0.76, 0, 0.24, 1] as const,
  },
};

/* ================= COMPONENT ================= */

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ===== SCROLL LOCK ===== */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  /* ===== SCROLL DETECTION ===== */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ===== SMOOTH SCROLL ===== */
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string
  ) => {
    e.preventDefault();

    const el = document.querySelector(target);
    if (!el) return;

    // @ts-ignore (Lenis attached globally)
    window.lenis?.scrollTo(el, {
      offset: -80,
      duration: 1.2,
    });

    setOpen(false);
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        className={`
          fixed inset-x-0 top-0 z-50
          flex items-center justify-between
          px-6 md:px-12 py-5
          transition-colors duration-300
          ${scrolled ? "bg-black/10 backdrop-blur-sm" : "bg-transparent"}
        `}
      >
        {/* LEFT NAV */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-[0.02em]">
          <a
            href="#about"
            onClick={(e) => scrollToSection(e, "#about")}
            className="nav-link"
          >
            ABOUT US
          </a>

          <span className="opacity-40">|</span>

          <a
            href="#work"
            onClick={(e) => scrollToSection(e, "#work")}
            className="nav-link"
          >
            WORK
          </a>
        </nav>

        {/* LOGO */}
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 w-32 h-10 md:w-40 md:h-12">
          <Image
            src="/images/nalogowhite.png"
            alt="Nakshi Agency logo"
            fill
            sizes="(max-width: 768px) 128px, 160px"
            className="object-contain"
            priority
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <button className="cta-btn hidden md:inline-flex tracking-[0.06em]">
            HIRE US
          </button>

          {/* HAMBURGER */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className={`md:hidden flex flex-col gap-1.5 ${
              open ? "menu-open" : ""
            }`}
          >
            <span className="menu-line" />
            <span className="menu-line" />
            <span className="menu-line" />
          </button>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            {...menuSlide}
            className="fixed inset-0 z-40 flex items-center justify-center bg--background)] text--foreground)]"
          >
            <nav className="flex flex-col items-center gap-10 text-3xl font-medium tracking-[0.02em]">
              <a
                href="#about"
                onClick={(e) => scrollToSection(e, "#about")}
              >
                ABOUT US
              </a>

              <a
                href="#work"
                onClick={(e) => scrollToSection(e, "#work")}
              >
                WORK
              </a>

              <button
                className="cta-btn mt-6 tracking-[0.06em]"
                onClick={() => setOpen(false)}
              >
                HIRE US
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}