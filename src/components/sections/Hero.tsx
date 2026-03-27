"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const TITLE = "THINK BIGGER. MARKET SMARTER.";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const bgRef = useRef<HTMLImageElement>(null);

  // store refs safely
  const setCharRef = (el: HTMLSpanElement | null, i: number) => {
    if (el) charsRef.current[i] = el;
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline();

    // section intro
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

    // text animation (safe refs)
    tl.fromTo(
      charsRef.current,
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

    // buttons + links
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

    // subtle floating (kept)
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        y: 40,
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
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 text-center gap-16 bg-[var(--background)] text-[var(--foreground)]"
    >
      {/* 🧊 CLEAN BACKGROUND IMAGE (NO BLUR, NO SHADOW) */}
      <div
  ref={bgRef}
  className="absolute top-24 left-1/2 -translate-x-1/2 w-[1000px] max-w-none z-[1]"
>
  {/* BASE */}
  <img
    src="/images/mainelement.png"
    alt=""
    className="w-full h-auto block"
  />

  {/* DISTORTED LAYER */}
  <img
    src="/images/mainelement.png"
    alt=""
    className="absolute inset-0 w-full h-full object-contain opacity-60 distort-layer"
  />

  {/* HEAVY BLUR LAYER */}
  <img
    src="/images/mainelement.png"
    alt=""
    className="absolute inset-0 w-full h-full object-contain opacity-40 blur-layer"
  />
</div>
<img
  src="/images/mainelement.png"
  alt=""
  className="absolute inset-0 w-full h-full object-contain opacity-30 extra-blur"
/>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center gap-16">
        
        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.15] flex flex-wrap justify-center">
          {TITLE.split("").map((char, i) => (
            <span
              key={i}
              ref={(el) => setCharRef(el, i)}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* CTA */}
        <button className="cta-btn">
          GET STARTED
        </button>

        {/* Bottom Links */}
        <div className="bottom-links flex flex-wrap justify-center gap-10 md:gap-16 text-xs md:text-sm font-semibold uppercase tracking-[0.12em]">
          <span className="opacity-80 hover:opacity-100 transition">Strategy</span>
          <span className="opacity-80 hover:opacity-100 transition">Content</span>
          <span className="opacity-80 hover:opacity-100 transition">Design</span>
          <span className="opacity-80 hover:opacity-100 transition">
            Motion
          </span>
          <span className="opacity-80 hover:opacity-100 transition">
            Production
          </span>
        </div>
      </div>
    </section>
  );
}