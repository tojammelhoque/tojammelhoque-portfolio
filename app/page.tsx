import About from "@/components/About";
import Education from "@/components/Education";
import HeroSection from "@/components/HeroSection";
import { Meteors } from "@/components/magicui/meteors";
import Project from "@/components/Project";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <div className="container mx-auto overflow-hidden relative">
      <Meteors />
      <main className="min-h-screen bg-black  ">
        <HeroSection />
        <About />
        <Project />
        <Skills />
        <Education />
      </main>
    </div>
  );
}
