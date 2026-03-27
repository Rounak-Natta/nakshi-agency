"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    const section = sectionRef.current;
    if (!el || !section) return;

    const chars = el.innerText.split("");

    el.innerHTML = chars
      .map((char) =>
        char === " "
          ? `<span class="inline-block w-[0.3em]"></span>`
          : `<span class="inline-block">${char}</span>`
      )
      .join("");

    const tl = gsap.timeline();

    tl.fromTo(
      section,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }
    );

    tl.fromTo(
      el.children,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.035,
        duration: 1,
        ease: "power4.out",
      },
      "-=0.6"
    );

    tl.fromTo(
      section.querySelectorAll("button, .bottom-links"),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      },
      "-=0.5"
    );

    // floating + depth blur
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        y: 50,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] px-6 text-center gap-16 overflow-visible pt-28"
    >
      {/* 🌫️ GLASSMORPHISM LAYER */}
      <div className="absolute inset-0 backdrop-blur-[60px] bg-white/5 z-[1]" />

      {/* 🌟 LIGHT REFLECTION */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/10 blur-3xl rounded-full z-[2]" />

      {/* 🧊 3D BACKGROUND ELEMENT */}
      {/* ===== BASE SHARP IMAGE ===== */}
<img
  ref={bgRef}
  src="/images/mainelement.png"
  alt=""
  className="absolute top-24 left-1/2 -translate-x-1/2 w-[1000px] max-w-none z-[1] pointer-events-none select-none"
/>

{/* ===== BLURRED IMAGE LAYER (REAL BLUR) ===== */}
<img
  src="/images/mainelement.png"
  alt=""
  className="absolute top-24 left-1/2 -translate-x-1/2 w-[1000px] max-w-none z-[2] pointer-events-none select-none blur-[40px] opacity-40 scale-105"
/>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center gap-16">
        
        {/* Heading */}
        <div className="max-w-full overflow-hidden">
          <h1
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold tracking-[0.001em] leading-[1.15] whitespace-nowrap"
          >
            THINK BIGGER. MARKET SMARTER.
          </h1>
        </div>

        {/* CTA */}
        <button className="cta-btn">
          GET STARTED
        </button>

        {/* Bottom Links */}
        <div className="bottom-links flex flex-wrap justify-center gap-14 md:gap-20 text-[11px] md:text-sm font-semibold uppercase tracking-[0.12em]">
          <span className="opacity-80 hover:opacity-100 transition">Strategy</span>
          <span className="opacity-80 hover:opacity-100 transition">Content</span>
          <span className="opacity-80 hover:opacity-100 transition">Design</span>
          <span className="opacity-80 hover:opacity-100 transition">
            Edit & Motion Graphics
          </span>
          <span className="opacity-80 hover:opacity-100 transition">
            AV Production
          </span>
        </div>

      </div>
    </section>
  );
}