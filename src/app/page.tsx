import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import SectionDivider from "@/components/ui/SectionDivider";
import Problem from "@/components/sections/Problem";
import Process from "@/components/sections/Process";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Booking from "@/components/sections/Booking";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <SectionDivider />
        <Problem />
        <SectionDivider />
        <Process />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
