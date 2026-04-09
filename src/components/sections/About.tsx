"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const WORDS = ["STRATEGISTS", "CREATORS", "INNOVATORS", "MARKETERS", "DREAMERS"];

export default function About() {
  const [index, setIndex] = useState(0);

  // clean word rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  // subtle scroll motion
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.7]);

  return (
    <section
      id="about"
      className="relative min-h-[140vh] px-6 md:px-16 lg:px-24 py-20 md:py-24 mt-[50px]"
      style={{ color: "var(--foreground)" }}
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-[var(--background)]" />

      {/* SOFT LIGHT */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-white/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 right-1/3 w-[350px] h-[350px] bg-white/5 blur-[90px] rounded-full" />
      </div>

      {/* MAIN GRID */}
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">

        {/* LEFT */}
        <motion.div
          style={{ y, opacity }}
          className="md:sticky md:top-28 h-fit space-y-5"
        >
          <p className="text-xs uppercase tracking-[0.3em] opacity-50">
            About
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
            Nakshi Agency
          </h2>

          <p className="text-sm opacity-50 max-w-xs">
            Strategy. Design. Growth — crafted for brands that lead.
          </p>
        </motion.div>

        {/* RIGHT */}
        <div className="space-y-10">
          {[
            "Nakshi Agency partners with brands that refuse to blend in. We combine strategy, design, and data to build work that performs and lasts.",
            "From identity systems to scalable digital growth, we create clarity, consistency, and impact across every touchpoint.",
            "We don’t just market brands — we shape perception, influence decisions, and create meaningful connections.",
            "Everything we do is built to earn attention, build trust, and drive long-term growth.",
          ].map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="text-base md:text-lg leading-relaxed opacity-90"
            >
              {text}
            </motion.p>
          ))}
        </div>
      </div>

      {/* STATEMENT */}
      <div className="mt-24 text-center max-w-4xl mx-auto">
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight"
        >
          We build brands that don’t compete — they lead.
        </motion.h3>
      </div>

      {/* LOWER SECTION */}
      <div className="mt-16 max-w-5xl mx-auto flex flex-col items-center gap-8">

        {/* ROTATING WORD */}
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 15, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="px-7 py-3 rounded-full 
                     bg-white/10 backdrop-blur-xl 
                     border border-white/20 
                     text-lg md:text-2xl font-semibold shadow-sm"
        >
          {WORDS[index]}
        </motion.div>

        {/* VALUE CARDS */}
        <div className="grid md:grid-cols-3 gap-4 w-full">

          {[
            {
              title: "Strategy",
              desc: "Clear thinking that drives every decision.",
            },
            {
              title: "Design",
              desc: "Built to be remembered, not just seen.",
            },
            {
              title: "Growth",
              desc: "Focused on impact, not vanity metrics.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="p-5 rounded-xl 
                         bg-white/5 backdrop-blur-lg 
                         border border-white/10 
                         hover:bg-white/10 transition-all duration-300"
            >
              <h4 className="font-semibold text-lg mb-1">
                {item.title}
              </h4>
              <p className="text-sm opacity-70">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* FINAL NOTE */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          transition={{ duration: 0.8 }}
          className="text-sm text-center max-w-md"
        >
          Built with intent. Designed to stand out. Engineered to grow.
        </motion.p>
      </div>
    </section>
  );
}