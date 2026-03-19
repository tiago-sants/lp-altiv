"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { WHATSAPP_LINKS, assetPath } from "@/lib/constants";
import { useGSAP } from "@/hooks/useGSAP";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);

  const containerRef = useGSAP(() => {
    // Text elements fade+slide from left with stagger
    const textElements = gsap.utils.toArray<HTMLElement>(".hero-animate");
    gsap.from(textElements, {
      x: -60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      delay: 0.3,
      ease: "power2.out",
    });

    // Image parallax (desktop only)
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });
  });

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex items-center bg-[var(--bg-primary)] overflow-hidden"
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-6">
            <span className="hero-animate text-label text-accent uppercase tracking-[3px] font-body font-semibold">
              <span className="hidden md:inline">Crédito Imobiliário &amp; Consultoria Financeira</span>
              <span className="md:hidden text-center block">Crédito Imobiliário<br />&amp;<br />Consultoria Financeira</span>
            </span>

            <h1 className="hero-animate font-heading text-h2 md:text-h1 lg:text-display font-light leading-tight">
              Seu patrimônio{" "}
              <span className="text-accent">merece uma estratégia</span>{" "}
              a altura.
            </h1>

            <p className="hero-animate text-body-base text-[var(--text-secondary)] max-w-xl">
              Conectamos você aos principais bancos do mercado para financiamento
              imobiliário, crédito com garantia de imóvel e soluções financeiras
              sob medida.
            </p>

            <div className="hero-animate flex flex-wrap gap-4 mt-2">
              <Button
                href={WHATSAPP_LINKS.hero}
                variant="solid"
                external
                ariaLabel="Falar com especialista no WhatsApp"
              >
                FALAR COM ESPECIALISTA
              </Button>
              <Button
                href="#contato"
                variant="outlined"
                ariaLabel="Ir para simulação de crédito"
              >
                SIMULAR CRÉDITO
              </Button>
            </div>
          </div>

          {/* Right Column — image placeholder */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <div
              ref={imageRef}
              className="hero-animate w-full max-w-md aspect-[4/5] rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center p-12"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assetPath("/images/symbol-black.png")}
                alt="Altiv Capital Imobiliário"
                className="w-full h-auto object-contain drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ScrollIndicator />
      </div>
    </section>
  );
}
