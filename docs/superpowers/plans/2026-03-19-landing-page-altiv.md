# Altiv Capital Imobiliario — Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium, scroll-driven landing page for Altiv Capital Imobiliario with GSAP animations, dark/light theme, and conversion-focused CTAs.

**Architecture:** Next.js 14 App Router with Tailwind CSS for styling, GSAP + ScrollTrigger for scroll-driven animations, and semantic CSS custom properties for theme switching. All content is static (no CMS), stored in `lib/constants.ts`.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS 3, GSAP 3 (free tier), ScrollTrigger

**Spec:** `docs/superpowers/specs/2026-03-19-landing-page-altiv-design.md`

---

## File Map

| File | Responsibility |
|---|---|
| `src/app/layout.tsx` | Root layout, fonts, metadata, theme provider, Schema.org |
| `src/app/page.tsx` | Home page — composes all sections |
| `src/app/not-found.tsx` | Custom 404 page |
| `src/app/globals.css` | CSS custom properties (tokens), reset, theme classes, font-face |
| `src/app/api/contact/route.ts` | Contact form API endpoint |
| `src/lib/constants.ts` | All static data: services, FAQ, testimonials, nav links, counters |
| `src/app/sitemap.ts` | Auto-generated sitemap |
| `src/hooks/useGSAP.ts` | GSAP hook with cleanup |
| `src/hooks/useTheme.ts` | Theme toggle hook (localStorage + system pref) |
| `src/components/animations/gsap-utils.ts` | Reusable GSAP animation helpers (fadeIn, slideIn, stagger, countUp) |
| `src/components/ui/Button.tsx` | Button variants: solid gold, outlined gold, outlined white, WhatsApp green |
| `src/components/ui/SectionTitle.tsx` | Reusable section title (label + heading) |
| `src/components/ui/ThemeToggle.tsx` | Sun/moon toggle button |
| `src/components/ui/ScrollIndicator.tsx` | Animated scroll-down arrow |
| `src/components/layout/Navbar.tsx` | Fixed navbar with scroll effect, mobile hamburger |
| `src/components/layout/Footer.tsx` | 4-column footer |
| `src/components/layout/WhatsAppButton.tsx` | Floating WhatsApp button |
| `src/components/sections/Hero.tsx` | Hero section with parallax |
| `src/components/sections/Services.tsx` | Tabbed services with GSAP transitions |
| `src/components/sections/Numbers.tsx` | Animated counters on gold gradient |
| `src/components/sections/HowItWorks.tsx` | Timeline with ScrollTrigger pin |
| `src/components/sections/Testimonials.tsx` | GSAP carousel |
| `src/components/sections/About.tsx` | Split-screen about section |
| `src/components/sections/FAQ.tsx` | Accordion with GSAP expand/collapse |
| `src/components/sections/ContactForm.tsx` | Form + WhatsApp CTA |
| `public/fonts/` | Conthrax Sb, Nord (.woff2) |
| `public/logo.svg` | Altiv logo SVG |

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.js`, `postcss.config.js`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- Create: `.gitignore`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd "/c/Projetos Tiago/lp-altiv"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Select defaults when prompted. This creates the full Next.js + Tailwind + TypeScript setup.

- [ ] **Step 2: Install GSAP**

```bash
npm install gsap
```

- [ ] **Step 3: Verify the dev server starts**

```bash
npm run dev
```

Expected: Server starts on `http://localhost:3000` with the default Next.js page.

- [ ] **Step 4: Clean up default files**

Remove default content from `src/app/page.tsx` (replace with empty `<main>` placeholder). Remove default styles from `src/app/globals.css` (keep only Tailwind directives). Remove default favicon and images from `public/`.

- [ ] **Step 5: Create directory structure**

```bash
mkdir -p src/components/layout src/components/sections src/components/ui src/components/animations src/hooks src/lib public/fonts public/images
```

- [ ] **Step 6: Commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Next.js 14 project with Tailwind and GSAP"
```

---

### Task 2: Design Tokens, Theme System & Fonts

**Files:**
- Create: `src/app/globals.css` (overwrite)
- Create: `src/hooks/useTheme.ts` (theme config lives here + CSS tokens in globals.css; spec's `lib/theme.ts` intentionally omitted)
- Create: `src/components/ui/ThemeToggle.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Add font files to public/fonts/**

Place `conthrax-sb.woff2` and `nord.woff2` in `public/fonts/`. If .woff2 files are not available, use .ttf or .otf and convert later. As a fallback during development, use Google Fonts alternatives: `Orbitron` (similar to Conthrax) and `Inter` (similar to Nord).

- [ ] **Step 2: Write globals.css with tokens and font-face**

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@font-face {
  font-family: 'Conthrax';
  src: url('/fonts/conthrax-sb.woff2') format('woff2');
  font-weight: 600;
  font-display: swap;
}

@font-face {
  font-family: 'Nord';
  src: url('/fonts/nord.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}

@layer base {
  :root {
    /* Theme: Dark (default) */
    --accent: #C8A862;
    --accent-dark: #846030;
    --bg-primary: #000000;
    --bg-surface: #0a0a0a;
    --bg-card: #111111;
    --border: #222222;
    --text-primary: #FFFFFF;
    --text-secondary: #888888;
    --text-tertiary: #666666;
    --text-muted: #444444;

    /* Typography scale */
    --text-display: 48px;
    --text-h1: 42px;
    --text-h2: 36px;
    --text-h3: 28px;
    --text-h4: 24px;
    --text-body: 16px;
    --text-body-lg: 18px;
    --text-small: 14px;
    --text-xs: 12px;
    --text-label: 11px;
  }

  .light {
    --accent: #C8A862;
    --accent-dark: #846030;
    --bg-primary: #FFFFFF;
    --bg-surface: #F5F5F0;
    --bg-card: #EEEEEE;
    --border: #DDDDDD;
    --text-primary: #0A0A0A;
    --text-secondary: #555555;
    --text-tertiary: #777777;
    --text-muted: #999999;
  }

  body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    font-family: 'Nord', 'Inter', sans-serif;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  /* Focus visible */
  *:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}
