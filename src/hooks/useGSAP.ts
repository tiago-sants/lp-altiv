"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGSAP(
  callback: (container: HTMLDivElement) => void,
  deps: React.DependencyList = []
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const container = containerRef.current;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Skip animations entirely for users who prefer reduced motion
        gsap.defaults({ duration: 0 });
      }
      callback(container);
      if (prefersReducedMotion) {
        gsap.defaults({ duration: 0.5 });
      }
    }, container);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
}
