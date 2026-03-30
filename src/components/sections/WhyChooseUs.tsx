"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import Image from "next/image";

const SERVICES = [
  { name: "Strategy", image: "/images/1.png" },
  { name: "Content", image: "/images/2.png" },
  { name: "Design", image: "/images/3.png" },
  { name: "Edit & Motion", image: "/images/4.png" },
  { name: "AV Production", image: "/images/5.png" },
  { name: "Media", image: "/images/6.png" },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement[]>([]);
  const numbersRef = useRef<HTMLHeadingElement[]>([]);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const currentPosRef = useRef({ x: 0, y: 0 });
  const targetPosRef = useRef({ x: 0, y: 0 });
  const hoverTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  /* ================= HELPER FUNCTIONS ================= */
  const addToReveal = (el: HTMLDivElement | null) => {
    if (el && !revealRef.current.includes(el)) {
      revealRef.current.push(el);
    }
  };

  const addToNumbers = (el: HTMLHeadingElement | null) => {
    if (el && !numbersRef.current.includes(el)) {
      numbersRef.current.push(el);
    }
  };

  /* ================= SMOOTH CURSOR TRACKING ================= */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPosRef.current = { x: e.clientX + 20, y: e.clientY - 60 };
    };
    
    const animate = () => {
      if (imageRef.current && isHovering && activeImage) {
        // Smooth interpolation
        currentPosRef.current.x += (targetPosRef.current.x - currentPosRef.current.x) * 0.2;
        currentPosRef.current.y += (targetPosRef.current.y - currentPosRef.current.y) * 0.2;
        
        imageRef.current.style.transform = `translate(${currentPosRef.current.x}px, ${currentPosRef.current.y}px)`;
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    animate();
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovering, activeImage]);

  /* ================= GSAP ================= */

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* === REVEAL ANIMATION === */
      gsap.from(revealRef.current, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      /* === COUNT UP ANIMATION === */
      numbersRef.current.forEach((el) => {
        const text = el.innerText;
        let end = text.includes("M") ? 10_000_000 : 10_000;
        
        gsap.to(el, {
          y: -3,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });

        const obj = { val: 0 };
        
        gsap.to(obj, {
          val: end,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          onUpdate: () => {
            if (text.includes("M")) {
              const value = Math.floor(obj.val / 1_000_000);
              el.innerText = `${value}M+`;
            } else {
              const value = Math.floor(obj.val / 1000);
              el.innerText = `${value}K+`;
            }
          },
        });
      });

      /* === HOVER INTERACTIONS === */
      revealRef.current.forEach((el) => {
        const arrow = el.querySelector(".arrow");
        const line = el.querySelector(".line");
        
        if (!arrow) return;
        
        const handleMouseEnter = () => {
          gsap.to(arrow, { 
            x: 8, 
            duration: 0.3, 
            ease: "power2.out" 
          });
          if (line) {
            gsap.to(line, {
              width: "100%",
              duration: 0.3,
              ease: "power2.out",
            });
          }
        };
        
        const handleMouseLeave = () => {
          gsap.to(arrow, { 
            x: 0, 
            duration: 0.3,
            ease: "power2.out"
          });
          if (line) {
            gsap.to(line, {
              width: "0%",
              duration: 0.2,
            });
          }
        };
        
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
        
        (el as any)._hoverCleanup = () => {
          el.removeEventListener("mouseenter", handleMouseEnter);
          el.removeEventListener("mouseleave", handleMouseLeave);
        };
      });
      
    }, sectionRef);
    
    return () => {
      revealRef.current.forEach((el) => {
        if ((el as any)._hoverCleanup) (el as any)._hoverCleanup();
      });
      ctx.revert();
    };
  }, []);

  /* ================= IMAGE ANIMATION ================= */
  useEffect(() => {
    if (imageRef.current && isHovering && activeImage) {
      // Clear any pending hide timeout
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      
      // Reset position to current cursor position
      currentPosRef.current = { x: targetPosRef.current.x, y: targetPosRef.current.y };
      
      // Kill any existing animations
      gsap.killTweensOf(imageRef.current);
      
      // Pop animation
      gsap.fromTo(imageRef.current,
        {
          scale: 0,
          opacity: 0,
          rotation: -8,
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.4,
          ease: "back.out(1)",
          onComplete: () => {
            // Continuous floating after pop
            gsap.to(imageRef.current, {
              y: "+=12",
              duration: 1.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          }
        }
      );
    } else if (imageRef.current && !isHovering) {
      // Delay hiding the image slightly to prevent flickering when moving between items
      hoverTimeoutRef.current = setTimeout(() => {
        if (imageRef.current && !isHovering) {
          // Kill all animations and hide
          gsap.killTweensOf(imageRef.current);
          gsap.to(imageRef.current, {
            scale: 0,
            opacity: 0,
            rotation: -8,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => {
              if (!isHovering) {
                setActiveImage(null);
              }
            },
          });
        }
      }, 100);
    }
    
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [isHovering, activeImage]);

  /* ================= HANDLE SERVICE HOVER ================= */
  const handleServiceMouseEnter = (image: string) => {
    // Clear any pending hide timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setActiveImage(image);
    setIsHovering(true);
  };

  const handleServiceMouseLeave = () => {
    setIsHovering(false);
    // Don't immediately remove the image - let the useEffect handle it with delay
  };

  return (
    <section
      ref={sectionRef}
      className="bg-[#ff2e2e] text-white px-6 md:px-16 lg:px-24 py-12 md:py-16 relative overflow-hidden"
    >
      {/* TOP */}
      <div className="max-w-7xl mx-auto">
        <p className="text-sm md:text-base uppercase tracking-wider opacity-70 mb-12 md:mb-16">
          In Just 6 Months
        </p>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20 md:mb-24">
          {/* LEFT - STATS */}
          <div className="space-y-16 md:space-y-20">
            <div ref={addToReveal}>
              <h2
                ref={addToNumbers}
                className="text-6xl md:text-8xl lg:text-[90px] font-bold leading-none tracking-tight"
              >
                10M+
              </h2>
              <p className="text-2xl md:text-3xl font-medium mt-3 md:mt-4">
                People Reached
              </p>
            </div>

            <div ref={addToReveal}>
              <h2
                ref={addToNumbers}
                className="text-6xl md:text-8xl lg:text-[90px] font-bold leading-none tracking-tight"
              >
                10K+
              </h2>
              <p className="text-2xl md:text-3xl font-medium mt-3 md:mt-4">
                Leads Generated
              </p>
            </div>
          </div>

          {/* RIGHT - TEXT */}
          <div className="space-y-5 md:space-y-6 max-w-xl">
            <p className="text-base md:text-lg leading-relaxed opacity-90">
              We don't just execute campaigns — we engineer growth.
              Every decision is backed by strategy, data, and a deep
              understanding of how attention works in the modern world.
            </p>

            <p className="text-base md:text-lg leading-relaxed opacity-90">
              From brand identity to performance marketing, we build
              systems that scale. Our approach blends creativity with
              precision — ensuring every move drives measurable impact.
            </p>

            <p className="text-base md:text-lg leading-relaxed opacity-90">
              <span className="font-semibold">10,000+ quality leads</span> isn't just a number — it's proof of our 
              ability to convert attention into action. Through hyper-targeted strategies, 
              A/B tested funnels, and continuous optimization, we deliver leads that actually 
              convert. Every campaign is designed to attract, engage, and capture high-intent 
              prospects ready to take the next step.
            </p>
          </div>
        </div>

        {/* SERVICES */}
        <div className="space-y-5 md:space-y-6">
          {SERVICES.map((service, i) => (
            <div
              key={i}
              ref={addToReveal}
              className="group relative border-b border-white/20 pb-4 md:pb-5 cursor-pointer"
              onMouseEnter={() => handleServiceMouseEnter(service.image)}
              onMouseLeave={handleServiceMouseLeave}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight">
                  {service.name}
                </span>

                <div className="flex items-center gap-3 md:gap-5 flex-1 ml-6 md:ml-10">
                  <div className="relative flex-1 overflow-hidden">
                    <div className="h-px bg-white/20 w-full" />
                    <div className="line absolute top-0 left-0 h-px bg-white w-0 transition-all duration-300" />
                  </div>

                  <div className="arrow w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20">
                    <svg 
                      className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:rotate-45"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10v10M17 7L7 17" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STABLE FLOATING IMAGE THAT FOLLOWS CURSOR */}
      {activeImage && (
        <div
          ref={imageRef}
          className="fixed pointer-events-none z-[100] will-change-transform"
          style={{
            width: "200px",
            height: "150px",
            left: 0,
            top: 0,
            transform: `translate(${currentPosRef.current.x}px, ${currentPosRef.current.y}px)`,
          }}
        >
          <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl border border-white/30 bg-black/5">
            <Image
              src={activeImage}
              alt="Service visual"
              fill
              className="object-cover"
              sizes="200px"
              priority
              onError={(e) => {
                console.warn(`Image not found: ${activeImage}`);
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
        </div>
      )}
    </section>
  );
}