"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/* ================= DATA ================= */

const WORDS = ["STRATEGISTS", "CREATORS", "INNOVATORS", "MARKETERS"];

/* ================= COMPONENT ================= */

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(0);

  /* ================= PARALLAX ================= */

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { y: -80 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        rightRef.current,
        { y: 60 },
        {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ================= 3D FLIP ================= */

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1.5,
    });

    // Flip to back
    tl.to(card, {
      rotateX: 180,
      duration: 0.8,
      ease: "power3.inOut",
    });

    // Update word index midway
    tl.add(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    });

    // Complete full rotation (back to front)
    tl.to(card, {
      rotateX: 360,
      duration: 0.8,
      ease: "power3.inOut",
    });

    return () => {
      tl.kill(); // ✅ proper cleanup
    };
  }, []);

  /* ================= MOUSE TILT ================= */

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = ((y / rect.height) - 0.5) * -10;
      const rotateY = ((x / rect.width) - 0.5) * 10;

      gsap.to(el, {
        rotateX,
        rotateY,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const reset = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", reset);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, []);

  /* ================= RENDER ================= */

  return (
    <section
      id="about"
      ref={sectionRef}
      className="h-screen flex flex-col justify-center px-4 md:px-10 text-white overflow-hidden"
    >
      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <div ref={leftRef}>
          <p className="text-sm uppercase tracking-[0.2em] opacity-70 mb-4">
            About
          </p>

          <h2 className="text-2xl md:text-3xl font-semibold">
            NAKSHI AGENCY
          </h2>
        </div>

        {/* RIGHT */}
        <div
          ref={rightRef}
          className="space-y-6 max-w-xl text-base md:text-lg leading-relaxed"
        >
          <p>
            Nakshi Agency is a bold and creative marketing partner built for brands that refuse to blend in. 
We combine strategy, design, and data to craft impactful campaigns that don't just look good-they deliver real results.

 

          </p>

          <p>
           From building strong brand 
identities to driving high-performance digital growth, we help businesses stand out in a crowded world.
          </p>
        </div>
      </div>

      {/* CENTER */}
      <div className="mt-20 text-center">
        <h3 className="text-3xl md:text-6xl font-bold leading-tight">
          We don’t follow trends — we shape them.
        </h3>
      </div>

      {/* 3D FLIP */}
      <div className="mt-12 flex justify-center">
        <h4 className="text-lg md:text-3xl flex items-center gap-4">
          <span className="opacity-80">WE ARE A MIX OF</span>

          <div
            ref={boxRef}
            className="perspective-distant"
          >
            <div
              ref={cardRef}
              className="relative w-60 h-60"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* FRONT */}
              <div
                className="absolute inset-0 flex items-center justify-center rounded-xl
                bg-white/10 backdrop-blur-md border border-white/20
                text-white font-semibold shadow-[0_0_30px_rgba(255,255,255,0.08)]"
                style={{ backfaceVisibility: "hidden" }}
              >
                {WORDS[index]}
              </div>

              {/* BACK */}
              <div
                className="absolute inset-0 flex items-center justify-center rounded-xl
                bg-white/10 backdrop-blur-md border border-white/20
                text-white font-semibold shadow-[0_0_30px_rgba(255,255,255,0.08)]"
                style={{
                  transform: "rotateX(180deg)",
                  backfaceVisibility: "hidden",
                }}
              >
                {WORDS[(index + 1) % WORDS.length]}
              </div>
            </div>
          </div>
        </h4>
      </div>
    </section>
  );
}