import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Numbers } from "@/components/sections/Numbers";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { About } from "@/components/sections/About";
import { FAQ } from "@/components/sections/FAQ";

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
        <div className="h-screen bg-[var(--bg-primary)]" />
      </main>
    </>
  );
}
