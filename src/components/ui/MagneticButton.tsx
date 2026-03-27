"use client";

import { useRef } from "react";

export default function MagneticButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    ref.current!.style.transform = `translate(${x * 0.2}px, ${
      y * 0.2
    }px)`;
  };

  const reset = () => {
    ref.current!.style.transform = `translate(0,0)`;
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className="px-6 py-3 border border-white rounded-full transition-transform duration-300"
    >
      {children}
    </button>
  );
}