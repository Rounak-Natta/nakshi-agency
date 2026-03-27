"use client";

import Header from "@/components/ui/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";

/* ================= PAGE ================= */

export default function Home() {
  return (
    <>
      {/* NAVBAR */}
      <Header />

      {/* MAIN CONTENT */}
      <main className="relative overflow-hidden">
        
        {/* HERO SECTION */}
        <section id="home">
          <Hero />
        </section>

        {/* ABOUT SECTION */}
        <section id="about">
          <About />
        </section>

      </main>
    </>
  );
}