```

- [ ] **Step 3: Update tailwind.config.ts with custom theme**

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        accent: "var(--accent)",
        "accent-dark": "var(--accent-dark)",
        "bg-primary": "var(--bg-primary)",
        "bg-surface": "var(--bg-surface)",
        "bg-card": "var(--bg-card)",
        border: "var(--border)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-tertiary": "var(--text-tertiary)",
        "text-muted": "var(--text-muted)",
        whatsapp: "#25D366",
      },
      fontFamily: {
        heading: ["'Conthrax'", "'Orbitron'", "sans-serif"],
        body: ["'Nord'", "'Inter'", "sans-serif"],
      },
      fontSize: {
        display: ["var(--text-display)", { lineHeight: "1.1" }],
        h1: ["var(--text-h1)", { lineHeight: "1.1" }],
        h2: ["var(--text-h2)", { lineHeight: "1.2" }],
        h3: ["var(--text-h3)", { lineHeight: "1.3" }],
        h4: ["var(--text-h4)", { lineHeight: "1.3" }],
        "body-lg": ["var(--text-body-lg)", { lineHeight: "1.7" }],
        "body-base": ["var(--text-body)", { lineHeight: "1.6" }],
        small: ["var(--text-small)", { lineHeight: "1.5" }],
        xs: ["var(--text-xs)", { lineHeight: "1.5" }],
        label: ["var(--text-label)", { lineHeight: "1" }],
      },
      borderRadius: {
        pill: "107px",
      },
      zIndex: {
        "whatsapp": "45",
        "navbar": "50",
        "mobile-menu": "55",
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 4: Create theme hook**

```typescript
// src/hooks/useTheme.ts
"use client";
import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = localStorage.getItem("altiv-theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("altiv-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, toggleTheme };
}
```

- [ ] **Step 5: Create ThemeToggle component**

```tsx
// src/components/ui/ThemeToggle.tsx
"use client";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
      className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border)] hover:border-accent transition-colors"
    >
      {theme === "dark" ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      )}
    </button>
  );
}
```

- [ ] **Step 6: Update layout.tsx with fonts, metadata, and theme**

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Altiv Capital Imobiliario — Credito Imobiliario e Consultoria Financeira",
  description: "Financiamento imobiliario, home equity e solucoes financeiras sob medida. Conectamos voce aos melhores bancos com taxas competitivas e aprovacao agil.",
  openGraph: {
    title: "Altiv Capital Imobiliario",
    description: "Seu patrimonio merece uma estrategia a altura. Credito imobiliario e consultoria financeira premium.",
    images: ["/images/og-image.jpg"],
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/conthrax-sb.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/nord.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var t = localStorage.getItem('altiv-theme');
              if (t === 'light') document.documentElement.classList.add('light');
              else if (!t && window.matchMedia('(prefers-color-scheme: light)').matches) document.documentElement.classList.add('light');
            })();
          `,
        }} />
      </head>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 7: Verify theme toggle works**

```bash
npm run dev
```

Open `http://localhost:3000`, add `<ThemeToggle />` temporarily to `page.tsx`, verify dark/light switching works and persists on reload.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add design tokens, theme system, fonts, and ThemeToggle"
```

---

### Task 3: Static Data & GSAP Utilities

**Files:**
- Create: `src/lib/constants.ts`
- Create: `src/hooks/useGSAP.ts`
- Create: `src/components/animations/gsap-utils.ts`

- [ ] **Step 1: Create constants.ts with all static data**

```typescript
// src/lib/constants.ts

