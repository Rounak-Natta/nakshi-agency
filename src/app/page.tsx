"use client";

import Header from "@/components/ui/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import OurWorks from "@/components/sections/OurWorks";
import MarqueeSection from "@/components/sections/MarqueeSection";
import Contact from "@/components/sections/Contact";

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



        <section id="ourworks">
          <OurWorks/>
        </section>


        <section id="marquee">
          <MarqueeSection/>
        </section>


        <section id="contact">
          <Contact/>
        </section>

      </main>
    </>
  );
}