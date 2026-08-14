import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import { InspirationGallery } from "@/components/Inspiration";
import { Projects, SideProjects } from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <InspirationGallery />
        <Projects />
        <SideProjects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
