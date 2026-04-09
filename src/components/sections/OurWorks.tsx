'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Project / company data with multiple images per project
const projects = [
  {
    id: 1,
    name: 'Femmora',
    role: 'Digital Art',
    year: '2024',
    images: ['/clients/fem1.png', '/clients/fem2.png', '/clients/fem3.png'],
  },
  {
    id: 2,
    name: 'Bandhan School',
    role: 'Branding',
    year: '2023',
    images: ['/clients/BSB1.jpg', '/clients/BSB2.jpg', '/clients/BSB3.jpg'],
  },
  {
    id: 3,
    name: 'Quadra',
    role: '3D Motion',
    year: '2024',
    images: ['/clients/quad1.png', '/clients/quad2.jpg', '/clients/quad3.png'],
  },
  {
    id: 4,
    name: 'HP Ghosh Hospital',
    role: 'Web Design',
    year: '2023',
    images: ['/clients/hp1.png', '/clients/hp2.png', '/clients/hp3.png'],
  },
  {
    id: 5,
    name: 'Bandhan Skill',
    role: 'Web Design',
    year: '2023',
    images: ['/clients/bskill1.jpg', '/clients/bskill2.png', '/clients/bskill3.png'],
  },
];

const OurWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 left, 1 right
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const currentProject = projects[activeIndex];
  const totalSlides = currentProject?.images.length || 1;

  // Reset slide index when active project changes
  useEffect(() => {
    setSlideIndex(0);
  }, [activeIndex]);

  // Autoplay logic
  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    if (totalSlides <= 1) return;
    autoplayRef.current = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % totalSlides);
      setDirection(1);
    }, 4000);
  }, [totalSlides]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [activeIndex, startAutoplay, stopAutoplay]);

  const handleNext = () => {
    stopAutoplay();
    setDirection(1);
    setSlideIndex((prev) => (prev + 1) % totalSlides);
    startAutoplay();
  };

  const handlePrev = () => {
    stopAutoplay();
    setDirection(-1);
    setSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    startAutoplay();
  };

  const handleDotClick = (index: number) => {
    if (index === slideIndex) return;
    stopAutoplay();
    setDirection(index > slideIndex ? 1 : -1);
    setSlideIndex(index);
    startAutoplay();
  };

  // GSAP ScrollTrigger setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    const items = gsap.utils.toArray<HTMLElement>('.company-item');

    items.forEach((item, idx) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActiveIndex(idx),
        onLeaveBack: () => setActiveIndex(idx),
      });
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: '#sticky-image',
      pinSpacing: false,
    });

    window.addEventListener('load', () => ScrollTrigger.refresh());
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      stopAutoplay();
    };
  }, [stopAutoplay]);

  // Slide animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const slideTransition = {
    duration: 0.5,
    ease: [0.32, 0.72, 0, 1] as const,
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden px-6 md:px-12"
    >
      {/* Glass distortion layers */}
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
                const element = document.querySelector(
                  `.company-item:nth-child(${idx + 1})`
                );
                element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

        {/* RIGHT COLUMN – sticky image carousel with 4:5 ratio and depth */}
        <div
          id="sticky-image"
          className="w-full md:w-1/2 h-screen sticky top-0 flex items-center justify-center"
        >
          <div
            ref={carouselRef}
            className="relative w-full max-w-md mx-auto transition-all duration-500 ease-out hover:scale-[1.02]"
            style={{ aspectRatio: '4 / 5' }}
            onMouseEnter={stopAutoplay}
            onMouseLeave={startAutoplay}
          >
            {/* Outer shadow + rounded corners + glass border effect */}
            <div className="absolute inset-0 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden">
              {/* Inner shadow overlay for depth */}
              <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_20px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.1)] pointer-events-none z-20" />
              {/* Glass overlay (existing) */}
              <div className="glass-overlay absolute inset-0 z-10 pointer-events-none" />
              {/* Image container */}
              <div className="relative w-full h-full overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={`${activeIndex}-${slideIndex}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={slideTransition}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={currentProject.images[slideIndex]}
                      alt={`${currentProject.name} - ${slideIndex + 1}`}
                      className="w-full h-full object-cover"
                      loading={
                        activeIndex === 0 && slideIndex === 0 ? 'eager' : 'lazy'
                      }
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Arrows */}
              {totalSlides > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 hover:scale-110"
                    aria-label="Previous image"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 hover:scale-110"
                    aria-label="Next image"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              {totalSlides > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                  {currentProject.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDotClick(idx)}
                      className={`transition-all duration-300 rounded-full ${
                        idx === slideIndex
                          ? 'w-6 h-1.5 bg-white'
                          : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 pointer-events-none z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer / CTA */}
      <div className="relative z-10 text-center pb-12">
        <div className="inline-flex items-center gap-6 border-t border-white/20 pt-8">
          <span className="text-white/40 text-sm tracking-widest font-mono">
            ✦ INNOVATION MEETS CRAFT ✦
          </span>
          <div className="w-12 h-px bg-white/30" />
          <span className="text-white/80 text-sm font-light">
            20+ PROJECTS DELIVERED
          </span>
        </div>
      </div>
    </section>
  );
};

export default OurWorks;