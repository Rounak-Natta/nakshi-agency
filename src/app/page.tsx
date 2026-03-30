"use client";

import Header from "@/components/ui/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

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


        {/* Why Choose SECTION */}
        <section id="whychooseus">
          <WhyChooseUs/>
        </section>

      </main>
    </>
  );
}