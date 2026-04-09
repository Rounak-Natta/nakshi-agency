'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

// Project / company data
const projects = [
  { id: 1, name: 'Femmora', role: 'Digital Art', image: '/clients/fem1.png', year: '2024' },
  { id: 2, name: 'Bandhan School', role: 'Branding', image: '/clients/BSB1.jpg', year: '2023' },
  { id: 3, name: 'Quadra', role: '3D Motion', image: '/clients/quad1.png', year: '2024' },
  { id: 4, name: 'HP Ghosh Hospital', role: 'Web Design', image: '/clients/hp1.png', year: '2023' },
]

const OurWorks = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const leftContainerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)

    // Create ScrollTriggers for each left item
    const items = gsap.utils.toArray<HTMLElement>('.company-item')
    const imageWrapper = imageRef.current

    items.forEach((item, idx) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => {
          setActiveIndex(idx)
          // Parallax / zoom effect on image
          if (imageWrapper) {
            gsap.to(imageWrapper, {
              scale: 1.02,
              duration: 0.6,
              ease: 'power2.out',
              overwrite: true,
            })
            gsap.to(imageWrapper, {
              scale: 1,
              duration: 0.6,
              delay: 0.3,
              ease: 'power2.in',
            })
          }
        },
        onLeaveBack: () => {
          setActiveIndex(idx)
          if (imageWrapper) {
            gsap.to(imageWrapper, {
              scale: 1.02,
              duration: 0.6,
              ease: 'power2.out',
            })
            gsap.to(imageWrapper, {
              scale: 1,
              duration: 0.6,
              delay: 0.3,
            })
          }
        },
      })
    })

    // Optional: initial image animation
    gsap.fromTo(imageWrapper, { scale: 0.98 }, { scale: 1, duration: 1, ease: 'power2.out' })

    // Pin the right column (image area)
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: '#sticky-image',
      pinSpacing: false,
    })

    window.addEventListener('load', () => ScrollTrigger.refresh())
    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden px-6 md:px-12"
    >
      {/* Optional glass distortion layers (from your CSS) */}
      <div className="distort-layer absolute inset-0 z-0" />
      <div className="blur-layer absolute inset-0 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20">
        {/* LEFT COLUMN – scrolling company names */}
        <div ref={leftContainerRef} className="w-full md:w-1/2 py-24 md:py-32 space-y-32">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              className="company-item group cursor-pointer"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              onClick={() => {
                // Optional: scroll to item when clicked
                const element = document.querySelector(`.company-item:nth-child(${idx + 1})`)
                element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }}
            >
              <div className="border-b border-white/20 pb-8 group-hover:border-white/40 transition-all duration-500">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm uppercase tracking-widest text-white/50 font-mono">
                    {project.role}
                  </span>
                  <span className="text-sm font-mono text-white/40">{project.year}</span>
                </div>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1] mt-4 group-hover:translate-x-2 transition-transform duration-500">
                  {project.name}
                </h2>
                <motion.div
                  className="mt-6 flex items-center gap-2 text-sm font-medium text-white/50 group-hover:text-white/80 transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 + 0.3 }}
                >
                  <span>VIEW PROJECT</span>
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* RIGHT COLUMN – sticky image with parallax */}
        <div
          id="sticky-image"
          className="w-full md:w-1/2 h-screen sticky top-0 flex items-center justify-center"
        >
          <div className="relative w-full max-w-md mx-auto aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            {/* Glass overlay (optional) */}
            <div className="glass-overlay z-10" />

            {/* Image container with parallax effect */}
            <div
              ref={imageRef}
              className="w-full h-full will-change-transform"
            >
              {projects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeIndex === idx ? 1 : 0,
                    scale: activeIndex === idx ? 1 : 0.96,
                  }}
                  transition={{ duration: 0.5, ease: 'anticipate' }}
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </motion.div>
              ))}
            </div>

            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 pointer-events-none z-10" />
          </div>
        </div>
      </div>

      {/* Footer / CTA (minimal) */}
      <div className="relative z-10 text-center pb-12">
        <div className="inline-flex items-center gap-6 border-t border-white/20 pt-8">
          <span className="text-white/40 text-sm tracking-widest font-mono">
            ✦ INNOVATION MEETS CRAFT ✦
          </span>
          <div className="w-12 h-px bg-white/30" />
          <span className="text-white/80 text-sm font-light">20+ PROJECTS DELIVERED</span>
        </div>
      </div>
    </section>
  )
}

export default OurWorks