"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGSAP";
import { fadeInLeft, fadeInRight } from "@/components/animations/gsap-utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function About() {
  const containerRef = useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    fadeInLeft(".about-text", container, { duration: 0.8 });
    fadeInRight(".about-image", container, { duration: 0.8 });
  });

  return (
    <section
      ref={containerRef}
      id="sobre"
      className="py-24 md:py-32 bg-[var(--bg-primary)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column — text */}
          <div className="about-text">
            {/* Label */}
            <span className="text-label text-accent uppercase tracking-[3px] font-body font-semibold">
              A Empresa
            </span>

            {/* Title */}
            <h2 className="font-heading text-h2 text-[var(--text-primary)] mt-2 mb-6 font-light">
              Altiv Capital Imobiliario
            </h2>

            {/* Description */}
            <p className="text-body-base text-[var(--text-secondary)] mb-10 max-w-lg">
              Com forte conhecimento do mercado financeiro e imobiliario, a Altiv
              se posiciona como uma parceira estrategica, oferecendo atendimento
              consultivo e gestao completa da operacao — desde a analise ate a
              parte documental.
            </p>

            {/* Mini-stats */}
            <div className="flex gap-12">
              <div>
                <span className="text-h3 font-semibold text-accent font-heading block">
                  5+
                </span>
                <span className="text-xs uppercase text-[var(--text-tertiary)] tracking-[2px] font-body">
                  Anos no mercado
                </span>
              </div>
              <div>
                <span className="text-h3 font-semibold text-accent font-heading block">
                  Premium
                </span>
                <span className="text-xs uppercase text-[var(--text-tertiary)] tracking-[2px] font-body">
                  Atendimento
                </span>
              </div>
            </div>
          </div>

          {/* Right column — image placeholder */}
          <div className="about-image">
            <div className="w-full aspect-[4/3] rounded-xl bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-surface)] flex flex-col items-center justify-center gap-4 border border-[var(--border)]">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                className="text-[var(--text-muted)]"
              >
                <rect
                  x="4"
                  y="4"
                  width="40"
                  height="40"
                  rx="4"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M4 32l12-12 8 8 8-8 12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <span className="text-small text-[var(--text-muted)] font-body uppercase tracking-widest">
                Foto do escritorio / equipe
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
