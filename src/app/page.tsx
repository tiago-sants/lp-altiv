import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <div className="h-screen flex items-center justify-center">
          <h1 className="font-heading text-display text-accent">ALTIV</h1>
        </div>
        <div className="h-screen bg-[var(--bg-surface)]" />
      </main>
    </>
  );
}
