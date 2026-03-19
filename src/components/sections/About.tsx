"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGSAP";
import { fadeInLeft, fadeInRight, fadeInUp } from "@/components/animations/gsap-utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DIFERENCIAIS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Independência",
    description: "Não somos banco. Trabalhamos para você, negociando com mais de 15 instituições para encontrar a melhor oferta.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Agilidade",
    description: "Processos otimizados e relacionamento direto com as mesas de crédito para aprovação em tempo recorde.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Atendimento consultivo",
    description: "Cada cliente é único. Nossos especialistas acompanham toda a jornada, da simulação à liberação do crédito.",
  },
];

export function About() {
  const containerRef = useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    fadeInLeft(".about-text", container, { duration: 0.8 });
    fadeInRight(".about-image", container, { duration: 0.8 });
    fadeInUp(".about-diferencial", container, { stagger: 0.15, duration: 0.6 });
  });

  return (
    <section
      ref={containerRef}
      id="sobre"
      className="py-24 md:py-32 bg-[var(--bg-primary)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Top: text + image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column — text */}
          <div className="about-text">
            <span className="text-label text-accent uppercase tracking-[3px] font-body font-semibold">
              Quem Somos
            </span>

            <h2 className="font-heading text-h2 text-[var(--text-primary)] mt-2 mb-6 font-light">
              Altiv Capital Imobiliário
            </h2>

            <p className="text-body-base text-[var(--text-secondary)] mb-4 max-w-lg">
              Nascemos da convicção de que o acesso ao crédito no Brasil pode ser
              mais transparente, ágil e personalizado. Desde a nossa fundação,
              atuamos como uma consultoria financeira independente, conectando
              pessoas e empresas às melhores condições do mercado.
            </p>

            <p className="text-body-base text-[var(--text-secondary)] mb-10 max-w-lg">
              Nossa equipe reúne especialistas com sólida experiência no mercado
              financeiro e imobiliário, oferecendo atendimento consultivo e
              gestão completa da operação — da análise de perfil até a liberação
              do recurso.
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
                  850+
                </span>
                <span className="text-xs uppercase text-[var(--text-tertiary)] tracking-[2px] font-body">
                  Clientes atendidos
                </span>
              </div>
              <div>
                <span className="text-h3 font-semibold text-accent font-heading block">
                  15+
                </span>
                <span className="text-xs uppercase text-[var(--text-tertiary)] tracking-[2px] font-body">
                  Bancos parceiros
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
                aria-hidden="true"
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
                Foto do escritório / equipe
              </span>
            </div>
          </div>
        </div>

        {/* Bottom: diferenciais cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          {DIFERENCIAIS.map((item) => (
            <div
              key={item.title}
              className="about-diferencial rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-8 flex flex-col gap-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                {item.icon}
              </div>
              <h3 className="text-body-base font-medium text-[var(--text-primary)]">
                {item.title}
              </h3>
              <p className="text-small text-[var(--text-secondary)] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
