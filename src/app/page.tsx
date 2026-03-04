import PlaygroundSection from "@/components/sections/PlaygroundSection";
import HeroSection from "@/components/sections/HeroSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsEducationSection from "@/components/sections/SkillsEducationSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

import ThreeBackground from "@/components/ui/ThreeBackground";
import FallingStars from "@/components/ui/FallingStars";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col relative bg-transparent">
      <ThreeBackground />
      <FallingStars />
      <HeroSection />
      <ExperienceSection />
      <SkillsEducationSection />
      <ProjectsSection />
      <ContactSection />
      <PlaygroundSection />
      <Footer />
    </main>
  );
}
