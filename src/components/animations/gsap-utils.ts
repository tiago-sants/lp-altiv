import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ANIMATION_DEFAULTS = {
  duration: 0.8,
  transitionDuration: 0.4,
  easeIn: "power2.out",
  easeTransition: "power2.inOut",
  stagger: 0.15,
  delay: 0.2,
};

export function fadeInUp(elements: gsap.TweenTarget, trigger: string | Element, options?: { stagger?: number; duration?: number; delay?: number }) {
  return gsap.from(elements, {
    y: 40, opacity: 0,
    duration: options?.duration ?? ANIMATION_DEFAULTS.duration,
    stagger: options?.stagger ?? ANIMATION_DEFAULTS.stagger,
    delay: options?.delay ?? 0,
    ease: ANIMATION_DEFAULTS.easeIn,
    scrollTrigger: { trigger, start: "top 80%", toggleActions: "play none none none" },
  });
}

export function fadeInLeft(elements: gsap.TweenTarget, trigger: string | Element, options?: { stagger?: number; duration?: number }) {
  return gsap.from(elements, {
    x: -60, opacity: 0,
    duration: options?.duration ?? ANIMATION_DEFAULTS.duration,
    stagger: options?.stagger ?? ANIMATION_DEFAULTS.stagger,
    ease: ANIMATION_DEFAULTS.easeIn,
    scrollTrigger: { trigger, start: "top 80%", toggleActions: "play none none none" },
  });
}

export function fadeInRight(elements: gsap.TweenTarget, trigger: string | Element, options?: { duration?: number }) {
  return gsap.from(elements, {
    x: 60, opacity: 0,
    duration: options?.duration ?? ANIMATION_DEFAULTS.duration,
    ease: ANIMATION_DEFAULTS.easeIn,
    scrollTrigger: { trigger, start: "top 80%", toggleActions: "play none none none" },
  });
}

export function countUp(element: HTMLElement, endValue: number, trigger: string | Element, duration = 2) {
  const obj = { val: 0 };
  return gsap.to(obj, {
    val: endValue, duration, ease: "power1.out",
    scrollTrigger: { trigger, start: "top 80%", toggleActions: "play none none none" },
    onUpdate: () => { element.textContent = Math.floor(obj.val).toString(); },
  });
}

export function createParallax(element: gsap.TweenTarget, trigger: string | Element, yOffset = -50) {
  return gsap.to(element, {
    y: yOffset, ease: "none",
    scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true },
  });
}

export function withDesktopOnly(desktopCallback: () => void, mobileCallback?: () => void) {
  const mm = gsap.matchMedia();
  mm.add("(min-width: 768px)", desktopCallback);
  if (mobileCallback) mm.add("(max-width: 767px)", mobileCallback);
  return mm;
}
