import Hero             from "@/components/Hero";
import FeaturedProjects  from "@/components/FeaturedProjects";
import About             from "@/components/About";
import Experience        from "@/components/Experience";
import Skills            from "@/components/Skills";
import Certifications    from "@/components/Certifications";
import { Contact, Footer } from "@/components/ContactAndFooter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <About />
      <Experience />
      <Skills />
      <Certifications />
      <Contact />
      <Footer />
    </>
  );
}
