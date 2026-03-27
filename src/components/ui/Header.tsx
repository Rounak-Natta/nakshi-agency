"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
<header className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-5 flex items-center justify-between bg-transparent">        
        {/* LEFT - DESKTOP NAV */}
        <nav className="hidden md:flex gap-8 text-sm tracking-[0.02em] font-medium">
          <a href="#" className="nav-link">ABOUT US</a>
          <span className="opacity-50">|</span>
          <a href="#" className="nav-link">WORK</a>
        </nav>

        {/* CENTER - LOGO */}
        <div className="absolute left-1/2 -translate-x-1/2 w-32 h-10 md:w-40 md:h-12">
          <Image
            src="/images/nalogowhite.png"
            alt="Logo"
            fill
            sizes="(max-width: 768px) 128px, 160px"
            style={{ objectFit: "contain" }}
            priority
          />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          
          {/* CTA BUTTON (Desktop Only) */}
          <button className="cta-btn hidden md:block tracking-[0.06em]">
            HIRE US
          </button>

          {/* HAMBURGER (Mobile Only) */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-[5px]"
          >
            <span className={`menu-line ${open ? "rotate-top" : ""}`} />
            <span className={`menu-line ${open ? "fade-out" : ""}`} />
            <span className={`menu-line ${open ? "rotate-bottom" : ""}`} />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)]"
          >
            <nav className="flex flex-col items-center gap-10 text-3xl font-medium tracking-[0.02em]">
              <a href="#" onClick={() => setOpen(false)}>
                ABOUT US
              </a>
              <a href="#" onClick={() => setOpen(false)}>
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