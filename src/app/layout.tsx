import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { BASE_PATH } from "@/lib/constants";
import "./globals.css";

const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://altiv.com.br"),
  title: "Altiv Capital Imobiliario",
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
    <html lang="pt-BR" className={`${orbitron.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href={`${BASE_PATH}/favicon.ico`} sizes="32x32" />
        <link rel="icon" href={`${BASE_PATH}/favicon-32.png`} type="image/png" sizes="32x32" />
        <link rel="icon" href={`${BASE_PATH}/favicon-16.png`} type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href={`${BASE_PATH}/apple-touch-icon.png`} />
        <script dangerouslySetInnerHTML={{
          __html: `(function(){var t=localStorage.getItem('altiv-theme');if(t==='light')document.documentElement.classList.add('light');else if(!t&&window.matchMedia('(prefers-color-scheme: light)').matches)document.documentElement.classList.add('light');})();`,
        }} />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider>
        {children}
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["LocalBusiness", "FinancialService"],
              name: "Altiv Capital Imobiliario",
              description:
                "Credito imobiliario e consultoria financeira",
            }),
          }}
        />
      </body>
    </html>
  );
}
