"use client";

import { useState, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FAQ_ITEMS } from "@/lib/constants";
import { useGSAP } from "@/hooks/useGSAP";
import { fadeInUp } from "@/components/animations/gsap-utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const containerRef = useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    fadeInUp(".faq-header", container);
    fadeInUp(".faq-item", container, { stagger: 0.1 });
  });

  const toggleItem = useCallback(
    (index: number) => {
      const currentContent = openIndex !== null ? contentRefs.current[openIndex] : null;
      const newContent = contentRefs.current[index];

      // Closing the currently open item
      if (openIndex === index) {
        if (currentContent) {
          gsap.to(currentContent, {
            height: 0,
            duration: 0.4,
            ease: "power2.inOut",
            onComplete: () => {
              setOpenIndex(null);
            },
          });
        } else {
          setOpenIndex(null);
        }
        return;
      }

      // Close previous item (if any)
      if (currentContent && openIndex !== null) {
        gsap.to(currentContent, {
          height: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });
      }

      // Open new item
      setOpenIndex(index);
      if (newContent) {
        // Temporarily set to auto to measure
        gsap.set(newContent, { height: "auto" });
        const targetHeight = newContent.scrollHeight;
        gsap.fromTo(
          newContent,
          { height: 0 },
          {
            height: targetHeight,
            duration: 0.4,
            ease: "power2.inOut",
          }
        );
      }
    },
    [openIndex]
  );

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-32 bg-[var(--bg-surface)]"
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-12">
        {/* Header */}
        <div className="faq-header text-center mb-16">
          <h2 className="font-heading text-h2 text-[var(--text-primary)] font-light">
            Perguntas Frequentes
          </h2>
        </div>

        {/* Accordion */}
        <div>
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-button-${index}`;
            const contentId = `faq-content-${index}`;

            return (
              <div
                key={index}
                className="faq-item border-t border-[var(--border)]"
              >
                {/* Question button */}
                <button
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <span className="text-body-base text-[var(--text-primary)] pr-4">
                    {item.question}
                  </span>
                  <span
                    className={`flex-shrink-0 text-[var(--text-secondary)] text-xl leading-none transition-transform duration-300 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                {/* Answer content */}
                <div
                  id={contentId}
                  ref={(el) => { contentRefs.current[index] = el; }}
                  role="region"
                  aria-labelledby={buttonId}
                  className="overflow-hidden"
                  style={{ height: isOpen ? "auto" : 0 }}
                >
                  <p className="text-small text-[var(--text-secondary)] pb-5">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
