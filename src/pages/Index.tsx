import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ServicesSection from "@/components/landing/ServicesSection";
import AboutSection from "@/components/landing/AboutSection";
import PortfolioSection from "@/components/landing/PortfolioSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" dir="rtl">
      <Navbar onContactClick={scrollToContact} />
      <HeroSection onContactClick={scrollToContact} />
      <ServicesSection onContactClick={scrollToContact} />
      <AboutSection onContactClick={scrollToContact} />
      <PortfolioSection onContactClick={scrollToContact} />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
