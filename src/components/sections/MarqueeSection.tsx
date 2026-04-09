'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MarqueeSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const marqueeText = "*We Do It . Harder, Better, Faster... Smarter."

  useEffect(() => {
    // Parallax effect: vertical movement on scroll
    if (sectionRef.current) {
      gsap.to(sectionRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }

    // Optional horizontal shift for first row
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-visible py-16 md:py-24"
    >
      {/* No extra backgrounds – uses global red background */}

      <div className="relative z-10 flex flex-col gap-8 md:gap-12">
        {/* First row – left to right */}
        <div className="overflow-hidden">
          <div
            ref={marqueeRef}
            className="whitespace-nowrap marquee-right"
          >
            <span className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white inline-block mx-8">
              {marqueeText}
            </span>
            <span className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white inline-block mx-8">
              {marqueeText}
            </span>
            <span className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white inline-block mx-8">
              {marqueeText}
            </span>
          </div>
        </div>

        {/* Second row – right to left (opposite direction) */}
        <div className="overflow-hidden">
          <div className="whitespace-nowrap marquee-left">
            <span className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white/70 inline-block mx-8">
              {marqueeText}
            </span>
            <span className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white/70 inline-block mx-8">
              {marqueeText}
            </span>
            <span className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white/70 inline-block mx-8">
              {marqueeText}
            </span>
          </div>
        </div>
      </div>

      {/* CSS animations – using global style tag (works in Next.js) */}
      <style>{`
        .marquee-right {
          display: inline-block;
          animation: marqueeRight 20s linear infinite;
        }
        .marquee-left {
          display: inline-block;
          animation: marqueeLeft 25s linear infinite;
        }
        @keyframes marqueeRight {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        @keyframes marqueeLeft {
          0% {
            transform: translateX(-33.33%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .marquee-right:hover,
        .marquee-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default MarqueeSection