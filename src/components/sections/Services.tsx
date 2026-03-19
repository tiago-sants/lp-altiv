"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { SERVICES, WHATSAPP_LINKS } from "@/lib/constants";
import { useGSAP } from "@/hooks/useGSAP";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Services() {
  const [activeTab, setActiveTab] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isAnimating = useRef(false);

  const containerRef = useGSAP(() => {
    // Header fades in on scroll
    const header = document.querySelector(".services-header");
    if (header) {
      gsap.from(header, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: header,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }
  });

  const animateTabChange = useCallback((newIndex: number) => {
    if (isAnimating.current || newIndex === activeTab) return;
    isAnimating.current = true;

    const panel = panelRef.current;
    if (!panel) {
      setActiveTab(newIndex);
      isAnimating.current = false;
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    // Fade out old content
    tl.to(panel.children, {
      opacity: 0,
      y: 20,
      duration: 0.25,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: () => {
        setActiveTab(newIndex);
      },
    });

    // Fade in new content (after React re-renders with new tab)
    tl.fromTo(
      panel.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.35,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.05,
      }
    );
  }, [activeTab]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let newIndex = activeTab;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        newIndex = (activeTab + 1) % SERVICES.length;
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        newIndex = (activeTab - 1 + SERVICES.length) % SERVICES.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        newIndex = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        newIndex = SERVICES.length - 1;
      } else {
        return;
      }

      animateTabChange(newIndex);
      tabRefs.current[newIndex]?.focus();
    },
    [activeTab, animateTabChange]
  );

  // Focus management for roving tabindex
  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, SERVICES.length);
  }, []);

  const activeService = SERVICES[activeTab];

  return (
    <section
      ref={containerRef}
      id="servicos"
      className="py-24 md:py-32 bg-[var(--bg-primary)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="services-header">
          <SectionTitle label="Nossas Solucoes" title="Servicos" />
        </div>

        {/* Tab bar */}
        <div
          role="tablist"
          aria-label="Servicos disponiveis"
          className="flex overflow-x-auto scrollbar-hide border-b border-[var(--border)] mb-12 -mx-6 px-6 lg:mx-0 lg:px-0"
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

        {/* Tab panel */}
        <div
          ref={panelRef}
          role="tabpanel"
          id={`panel-${activeService.id}`}
          aria-labelledby={`tab-${activeService.id}`}
          tabIndex={0}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 min-h-[400px]"
        >
          {/* Left — content */}
          <div className="flex flex-col justify-center gap-6">
            <h3 className="font-heading text-h3 text-[var(--text-primary)]">
              {activeService.title}
            </h3>
            <p className="text-body-base text-[var(--text-secondary)] max-w-lg">
              {activeService.description}
            </p>
            <ul className="flex flex-col gap-3">
              {activeService.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-body-base text-[var(--text-primary)]"
                >
                  <span className="text-accent font-heading font-bold mt-0.5">
                    /
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-2">
              <Button
                href={WHATSAPP_LINKS.contact}
                variant="outlined"
                external
                ariaLabel={activeService.cta}
              >
                {activeService.cta}
              </Button>
            </div>
          </div>

          {/* Right — image placeholder */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md aspect-[4/3] rounded-xl bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-surface)] flex flex-col items-center justify-center gap-4 border border-[var(--border)]">
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
                <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
                <path
                  d="M4 32l12-12 8 8 8-8 12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <span className="text-small text-[var(--text-muted)] font-body uppercase tracking-widest">
                {activeService.title}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
