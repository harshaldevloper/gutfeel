import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import ProductStrip from "@/components/landing/ProductStrip";
import DownloadSection from "@/components/landing/DownloadSection";
import Features from "@/components/Features";
import ScannerShowcase from "@/components/landing/ScannerShowcase";
import CompareAndPricing from "@/components/landing/CompareAndPricing";
import FAQ from "@/components/landing/FAQ";
import Testimonials from "@/components/Testimonials";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <ProductStrip />
        <DownloadSection />
        <Features />
        <ScannerShowcase />
        <CompareAndPricing />
        <Testimonials />
        <Waitlist />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
