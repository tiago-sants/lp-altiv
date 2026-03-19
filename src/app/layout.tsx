import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Altiv Capital Imobiliario",
  description: "Credito imobiliario com as melhores condicoes do mercado",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
