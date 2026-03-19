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
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
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
        whatsapp: "45",
        navbar: "50",
        "mobile-menu": "55",
      },
    },
  },
  plugins: [],
};
export default config;
