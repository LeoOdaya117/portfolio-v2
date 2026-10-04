import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/home/Hero";
import About from "@/components/home/About/About";


export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <About />
      </main>

      <Footer />
    </>
  );
}
