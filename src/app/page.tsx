import { GlobalNav } from "@/components/layout/GlobalNav";
import { SubNav } from "@/components/layout/SubNav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Til } from "@/components/sections/Til";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <GlobalNav />
      <SubNav />

      <main>
        <Hero />
        <Projects />
        <Skills />
        <Til />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
