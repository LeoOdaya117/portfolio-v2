import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/home/Hero";
import About from "@/components/home/About/About";
import ProjectsSection from "@/components/home/ProjectsSection";


export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <About />
        <ProjectsSection />
      </main>

      <Footer />
    </>
  );
}
