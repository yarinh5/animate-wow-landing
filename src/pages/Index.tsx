import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import AboutSection from "@/components/landing/AboutSection";
import PortfolioSection from "@/components/landing/PortfolioSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";
import ScrollProgress from "@/components/landing/ScrollProgress";
import SideNav from "@/components/landing/SideNav";
import FloatingShapes from "@/components/landing/FloatingShapes";
import Preloader from "@/components/landing/Preloader";
import CustomCursor from "@/components/landing/CustomCursor";
import SmoothScroll from "@/components/landing/SmoothScroll";

const Index = () => {
  const [loading, setLoading] = useState(true);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (!el) return;
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: HTMLElement) => void } }).lenis;
    if (lenis) lenis.scrollTo(el);
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <SmoothScroll />
      <ScrollProgress />
      <SideNav />
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden" dir="rtl">
        <Navbar onContactClick={scrollToContact} />
        <HeroSection onContactClick={scrollToContact} />
        <ServicesSection onContactClick={scrollToContact} />
        <AboutSection onContactClick={scrollToContact} />
        <PortfolioSection onContactClick={scrollToContact} />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
