import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import ProductStrip from "@/components/landing/ProductStrip";
import DownloadSection from "@/components/landing/DownloadSection";
import Features from "@/components/Features";
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
        <Testimonials />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
