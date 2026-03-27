"use client";

import { motion } from "framer-motion";
import Header from "@/components/ui/Header"; // ✅ ADD THIS
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";

export default function Home() {
  return (
    <>
      {/* NAVBAR */}
      <Header />

      <main className="relative overflow-hidden">
        {/* HERO */}
        <Hero />

        {/* INTRO */}
        <section className="min-h-screen flex items-center justify-center px-6 py-32 bg-[var(--background)] text-[var(--foreground)]">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-4xl text-center"
          >
            <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
              We design & build immersive digital experiences.
            </h2>
          </motion.div>
        </section>

        {/* ABOUT */}
        <About />
      </main>
    </>
  );
}