import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Numbers } from "@/components/sections/Numbers";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Numbers />
        <div className="h-screen bg-[var(--bg-primary)]" />
      </main>
    </>
  );
}