export const NAV_LINKS = [
  { label: "Servicos", href: "#servicos" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export const SERVICES = [
  {
    id: "financiamento-imobiliario",
    number: "01",
    title: "Financiamento Imobiliario",
    description: "Realize o sonho da casa propria ou expanda seu portfolio imobiliario com as melhores condicoes do mercado. Negociamos diretamente com os maiores bancos para garantir taxas competitivas e aprovacao agil.",
    features: [
      "Taxas a partir de 9,5% a.a.",
      "Financiamento ate 80% do imovel",
      "Prazo de ate 35 anos",
      "Parceria com +15 bancos",
    ],
    cta: "SIMULAR FINANCIAMENTO",
  },
  {
    id: "home-equity",
    number: "02",
    title: "Home Equity",
    description: "Transforme seu imovel em capital de giro, investimento ou realizacao pessoal. O credito com garantia de imovel oferece as menores taxas do mercado com prazos estendidos.",
    features: [
      "Taxas a partir de 0,85% a.m.",
      "Ate 60% do valor do imovel",
      "Prazo de ate 20 anos",
      "Liberacao em ate 30 dias",
    ],
    cta: "SIMULAR HOME EQUITY",
  },
  {
    id: "pronampe",
    number: "03",
    title: "Pronampe",
    description: "Facilitamos o acesso ao credito do Programa Nacional de Apoio as Microempresas e Empresas de Pequeno Porte. Taxas subsidiadas e condicoes exclusivas para o seu negocio crescer.",
    features: [
      "Taxa Selic + 6% a.a.",
      "Ate R$ 150 mil por CNPJ",
      "Carencia de ate 12 meses",
      "Prazo de ate 48 meses",
    ],
    cta: "SIMULAR PRONAMPE",
  },
  {
    id: "financiamento-veicular",
    number: "04",
    title: "Financiamento Veicular",
    description: "Adquira seu veiculo com as melhores condicoes. Comparamos ofertas de multiplas instituicoes para encontrar a taxa ideal para o seu perfil.",
    features: [
      "Taxas competitivas",
      "Financiamento ate 100% do veiculo",
      "Prazo de ate 60 meses",
      "Aprovacao rapida",
    ],
    cta: "SIMULAR FINANCIAMENTO",
  },
  {
    id: "investimentos",
    number: "05",
    title: "Investimentos",
    description: "Assessoria especializada para diversificar seu patrimonio com seguranca. Opcoes que vao de renda fixa a fundos imobiliarios, alinhadas ao seu perfil de risco.",
    features: [
      "Renda fixa e variavel",
      "Fundos imobiliarios",
      "Planejamento patrimonial",
      "Assessoria personalizada",
    ],
    cta: "FALAR COM ASSESSOR",
  },
];

export const COUNTERS = [
  { value: 200, prefix: "R$ ", suffix: "M+", label: "Em credito aprovado" },
  { value: 850, prefix: "", suffix: "+", label: "Clientes atendidos" },
  { value: 15, prefix: "", suffix: "+", label: "Bancos parceiros" },
  { value: 98, prefix: "", suffix: "%", label: "Aprovacao" },
];

export const STEPS = [
  {
    number: "01",
    title: "Contato Inicial",
    description: "Voce nos procura pelo WhatsApp ou formulario. Entendemos sua necessidade.",
  },
  {
    number: "02",
    title: "Analise & Simulacao",
    description: "Analisamos seu perfil e simulamos as melhores opcoes em dezenas de bancos.",
  },
  {
    number: "03",
    title: "Documentacao",
    description: "Cuidamos de toda a burocracia. Voce so assina.",
  },
  {
    number: "04",
    title: "Credito Aprovado",
    description: "Recurso liberado na sua conta. Objetivo alcancado.",
  },
];

export const TESTIMONIALS = [
  {
    quote: "A Altiv transformou o que parecia impossivel em realidade. Em menos de 45 dias, tive meu financiamento aprovado com uma taxa que nenhum banco me ofereceu diretamente.",
    name: "Carlos Eduardo M.",
    role: "Empresario",
    detail: "Financiamento de R$ 1.2M",
  },
  {
    quote: "Precisava de capital de giro urgente e a equipe da Altiv conseguiu aprovar meu Home Equity em tempo recorde. Profissionalismo e transparencia do inicio ao fim.",
    name: "Marina S.",
    role: "Investidora",
    detail: "Home Equity de R$ 800K",
  },
  {
    quote: "O atendimento personalizado fez toda a diferenca. Nao fui mais um numero — eles entenderam meu momento e encontraram a melhor solucao.",
    name: "Ricardo A.",
    role: "Medico",
    detail: "Financiamento de R$ 2.5M",
  },
];

export const FAQ_ITEMS = [
  {
    question: "Qual o valor minimo para financiamento?",
    answer: "O valor minimo varia conforme o produto. Para financiamento imobiliario, a partir de R$ 150 mil. Para Home Equity, a partir de R$ 100 mil. Entre em contato para uma simulacao personalizada.",
  },
  {
    question: "Quanto tempo demora a aprovacao?",
    answer: "O prazo varia de 15 a 45 dias uteis, dependendo do produto e da instituicao financeira. Nossa equipe trabalha para acelerar cada etapa do processo.",
  },
  {
    question: "Preciso ter o imovel quitado para usar como garantia?",
    answer: "Nao necessariamente. Imoveis com financiamento ativo podem ser utilizados em algumas modalidades, desde que haja margem de garantia suficiente.",
  },
  {
    question: "A Altiv cobra alguma taxa antecipada?",
    answer: "Nao. A Altiv nao cobra nenhum valor antecipado. Nossa remuneracao e vinculada ao sucesso da operacao.",
  },
  {
    question: "Quais bancos sao parceiros?",
    answer: "Trabalhamos com os principais bancos privados do mercado, incluindo Itau, Bradesco, Santander, BTG Pactual, Inter, entre outros.",
  },
  {
    question: "Posso usar o FGTS no financiamento?",
    answer: "Sim, em modalidades elegiveis o FGTS pode ser utilizado para compor a entrada ou amortizar parcelas. Nossos especialistas orientam sobre a melhor estrategia.",
  },
];

export const CREDIT_OPTIONS = [
  "Financiamento Imobiliario",
  "Home Equity",
  "Pronampe",
  "Financiamento Veicular",
  "Investimentos",
  "Outro",
];

export const WHATSAPP_NUMBER = "55XXXXXXXXXXX"; // Replace with real number before deploy
export const WHATSAPP_LINKS = {
  hero: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, gostaria de falar com um especialista da Altiv.")}`,
  contact: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, gostaria de saber mais sobre as soluções da Altiv.")}`,
  floating: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, gostaria de informações sobre crédito imobiliário.")}`,
};
```

- [ ] **Step 2: Create useGSAP hook**

```typescript
// src/hooks/useGSAP.ts
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGSAP(
  callback: (container: HTMLDivElement) => void,
  deps: React.DependencyList = []
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const ctx = gsap.context(() => {
      callback(container);
    }, container);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
}
```

- [ ] **Step 3: Create GSAP animation helpers**

```typescript
// src/components/animations/gsap-utils.ts
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

export function fadeInUp(
  elements: gsap.TweenTarget,
  trigger: string | Element,
  options?: { stagger?: number; duration?: number; delay?: number }
) {
  return gsap.from(elements, {
    y: 40,
    opacity: 0,
    duration: options?.duration ?? ANIMATION_DEFAULTS.duration,
    stagger: options?.stagger ?? ANIMATION_DEFAULTS.stagger,
    delay: options?.delay ?? 0,
    ease: ANIMATION_DEFAULTS.easeIn,
    scrollTrigger: {
      trigger,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
}

export function fadeInLeft(
  elements: gsap.TweenTarget,
  trigger: string | Element,
  options?: { stagger?: number; duration?: number }
) {
  return gsap.from(elements, {
    x: -60,
    opacity: 0,
    duration: options?.duration ?? ANIMATION_DEFAULTS.duration,
    stagger: options?.stagger ?? ANIMATION_DEFAULTS.stagger,
    ease: ANIMATION_DEFAULTS.easeIn,
    scrollTrigger: {
      trigger,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
}

export function fadeInRight(
  elements: gsap.TweenTarget,
  trigger: string | Element,
  options?: { duration?: number }
) {
  return gsap.from(elements, {
    x: 60,
    opacity: 0,
    duration: options?.duration ?? ANIMATION_DEFAULTS.duration,
    ease: ANIMATION_DEFAULTS.easeIn,
    scrollTrigger: {
      trigger,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
}

export function countUp(
  element: HTMLElement,
  endValue: number,
  trigger: string | Element,
  duration = 2
) {
  const obj = { val: 0 };
  return gsap.to(obj, {
    val: endValue,
    duration,
    ease: "power1.out",
    scrollTrigger: {
      trigger,
      start: "top 80%",
      toggleActions: "play none none none",
    },
    onUpdate: () => {
      element.textContent = Math.floor(obj.val).toString();
    },
  });
}

export function createParallax(
  element: gsap.TweenTarget,
  trigger: string | Element,
  yOffset = -50
) {
  return gsap.to(element, {
    y: yOffset,
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

/**
 * Wraps animations in GSAP matchMedia so pinning and parallax
 * only run on desktop (>= 768px). On mobile, a simpler fallback
 * animation runs instead.
 */
export function withDesktopOnly(
  desktopCallback: () => void,
  mobileCallback?: () => void
) {
  const mm = gsap.matchMedia();
  mm.add("(min-width: 768px)", desktopCallback);
  if (mobileCallback) {
    mm.add("(max-width: 767px)", mobileCallback);
  }
  return mm;
}
```

- [ ] **Step 4: Verify imports work**

```bash
npm run dev
```

Temporarily import `SERVICES` from constants in `page.tsx` and `console.log` it. Verify no errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add static data constants, useGSAP hook, and animation utilities"
```

---

### Task 4: Shared UI Components

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/SectionTitle.tsx`
- Create: `src/components/ui/ScrollIndicator.tsx`
- Create: `public/logo.svg`

- [ ] **Step 1: Create the Altiv logo SVG**

Create `public/logo.svg` — a simplified SVG version of the Altiv triangle "A" logo with building elements. Use the gold gradient (#C8A862 → #846030). This should be a clean, scalable vector.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <defs>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C8A862"/>
      <stop offset="100%" stop-color="#846030"/>
    </linearGradient>
  </defs>
  <path d="M50 5 L5 95 H45 V45 L55 35 V55 H60 V50 H65 V60 H70 V45 H75 V65 H80 V40 H85 V95 H95 Z" fill="url(#gold)"/>
</svg>
```

> **Note:** This is a simplified placeholder. The exact logo should be traced from the branding book PDF for production use.

- [ ] **Step 2: Create Button component**

```tsx
// src/components/ui/Button.tsx
import Link from "next/link";

type ButtonVariant = "solid" | "outlined" | "whatsapp";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
  external?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  solid:
    "bg-gradient-to-br from-accent to-accent-dark text-black hover:brightness-110",
  outlined:
    "border border-accent text-accent hover:bg-accent hover:text-black",
  whatsapp:
    "bg-whatsapp text-white hover:brightness-110",
};

export function Button({
  children,
  href,
  variant = "solid",
  onClick,
  type = "button",
  disabled = false,
  className = "",
  ariaLabel,
  external = false,
}: ButtonProps) {
  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-pill px-8 py-4 font-body text-label font-semibold uppercase tracking-widest transition-all duration-300 ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  if (href) {
    const linkProps = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <Link href={href} className={baseClasses} aria-label={ariaLabel} {...linkProps}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
```

- [ ] **Step 3: Create SectionTitle component**

```tsx
// src/components/ui/SectionTitle.tsx
interface SectionTitleProps {
  label: string;
  title: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionTitle({ label, title, centered = false, light = false }: SectionTitleProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <span
        className={`text-label font-body font-semibold uppercase tracking-[3px] ${
          light ? "text-black" : "text-accent"
        }`}
      >
        {label}
      </span>
      <h2
        className={`font-heading text-display mt-2 font-light ${
          light ? "text-black" : "text-[var(--text-primary)]"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
```

- [ ] **Step 4: Create ScrollIndicator component**

```tsx
// src/components/ui/ScrollIndicator.tsx
export function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-2 animate-bounce">
      <span className="text-label font-body uppercase tracking-[2px] text-accent">
        Scroll
      </span>
      <svg
        width="16"
        height="24"
        viewBox="0 0 16 24"
        fill="none"
        className="text-accent"
      >
        <path
          d="M8 0v20m0 0l6-6m-6 6L2 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
```

- [ ] **Step 5: Verify components render**

Import and render all 3 components temporarily in `page.tsx`. Check they display correctly in the browser.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add Button, SectionTitle, ScrollIndicator UI components and logo SVG"
```

---

### Task 5: Navbar Component

**Files:**
- Create: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Build Navbar with scroll effect and mobile menu**

```tsx
// src/components/layout/Navbar.tsx
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        role="navigation"
        aria-label="Menu principal"
        className={`fixed top-0 left-0 w-full z-navbar transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md border-b border-[var(--border)]"
            : "bg-transparent"
        }`}
        style={scrolled ? { backgroundColor: "color-mix(in srgb, var(--bg-primary) 80%, transparent)" } : undefined}
      >
        <div className="flex items-center justify-between px-6 md:px-8 h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Altiv" width={40} height={40} />
            <div>
              <div className="font-heading text-xl font-bold tracking-[3px] text-[var(--text-primary)]">
                ALTIV
              </div>
              <div className="text-label tracking-[4px] uppercase text-accent">
                Capital Imobiliario
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-small text-[var(--text-secondary)] hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
            <Button href="#contato" variant="solid" className="text-xs px-6 py-3">
              SIMULAR AGORA
            </Button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              className="w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            >
              <span className={`block w-6 h-0.5 bg-[var(--text-primary)] transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-[var(--text-primary)] transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-[var(--text-primary)] transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-mobile-menu bg-[var(--bg-primary)] flex flex-col items-center justify-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-heading text-h2 text-[var(--text-primary)] hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button
            href="#contato"
            variant="solid"
            onClick={() => setMenuOpen(false)}
            className="mt-4"
          >
            SIMULAR AGORA
          </Button>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Add Navbar to page.tsx**

```tsx
// src/app/page.tsx
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <div className="h-screen flex items-center justify-center">
          <h1 className="font-heading text-display text-accent">ALTIV</h1>
        </div>
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify navbar scroll effect and mobile menu**

```bash
npm run dev
```

Test: scroll down → navbar gets backdrop blur. Resize to mobile → hamburger appears. Click hamburger → fullscreen menu opens.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Navbar with scroll effect, mobile menu, and theme toggle"
```

---

### Task 6: Hero Section

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Build Hero section**

```tsx
// src/components/sections/Hero.tsx
"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { WHATSAPP_LINKS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      // Text animations
      gsap.from(textRef.current!.children, {
        x: -60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.3,
      });

      // Image parallax (desktop only via matchMedia)
      gsap.matchMedia().add("(min-width: 768px)", () => {
        gsap.to(imageRef.current!, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col lg:flex-row overflow-hidden bg-[var(--bg-primary)]"
    >
      {/* Left column */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-8 lg:px-16 xl:px-24 pt-24 lg:pt-0">
        <div ref={textRef}>
          <span className="text-label font-body font-semibold uppercase tracking-[3px] text-accent block mb-4">
            Credito Imobiliario & Consultoria Financeira
          </span>

          <h1 className="font-heading text-h2 md:text-h1 lg:text-display font-bold leading-tight mb-5">
            Seu patrimonio{" "}
            <span className="text-accent">merece uma estrategia</span>
            {" "}a altura.
          </h1>

          <p className="text-body-base text-[var(--text-secondary)] max-w-lg mb-8 leading-relaxed">
            Conectamos voce aos principais bancos do mercado para financiamento
            imobiliario, credito com garantia de imovel e solucoes financeiras
            sob medida.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button href={WHATSAPP_LINKS.hero} variant="solid" external>
              FALAR COM ESPECIALISTA
            </Button>
            <Button href="#contato" variant="outlined">
              SIMULAR CREDITO
            </Button>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="flex-1 relative hidden lg:flex items-center justify-center">
        <div
          ref={imageRef}
          className="w-[85%] h-[75%] rounded-xl bg-gradient-to-br from-[var(--accent)]/10 to-[var(--bg-surface)] border border-[var(--border)] flex items-center justify-center"
        >
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-accent to-accent-dark opacity-40" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
            <p className="text-xs text-[var(--text-muted)]">Hero Image — Skyline Premium</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ScrollIndicator />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add Hero to page.tsx**

```tsx
// src/app/page.tsx
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* Spacer to test scroll */}
        <div className="h-screen bg-[var(--bg-surface)]" />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify hero animations and parallax**

```bash
npm run dev
```

Test: text fades in from left on load. Scroll down → image parallax. Responsive: resize to mobile → single column.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Hero section with GSAP animations and parallax"
```

---

### Task 7: Services Section (Tabs)

**Files:**
- Create: `src/components/sections/Services.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Build tabbed Services section**

```tsx
// src/components/sections/Services.tsx
"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Services() {
  const [activeTab, setActiveTab] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const animateTabChange = useCallback((index: number) => {
    if (index === activeTab || !contentRef.current || !imageRef.current) return;

    const tl = gsap.timeline();

    // Fade out current
    tl.to(contentRef.current.children, {
      opacity: 0,
      y: 20,
      duration: 0.2,
      stagger: 0.05,
      ease: "power2.in",
    });
    tl.to(imageRef.current, { opacity: 0, scale: 0.95, duration: 0.2 }, "<");

    // Update state mid-animation
    tl.call(() => setActiveTab(index));

    // Fade in new
    tl.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }
    );
    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
      "<0.1"
    );
  }, [activeTab]);

  // Keyboard navigation for tabs
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;
    if (e.key === "ArrowRight") {
      newIndex = (index + 1) % SERVICES.length;
    } else if (e.key === "ArrowLeft") {
      newIndex = (index - 1 + SERVICES.length) % SERVICES.length;
    } else {
      return;
    }
    e.preventDefault();
    animateTabChange(newIndex);
    // Focus the new tab
    const tabs = tabsRef.current?.querySelectorAll('[role="tab"]');
    (tabs?.[newIndex] as HTMLElement)?.focus();
  };

  // Initial scroll animation
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current!.querySelector(".services-header"), {
        y: 40, opacity: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const service = SERVICES[activeTab];

  return (
    <section ref={sectionRef} id="servicos" className="py-24 md:py-32 bg-[var(--bg-surface)] px-6 md:px-8 lg:px-16">
      <div className="services-header">
        <SectionTitle label="Nossas Solucoes" title="Servicos" />
      </div>

      {/* Tabs */}
      <div
        ref={tabsRef}
        role="tablist"
        aria-label="Servicos da Altiv"
        className="flex gap-0 border-b border-[var(--border)] mb-12 overflow-x-auto"
      >
        {SERVICES.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            id={`tab-${s.id}`}
            aria-selected={i === activeTab}
            aria-controls={`panel-${s.id}`}
            tabIndex={i === activeTab ? 0 : -1}
            onClick={() => animateTabChange(i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={`px-4 md:px-6 py-3 text-label uppercase tracking-[2px] whitespace-nowrap transition-colors border-b-2 ${
              i === activeTab
                ? "border-accent text-accent"
                : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
            }`}
          >
            {s.number} — {s.title}
          </button>
        ))}
      </div>

      {/* Active tab panel */}
      <div
        role="tabpanel"
        id={`panel-${service.id}`}
        aria-labelledby={`tab-${service.id}`}
        className="flex flex-col lg:flex-row gap-12"
      >
        <div ref={contentRef} className="flex-1">
          <h3 className="font-heading text-h3 text-[var(--text-primary)] mb-4">
            {service.title}
          </h3>
          <p className="text-body-base text-[var(--text-secondary)] mb-6 leading-relaxed max-w-lg">
            {service.description}
          </p>
          <div className="flex flex-col gap-2 mb-8">
            {service.features.map((feature) => (
              <span key={feature} className="text-small text-accent">
                / {feature}
              </span>
            ))}
          </div>
          <Button href="#contato" variant="outlined">
            {service.cta} →
          </Button>
        </div>

        <div ref={imageRef} className="flex-1 flex items-center justify-center">
          <div className="w-full h-64 lg:h-80 rounded-xl bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-surface)] border border-[var(--border)] flex items-center justify-center">
            <p className="text-xs text-[var(--text-muted)]">
              Imagem — {service.title}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to page.tsx**

Add `<Services />` after `<Hero />` with `id="servicos"`.

- [ ] **Step 3: Verify tab switching, animations, and keyboard navigation**

Test: click tabs → content animates. Press arrow keys → tabs navigate. Mobile → horizontal scroll tabs.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Services section with animated tabs and accessibility"
```

---

### Task 8: Numbers Section (Counters)

**Files:**
- Create: `src/components/sections/Numbers.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Build Numbers section with animated counters**

Create `src/components/sections/Numbers.tsx` with:
- Gold gradient background (`from-accent to-accent-dark`)
- Title "Por que a Altiv?" in black
- 4 counters from `COUNTERS` constant
- GSAP `countUp` animation triggered on scroll into viewport (2s duration)
- HTML fallback: actual numbers present in DOM (GSAP animates visually)
- Mobile: 2x2 grid
- Section `id="diferenciais"`

- [ ] **Step 2: Add to page.tsx after Services**

- [ ] **Step 3: Verify counters animate on scroll**

Scroll to section → numbers count up from 0. Values visible even without JS.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Numbers section with animated counters on gold gradient"
```

---

### Task 9: How It Works (Timeline)

**Files:**
- Create: `src/components/sections/HowItWorks.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Build HowItWorks with ScrollTrigger pin**

Create `src/components/sections/HowItWorks.tsx` with:
- Section title: "Processo" label + "Como funciona" heading
- 4 steps from `STEPS` constant in horizontal timeline (desktop) / vertical (mobile)
- Connecting line between circles (SVG or CSS)
- Last step circle has solid gold background
- **Use `withDesktopOnly()` from gsap-utils** to wrap ScrollTrigger pin (desktop only)
- Line draws with scroll progress (desktop), simple fade-in stagger (mobile)
- Steps reveal sequentially with stagger 0.3s
- Import: `import { withDesktopOnly } from "@/components/animations/gsap-utils";`

- [ ] **Step 2: Add to page.tsx after Numbers**

- [ ] **Step 3: Verify pin and timeline animation**

Scroll → section pins → line draws → steps reveal one by one → section unpins. Mobile → vertical layout without pin.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add HowItWorks timeline with ScrollTrigger pin animation"
```

---

### Task 10: Testimonials Section (Carousel)

**Files:**
- Create: `src/components/sections/Testimonials.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Build Testimonials carousel with GSAP**

Create `src/components/sections/Testimonials.tsx` with:
- Section title: "Depoimentos" label + "O que nossos clientes dizem" heading
- GSAP timeline carousel (no external lib): crossfade between 3 slides
- Each slide: large gold quote marks, italic citation, name, role + detail
- Progress indicators: horizontal bars (gold = active, grey = inactive)
- Auto-play: 6s interval, pauses on hover
- ARIA: `role="region"`, `aria-label="Depoimentos de clientes"`, `aria-live="polite"`
- State: `activeSlide` index, GSAP timeline for transitions

- [ ] **Step 2: Add to page.tsx after HowItWorks**

- [ ] **Step 3: Verify carousel auto-plays and pauses on hover**

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Testimonials carousel with GSAP crossfade and auto-play"
```

---

### Task 11: About Section

**Files:**
- Create: `src/components/sections/About.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Build About split-screen section**

Create `src/components/sections/About.tsx` with:
- Section `id="sobre"`
- 2 columns: text left, image placeholder right
- Label "A Empresa", title "Altiv Capital Imobiliario"
- Body text from spec
- Mini-stats: "5+ Anos no mercado" | "Premium Atendimento"
- GSAP: text slides in from left 0.8s, image slides in from right 0.8s
- Mobile: stacked, image below text

- [ ] **Step 2: Add to page.tsx after Testimonials**

- [ ] **Step 3: Verify slide-in animations on scroll**

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add About section with split-screen and slide-in animations"
```

---

### Task 12: FAQ Section (Accordion)

**Files:**
- Create: `src/components/sections/FAQ.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Build FAQ accordion**

Create `src/components/sections/FAQ.tsx` with:
- Title: "Perguntas Frequentes"
- Accordion from `FAQ_ITEMS` constant
- Each item: `<button aria-expanded>` + `<div role="region" aria-labelledby>`
- Click toggles open/close with GSAP height animation (0.4s, power2.inOut)
- Only one item open at a time (or multiple — user preference)
- Gold "+" icon rotates to "x" when open
- Max-width container centered

- [ ] **Step 2: Add to page.tsx after About**

- [ ] **Step 3: Verify accordion expand/collapse and accessibility**

Tab to buttons, press Enter → opens. Screen reader announces expanded state.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add FAQ accordion with GSAP animations and full accessibility"
```

---

### Task 13: Contact Form + WhatsApp CTA

**Files:**
- Create: `src/components/sections/ContactForm.tsx`
- Create: `src/app/api/contact/route.ts`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create API route for form submission**

```typescript
// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, whatsapp, creditType, amount, lgpdConsent } = body;

    // Validation
    if (!name || name.length < 3) {
      return NextResponse.json({ error: "Nome deve ter pelo menos 3 caracteres." }, { status: 400 });
    }
    if (!whatsapp) {
      return NextResponse.json({ error: "WhatsApp e obrigatorio." }, { status: 400 });
    }
    if (!creditType) {
      return NextResponse.json({ error: "Tipo de credito e obrigatorio." }, { status: 400 });
    }
    if (!lgpdConsent) {
      return NextResponse.json({ error: "E necessario concordar com a Politica de Privacidade." }, { status: 400 });
    }

    // TODO: Send email or integrate with CRM
    // For now, log to console
    console.log("New contact submission:", { name, whatsapp, creditType, amount });

    return NextResponse.json({ success: true, message: "Recebemos seu contato! Em breve um especialista ira te atender." });
  } catch {
    return NextResponse.json({ error: "Erro interno. Tente novamente." }, { status: 500 });
  }
}
```

- [ ] **Step 2: Build ContactForm section**

```tsx
// src/components/sections/ContactForm.tsx
"use client";
import { useState, useRef, useEffect, FormEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import { CREDIT_OPTIONS, WHATSAPP_LINKS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function formatCurrency(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  const num = parseInt(digits, 10);
  return `R$ ${num.toLocaleString("pt-BR")}`;
}

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [creditType, setCreditType] = useState("");
  const [amount, setAmount] = useState("");
  const [lgpd, setLgpd] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current!.children, {
        opacity: 0, y: 30, duration: 0.6, stagger: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!name || name.length < 3) errors.name = "Nome deve ter pelo menos 3 caracteres.";
    if (!whatsapp || whatsapp.replace(/\D/g, "").length < 10) errors.whatsapp = "Informe um WhatsApp valido.";
    if (!creditType) errors.creditType = "Selecione o tipo de credito.";
    if (!lgpd) errors.lgpd = "E necessario concordar com a Politica de Privacidade.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setFormState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          whatsapp: whatsapp.replace(/\D/g, ""),
          creditType,
          amount: amount.replace(/\D/g, ""),
          lgpdConsent: lgpd,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao enviar.");
      setFormState("success");
    } catch (err) {
      setFormState("error");
      setErrorMsg(err instanceof Error ? err.message : "Erro interno. Tente novamente.");
    }
  };

  if (formState === "success") {
    return (
      <section ref={sectionRef} id="contato" className="py-24 md:py-32 bg-[var(--bg-primary)] px-6 md:px-8 lg:px-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          <h2 className="font-heading text-h2 text-[var(--text-primary)] mb-4">Recebemos seu contato!</h2>
          <p className="text-body-base text-[var(--text-secondary)]">Em breve um especialista ira te atender.</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="contato" className="py-24 md:py-32 bg-[var(--bg-primary)] px-6 md:px-8 lg:px-16">
      <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">
        {/* Form */}
        <div className="flex-1">
          <h2 className="font-heading text-h2 text-[var(--text-primary)] mb-2">Vamos comecar?</h2>
          <p className="text-body-base text-[var(--text-secondary)] mb-8">
            Preencha o formulario e um especialista entrara em contato em ate 24h.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div>
              <input
                type="text"
                placeholder="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-4 py-3.5 text-small text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-accent outline-none transition-colors"
              />
              {fieldErrors.name && <p className="text-xs text-red-500 mt-1">{fieldErrors.name}</p>}
            </div>

            <div>
              <input
                type="tel"
                placeholder="WhatsApp"
                value={whatsapp}
                onChange={(e) => setWhatsapp(formatPhone(e.target.value))}
                className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-4 py-3.5 text-small text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-accent outline-none transition-colors"
              />
              {fieldErrors.whatsapp && <p className="text-xs text-red-500 mt-1">{fieldErrors.whatsapp}</p>}
            </div>

            <div>
              <select
                value={creditType}
                onChange={(e) => setCreditType(e.target.value)}
                className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-4 py-3.5 text-small text-[var(--text-primary)] focus:border-accent outline-none transition-colors appearance-none"
              >
                <option value="" disabled>Tipo de credito desejado</option>
                {CREDIT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {fieldErrors.creditType && <p className="text-xs text-red-500 mt-1">{fieldErrors.creditType}</p>}
            </div>

            <input
              type="text"
              placeholder="Valor aproximado (opcional)"
              value={amount}
              onChange={(e) => setAmount(formatCurrency(e.target.value))}
              className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-4 py-3.5 text-small text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-accent outline-none transition-colors"
            />

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={lgpd}
                onChange={(e) => setLgpd(e.target.checked)}
                className="mt-1 accent-[var(--accent)]"
              />
              <span className="text-xs text-[var(--text-tertiary)]">
                Concordo com a Politica de Privacidade e autorizo o contato.
              </span>
            </label>
            {fieldErrors.lgpd && <p className="text-xs text-red-500">{fieldErrors.lgpd}</p>}

            {formState === "error" && (
              <p className="text-xs text-red-500 bg-red-500/10 px-4 py-2 rounded-lg">{errorMsg}</p>
            )}

            <Button type="submit" variant="solid" disabled={formState === "loading"} className="mt-2">
              {formState === "loading" ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  ENVIANDO...
                </span>
              ) : "SOLICITAR CONTATO"}
            </Button>
          </form>
        </div>

        {/* WhatsApp CTA */}
        <div className="flex-1 flex flex-col items-center justify-center text-center lg:border-l lg:border-[var(--border)] lg:pl-16">
          <h3 className="font-heading text-h4 text-[var(--text-primary)] mb-6">Prefere falar agora?</h3>
          <Button href={WHATSAPP_LINKS.contact} variant="whatsapp" external className="mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.932 1.395 5.608L0 24l6.525-1.395A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.858 0-3.593-.508-5.088-1.39l-.364-.216-3.773.99.99-3.653-.235-.374A9.935 9.935 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            CHAMAR NO WHATSAPP
          </Button>
          <p className="text-xs text-[var(--text-tertiary)]">Atendimento em horario comercial</p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add to page.tsx after FAQ**

- [ ] **Step 4: Test form submission**

Fill form → submit → check browser network tab for POST to `/api/contact`. Verify validation errors display for empty required fields.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add ContactForm with validation, API route, and WhatsApp CTA"
```

---

### Task 14: Footer & WhatsApp Floating Button

**Files:**
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/WhatsAppButton.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Build Footer**

Create `src/components/layout/Footer.tsx` with:
- 4 columns: Logo + tagline | Servicos links | Empresa links | Contato info
- Bottom bar: copyright + privacy link
- Responsive: 4 → 2 → 1 columns
- GSAP fade-in on scroll

- [ ] **Step 2: Build WhatsApp floating button**

Create `src/components/layout/WhatsAppButton.tsx` with:
- Fixed bottom-right, `z-index: 45`
- Green circle with WhatsApp SVG icon
- CSS pulse animation keyframes
- `aria-label="Falar pelo WhatsApp"`
- Link to `WHATSAPP_LINKS.floating`
- Hide when footer is in view (use IntersectionObserver on footer element, toggle visibility state)

- [ ] **Step 3: Add both to page.tsx**

Footer inside `<main>` at the end. WhatsAppButton outside `<main>` (global).

- [ ] **Step 4: Verify footer layout and floating button**

Scroll to bottom → footer renders. WhatsApp button pulses in bottom-right corner on all sections.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Footer and floating WhatsApp button with pulse animation"
```

---

### Task 15: 404 Page

**Files:**
- Create: `src/app/not-found.tsx`

- [ ] **Step 1: Create custom 404 page**

```tsx
// src/app/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-primary)] px-6">
      <h1 className="font-heading text-display text-accent mb-4">404</h1>
      <p className="text-body-lg text-[var(--text-secondary)] mb-8 text-center">
        Pagina nao encontrada.
      </p>
      <Button href="/" variant="outlined">
        VOLTAR AO INICIO
      </Button>
    </div>
  );
}
```

- [ ] **Step 2: Verify 404 page**

Navigate to `http://localhost:3000/nonexistent` → custom 404 page renders with Altiv branding.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add custom 404 page"
```

---

### Task 16: Full Page Assembly & Final Polish

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx` (add Schema.org)

- [ ] **Step 1: Assemble all sections in page.tsx**

```tsx
// src/app/page.tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Numbers } from "@/components/sections/Numbers";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { About } from "@/components/sections/About";
import { FAQ } from "@/components/sections/FAQ";
import { ContactForm } from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Numbers />
        <HowItWorks />
        <Testimonials />
        <About />
        <FAQ />
        <ContactForm />
        <Footer />
      </main>
      <WhatsAppButton />
    </>
  );
}
```

- [ ] **Step 2: Create sitemap.ts**

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://altiv.com.br",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
```

- [ ] **Step 3: Add Schema.org structured data to layout.tsx**

Add a `<script type="application/ld+json">` tag in the `<head>` with:
```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "FinancialService"],
  "name": "Altiv Capital Imobiliario",
  "description": "Credito imobiliario e consultoria financeira"
}
```

- [ ] **Step 4: Full scroll-through test**

```bash
npm run dev
```

Scroll through the entire page top to bottom:
- Hero loads with animation ✓
- Navbar blurs on scroll ✓
- Services tabs switch with animation ✓
- Numbers count up ✓
- Timeline pins and draws ✓
- Testimonials auto-play ✓
- About slides in ✓
- FAQ accordion works ✓
- Form validates and submits ✓
- Footer renders ✓
- WhatsApp button visible ✓
- Theme toggle works on all sections ✓

- [ ] **Step 5: Build check**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: assemble full landing page with all sections, sitemap, and Schema.org"
```

---

### Task 17: Responsive & Accessibility Pass

**Files:**
- Modify: Multiple section components as needed

- [ ] **Step 1: Test mobile viewport (375px)**

Using browser DevTools, resize to 375px width. Verify:
- Navbar hamburger works
- Hero: single column, text only, no image
- Services: horizontal scroll tabs, stacked content
- Numbers: 2x2 grid
- Timeline: vertical layout
- Testimonials: swipeable
- About: stacked
- Form: single column
- Footer: 1 column

Fix any layout issues found.

- [ ] **Step 2: Test tablet viewport (768px)**

Verify intermediate breakpoint works. Footer should be 2 columns.

- [ ] **Step 3: Keyboard navigation test**

Tab through entire page. All interactive elements must be focusable with visible focus ring. Tabs navigable with arrow keys. FAQ accordion with Enter/Space.

- [ ] **Step 4: Reduced motion test**

Enable `prefers-reduced-motion: reduce` in browser DevTools. Verify:
- No parallax
- No pinning
- Minimal transitions (instant or simple fade)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "fix: responsive layout and accessibility improvements"
```

---

### Task 18: Production Build & Final Verification

- [ ] **Step 1: Production build**

```bash
npm run build && npm run start
```

Expected: Build succeeds, production server starts on `http://localhost:3000`.

- [ ] **Step 2: Lighthouse audit**

Run Lighthouse in Chrome DevTools on the production build. Targets:
- Performance > 90
- Accessibility > 90
- Best Practices > 90
- SEO > 90

Fix any issues below target.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "chore: production build verified, Lighthouse targets met"
```
