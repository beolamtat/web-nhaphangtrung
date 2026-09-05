import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import ProductLinkInput from "@/components/home/ProductLinkInput";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Stats } from "@/components/home/Stats";
import { FinalCTA } from "@/components/home/FinalCTA";
import LogisticsJourney from "@/components/home/LogisticsJourney";
import { Footer } from "@/components/home/Footer";
export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Chuyển đến nội dung
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <ProductLinkInput />
        <Stats />
        <HowItWorks />
        <LogisticsJourney />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
