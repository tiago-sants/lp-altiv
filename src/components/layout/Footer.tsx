"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/useGSAP";
import { fadeInUp } from "@/components/animations/gsap-utils";
import { SERVICES, WHATSAPP_LINKS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EMPRESA_LINKS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

export function Footer() {
  const containerRef = useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    fadeInUp(".footer-col", container, { stagger: 0.1, duration: 0.6 });
  });

  return (
    <footer
      ref={containerRef}
      id="footer"
      className="bg-[var(--bg-surface)] border-t border-[var(--border)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1 — Logo */}
          <div className="footer-col">
            <a href="#" className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.svg"
                alt="Altiv logo"
                width={36}
                height={36}
              />
              <div className="flex flex-col leading-none">
                <span className="font-heading text-h4 font-semibold text-[var(--text-primary)]">
                  ALTIV
                </span>
                <span className="text-xs text-accent tracking-widest">
                  Capital Imobiliario
                </span>
              </div>
            </a>
            <p className="text-small text-[var(--text-tertiary)] max-w-[220px]">
              Seu patrimonio merece uma estrategia a altura.
            </p>
          </div>

          {/* Column 2 — Servicos */}
          <div className="footer-col">
            <h4 className="text-label text-accent uppercase tracking-[3px] font-body font-semibold mb-4">
              Servicos
            </h4>
            <ul className="space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <a
                    href="#servicos"
                    className="text-small text-[var(--text-secondary)] hover:text-accent transition-colors duration-300 font-body"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Empresa */}
          <div className="footer-col">
            <h4 className="text-label text-accent uppercase tracking-[3px] font-body font-semibold mb-4">
              Empresa
            </h4>
            <ul className="space-y-2.5">
              {EMPRESA_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-small text-[var(--text-secondary)] hover:text-accent transition-colors duration-300 font-body"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contato */}
          <div className="footer-col">
            <h4 className="text-label text-accent uppercase tracking-[3px] font-body font-semibold mb-4">
              Contato
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={WHATSAPP_LINKS.floating}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-small text-[var(--text-secondary)] hover:text-accent transition-colors duration-300 font-body"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-small text-[var(--text-secondary)] hover:text-accent transition-colors duration-300 font-body"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-small text-[var(--text-secondary)] hover:text-accent transition-colors duration-300 font-body"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@altiv.com.br"
                  className="text-small text-[var(--text-secondary)] hover:text-accent transition-colors duration-300 font-body"
                >
                  contato@altiv.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-tertiary)] font-body">
            &copy; 2026 Altiv Capital Imobiliario. Todos os direitos reservados.
          </p>
          <a
            href="#"
            className="text-xs text-[var(--text-tertiary)] hover:text-accent transition-colors duration-300 font-body"
          >
            Politica de Privacidade
          </a>
        </div>
      </div>
    </footer>
  );
}
