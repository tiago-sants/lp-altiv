import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { BASE_PATH } from "@/lib/constants";
import "./globals.css";

const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://altiv.com.br"),
  title: "Altiv Capital Imobiliário",
  description: "Financiamento imobiliário, home equity e soluções financeiras sob medida. Conectamos você aos melhores bancos com taxas competitivas e aprovação ágil.",
  openGraph: {
    title: "Altiv Capital Imobiliário",
    description: "Seu patrimônio merece uma estratégia à altura. Crédito imobiliário e consultoria financeira premium.",
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
          __html: `(function(){var t=localStorage.getItem('altiv-theme');if(t==='dark'){return;}document.documentElement.classList.add('light');})();`,
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
              name: "Altiv Capital Imobiliário",
              description:
                "Crédito imobiliário e consultoria financeira",
            }),
          }}
        />
      </body>
    </html>
  );
}
