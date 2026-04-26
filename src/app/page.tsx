import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import SectionDivider from "@/components/ui/SectionDivider";
import Problem from "@/components/sections/Problem";
import WhoThisIsFor from "@/components/sections/WhoThisIsFor";
import OutcomeLadder from "@/components/sections/OutcomeLadder";
import Process from "@/components/sections/Process";
import BuildLibrary from "@/components/sections/BuildLibrary";
import Pricing from "@/components/sections/Pricing";
import About from "@/components/sections/About";
import Proof from "@/components/sections/Proof";
import Booking from "@/components/sections/Booking";
import FAQ from "@/components/sections/FAQ";
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
        <WhoThisIsFor />
        <SectionDivider />
        <OutcomeLadder />
        <SectionDivider />
        <Process />
        <SectionDivider />
        <BuildLibrary />
        <SectionDivider />
        <Pricing />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Proof />
        <SectionDivider />
        <Booking />
        <SectionDivider />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
