"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/constants";
import { useGSAP } from "@/hooks/useGSAP";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Services() {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedMobile, setExpandedMobile] = useState<number | null>(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileContentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isAnimating = useRef(false);

  const containerRef = useGSAP(() => {
    const header = document.querySelector(".services-header");
    if (header) {
      gsap.from(header, {
        y: 40, opacity: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: header, start: "top 80%", toggleActions: "play none none none" },
      });
    }

    // Mobile cards stagger entrance
    const mobileCards = gsap.utils.toArray<HTMLElement>(".service-card-mobile");
    if (mobileCards.length) {
      gsap.from(mobileCards, {
        y: 60, opacity: 0, duration: 0.6, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: mobileCards[0], start: "top 85%", toggleActions: "play none none none" },
      });
    }
  });

  // ── Desktop tab animation ──
  const animateTabChange = useCallback((newIndex: number) => {
    if (isAnimating.current || newIndex === activeTab) return;
    isAnimating.current = true;

    const panel = panelRef.current;
    if (!panel) { setActiveTab(newIndex); isAnimating.current = false; return; }

    const tl = gsap.timeline({ onComplete: () => { isAnimating.current = false; } });

    tl.to(panel.children, {
      opacity: 0, y: 20, duration: 0.25, stagger: 0.05, ease: "power2.in",
      onComplete: () => { setActiveTab(newIndex); },
    });

    tl.fromTo(panel.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.08, ease: "power2.out", delay: 0.05 }
    );
  }, [activeTab]);

  // ── Mobile accordion animation ──
  const toggleMobileCard = useCallback((index: number) => {
    const contentEl = mobileContentRefs.current[index];
    if (!contentEl) return;

    if (expandedMobile === index) {
      gsap.to(contentEl, { height: 0, opacity: 0, duration: 0.4, ease: "power3.inOut",
        onComplete: () => setExpandedMobile(null),
      });
    } else {
      // Close previous
      if (expandedMobile !== null) {
        const prevEl = mobileContentRefs.current[expandedMobile];
        if (prevEl) gsap.to(prevEl, { height: 0, opacity: 0, duration: 0.3, ease: "power3.inOut" });
      }

      // Open new
      setExpandedMobile(index);
      gsap.set(contentEl, { height: "auto", opacity: 1 });
      const fullHeight = contentEl.scrollHeight;
      gsap.fromTo(contentEl,
        { height: 0, opacity: 0 },
        { height: fullHeight, opacity: 1, duration: 0.5, ease: "power3.out" }
      );

      // Stagger content children
      const children = contentEl.querySelectorAll(".card-content-item");
      gsap.fromTo(children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, delay: 0.15, ease: "power2.out" }
      );
    }
  }, [expandedMobile]);

  // ── Desktop keyboard nav ──
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let newIndex = activeTab;
      if (e.key === "ArrowRight") { e.preventDefault(); newIndex = (activeTab + 1) % SERVICES.length; }
      else if (e.key === "ArrowLeft") { e.preventDefault(); newIndex = (activeTab - 1 + SERVICES.length) % SERVICES.length; }
      else if (e.key === "Home") { e.preventDefault(); newIndex = 0; }
      else if (e.key === "End") { e.preventDefault(); newIndex = SERVICES.length - 1; }
      else return;
      animateTabChange(newIndex);
      tabRefs.current[newIndex]?.focus();
    },
    [activeTab, animateTabChange]
  );

  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, SERVICES.length);
    mobileContentRefs.current = mobileContentRefs.current.slice(0, SERVICES.length);
    // First mobile card open by default
    const firstContent = mobileContentRefs.current[0];
    if (firstContent) gsap.set(firstContent, { height: "auto", opacity: 1 });
  }, []);

  const activeService = SERVICES[activeTab];

  return (
    <section ref={containerRef} id="servicos" className="py-24 md:py-32 bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="services-header">
          <SectionTitle label="Nossas Solucoes" title="Servicos" />
        </div>

        {/* ═══ MOBILE: Accordion Cards ═══ */}
        <div className="lg:hidden flex flex-col gap-3">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="service-card-mobile rounded-xl border border-[var(--border)] overflow-hidden transition-colors duration-300"
              style={{
                background: expandedMobile === index
                  ? "linear-gradient(135deg, color-mix(in srgb, var(--accent) 8%, var(--bg-card)), var(--bg-card))"
                  : "var(--bg-card)",
              }}
            >
              {/* Card header */}
              <button
                onClick={() => toggleMobileCard(index)}
                aria-expanded={expandedMobile === index}
                className="w-full flex items-center gap-4 px-5 py-4 text-left"
              >
                <span className={`font-heading text-h3 font-bold transition-colors duration-300 ${
                  expandedMobile === index ? "text-accent" : "text-[var(--text-muted)]"
                }`}>
                  {service.number}
                </span>
                <span className={`flex-1 font-body text-body-base font-medium transition-colors duration-300 ${
                  expandedMobile === index ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
                }`}>
                  {service.title}
                </span>
                <span className={`transition-transform duration-300 ${expandedMobile === index ? "rotate-180" : ""}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className={expandedMobile === index ? "text-accent" : "text-[var(--text-muted)]"} />
                  </svg>
                </span>
              </button>

              {/* Expandable content */}
              <div
                ref={(el) => { mobileContentRefs.current[index] = el; }}
                className="overflow-hidden"
                style={{ height: index === 0 ? "auto" : 0, opacity: index === 0 ? 1 : 0 }}
              >
                <div className="px-5 pb-5 pt-1">
                  <div className="card-content-item w-12 h-[2px] bg-accent mb-4 rounded-full" />
                  <p className="card-content-item text-small text-[var(--text-secondary)] mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="card-content-item flex flex-col gap-2 mb-5">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-small text-[var(--text-primary)]">
                        <span className="text-accent font-bold">/</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="card-content-item">
                    <Button href="#contato" variant="outlined" className="text-xs px-6 py-3 w-full justify-center">
                      {service.cta}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ═══ DESKTOP: Tabs ═══ */}
        <div className="hidden lg:block">
          <div
            role="tablist"
            aria-label="Servicos disponiveis"
            className="flex border-b border-[var(--border)] mb-12"
            onKeyDown={handleKeyDown}
          >
            {SERVICES.map((service, index) => (
              <button
                key={service.id}
                ref={(el) => { tabRefs.current[index] = el; }}
                role="tab"
                id={`tab-${service.id}`}
                aria-selected={activeTab === index}
                aria-controls={`panel-${service.id}`}
                tabIndex={activeTab === index ? 0 : -1}
                onClick={() => animateTabChange(index)}
                className={`flex-shrink-0 px-6 py-4 font-body text-small whitespace-nowrap transition-colors duration-300 border-b-2 ${
                  activeTab === index
                    ? "border-accent text-accent"
                    : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {service.number} &mdash; {service.title}
              </button>
            ))}
          </div>

          <div
            ref={panelRef}
            role="tabpanel"
            id={`panel-${activeService.id}`}
            aria-labelledby={`tab-${activeService.id}`}
            tabIndex={0}
            className="grid grid-cols-2 gap-16 min-h-[400px]"
          >
            <div className="flex flex-col justify-center gap-6">
              <h3 className="font-heading text-h3 text-[var(--text-primary)]">{activeService.title}</h3>
              <p className="text-body-base text-[var(--text-secondary)] max-w-lg">{activeService.description}</p>
              <ul className="flex flex-col gap-3">
                {activeService.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-body-base text-[var(--text-primary)]">
                    <span className="text-accent font-heading font-bold mt-0.5">/</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-2">
                <Button href="#contato" variant="outlined" ariaLabel={activeService.cta}>{activeService.cta}</Button>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-full max-w-md aspect-[4/3] rounded-xl bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-surface)] flex flex-col items-center justify-center gap-4 border border-[var(--border)]">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-[var(--text-muted)]" aria-hidden="true">
                  <rect x="4" y="4" width="40" height="40" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
                  <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M4 32l12-12 8 8 8-8 12 12" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
                <span className="text-small text-[var(--text-muted)] font-body uppercase tracking-widest">{activeService.title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
