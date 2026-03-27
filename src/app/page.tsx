"use client";

import Header from "@/components/ui/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import { motion } from "framer-motion";

/* ================= ANIMATION CONFIG ================= */

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 80 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: {
    duration: 1,
    ease: EASE,
  },
};

/* ================= PAGE ================= */

export default function Home() {
  return (
    <>
      {/* NAVBAR */}
      <Header />

      <main className="relative overflow-hidden">
        
        {/* HERO */}
        <Hero />

        {/* ABOUT */}
        <About />
      </main>
    </>
  );
}