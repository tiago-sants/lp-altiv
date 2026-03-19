"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TESTIMONIALS } from "@/lib/constants";
import { useGSAP } from "@/hooks/useGSAP";
import { fadeInUp } from "@/components/animations/gsap-utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Testimonials() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isHovered = useRef(false);

  const containerRef = useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    fadeInUp(".testimonials-content", container);
  });

  const goToSlide = useCallback(
    (index: number) => {
      if (index === activeSlide || !slideRef.current) return;

      const el = slideRef.current;

      gsap.to(el, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setActiveSlide(index);
          gsap.to(el, {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          });
        },
      });
    },
    [activeSlide]
  );

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isHovered.current) {
        setActiveSlide((prev) => {
          const next = (prev + 1) % TESTIMONIALS.length;
          // Crossfade using GSAP
          if (slideRef.current) {
            gsap.to(slideRef.current, {
              opacity: 0,
              duration: 0.3,
              ease: "power2.in",
              onComplete: () => {
                if (slideRef.current) {
                  gsap.to(slideRef.current, {
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.out",
                  });
                }
              },
            });
          }
          return next;
        });
      }
    }, 6000);
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoPlay]);

  const handleMouseEnter = () => {
    isHovered.current = true;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    startAutoPlay();
  };

  const current = TESTIMONIALS[activeSlide];

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-32 bg-[var(--bg-surface)]"
      role="region"
      aria-label="Depoimentos de clientes"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <SectionTitle
          label="Depoimentos"
          title="O que nossos clientes dizem"
          centered
        />

        {/* Carousel */}
        <div
          className="testimonials-content max-w-2xl mx-auto text-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Slide content */}
          <div ref={slideRef} aria-live="polite">
            {/* Quote mark */}
            <span
              className="block text-[48px] leading-none text-accent font-heading select-none mb-4"
              aria-hidden="true"
            >
              &ldquo;
            </span>

            {/* Citation */}
            <blockquote className="text-body-lg italic text-[var(--text-secondary)] mb-8">
              {current.quote}
            </blockquote>

            {/* Name */}
            <p className="text-small font-medium text-[var(--text-primary)]">
              {current.name}
            </p>

            {/* Role + detail */}
            <p className="text-xs text-[var(--text-tertiary)] mt-1">
              {current.role} &middot; {current.detail}
            </p>
          </div>

          {/* Progress indicators */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Ir para depoimento ${index + 1}`}
                className={`w-6 h-[3px] rounded-full transition-colors duration-300 ${
                  index === activeSlide
                    ? "bg-accent"
                    : "bg-[var(--border)] hover:bg-[var(--text-muted)]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
