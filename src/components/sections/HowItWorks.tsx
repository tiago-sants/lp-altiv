"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { STEPS } from "@/lib/constants";
import { useGSAP } from "@/hooks/useGSAP";
import { fadeInUp, withDesktopOnly } from "@/components/animations/gsap-utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HowItWorks() {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const mobileLineRef = useRef<HTMLDivElement>(null);

  const containerRef = useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const mm = withDesktopOnly(
      // Desktop: pinned horizontal timeline
      () => {
        const steps = stepRefs.current.filter(Boolean);
        const line = lineRef.current;
        if (!line || steps.length === 0) return;

        // Set initial states
        gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(steps, { opacity: 0, y: 30 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 20%",
            end: "+=800",
            pin: true,
            scrub: false,
            toggleActions: "play none none none",
          },
        });

        // Draw the line
        tl.to(line, {
          scaleX: 1,
          duration: 1,
          ease: "power2.inOut",
        });

        // Fade in steps sequentially
        tl.to(
          steps,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.3,
            ease: "power2.out",
          },
          0.2
        );
      },
      // Mobile: simple fade in
      () => {
        const steps = stepRefs.current.filter(Boolean);
        if (steps.length === 0) return;

        fadeInUp(steps, container, { stagger: 0.15 });

        // Animate mobile line
        if (mobileLineRef.current) {
          gsap.from(mobileLineRef.current, {
            scaleY: 0,
            transformOrigin: "top center",
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        }
      }
    );

    return () => mm.revert();
  });

  return (
    <section
      ref={containerRef}
      id="como-funciona"
      className="py-24 md:py-32 bg-[var(--bg-primary)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <SectionTitle label="Processo" title="Como funciona" centered />

        {/* Desktop horizontal timeline (lg+) */}
        <div className="hidden lg:block relative mt-20">
          {/* Connecting line */}
          <div className="absolute top-6 left-[calc(12.5%)] right-[calc(12.5%)] h-px bg-[var(--border)]">
            <div
              ref={lineRef}
              className="absolute inset-0 bg-accent"
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-4 gap-8">
            {STEPS.map((step, index) => (
              <div
                key={step.number}
                ref={(el) => { stepRefs.current[index] = el; }}
                className="flex flex-col items-center text-center"
              >
                {/* Circle */}
                <div
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-small font-medium mb-6 ${
                    index === STEPS.length - 1
                      ? "bg-accent text-black"
                      : "border-2 border-accent text-accent bg-[var(--bg-primary)]"
                  }`}
                >
                  {step.number}
                </div>

                {/* Title */}
                <h3 className="text-body-base font-medium text-[var(--text-primary)] mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-small text-[var(--text-tertiary)] max-w-[200px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="lg:hidden relative mt-12 pl-10">
          {/* Vertical line */}
          <div
            ref={mobileLineRef}
            className="absolute left-[15px] top-0 bottom-0 w-px bg-accent"
          />

          <div className="flex flex-col gap-12">
            {STEPS.map((step, index) => (
              <div
                key={step.number}
                ref={(el) => {
                  // Use indices offset by 4 for mobile to avoid conflicts
                  if (!stepRefs.current[index]) {
                    stepRefs.current[index] = el;
                  }
                }}
                className="relative"
              >
                {/* Circle */}
                <div
                  className={`absolute -left-10 top-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    index === STEPS.length - 1
                      ? "bg-accent text-black"
                      : "border-2 border-accent text-accent bg-[var(--bg-primary)]"
                  }`}
                >
                  {step.number}
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-body-base font-medium text-[var(--text-primary)] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-small text-[var(--text-tertiary)]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
