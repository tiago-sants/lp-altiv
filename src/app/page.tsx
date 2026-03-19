import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-display font-heading text-accent">Altiv Capital Imobiliario</h1>
        <p className="text-body-lg text-text-secondary font-body">Credito imobiliario e consultoria financeira premium.</p>
        <div className="flex justify-center">
          <ThemeToggle />
        </div>
      </div>
    </main>
  );
}
