import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/home/Hero";
import About from "@/components/home/About/About";
import ProjectsSection from "@/components/home/ProjectsSection";
import ServicesSection from "@/components/home/ServicesSection";
import TechStackSection from "@/components/home/TechStackSection";
import AIWorkflowSection from "@/components/home/AIWorkflowSection";
import ExperienceSection from "@/components/home/ExperienceSection";
import ContactSection from "@/components/home/ContactSection";


export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <About />
        <ProjectsSection />
        <ServicesSection />
        <TechStackSection />
        <AIWorkflowSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
