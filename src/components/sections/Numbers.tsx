"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COUNTERS } from "@/lib/constants";
import { useGSAP } from "@/hooks/useGSAP";
import { countUp } from "@/components/animations/gsap-utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Numbers() {
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const containerRef = useGSAP(() => {
    numberRefs.current.forEach((el, i) => {
      if (el) {
        countUp(el, COUNTERS[i].value, el, 2);
      }
    });
  });

  return (
    <section
      ref={containerRef}
      id="diferenciais"
      className="py-24 md:py-32 bg-gradient-to-br from-accent to-accent-dark"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Title */}
        <h2 className="font-heading text-h2 text-black text-center mb-16 font-light">
          Por que a Altiv?
        </h2>

        {/* Counters grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {COUNTERS.map((counter, index) => (
            <div key={counter.label} className="relative flex flex-col items-center text-center">
              {/* Separator — desktop only, not before first item */}
              {index > 0 && (
                <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 bg-black/20" />
              )}

              {/* Number */}
              <div className="text-[36px] md:text-[56px] font-bold text-black leading-none font-heading">
                {counter.prefix}
                <span
                  ref={(el) => { numberRefs.current[index] = el; }}
                >
                  0
                </span>
                {counter.suffix}
              </div>

              {/* Label */}
              <span className="mt-3 text-xs uppercase tracking-[2px] text-[#1a1a1a] font-body">
                {counter.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
