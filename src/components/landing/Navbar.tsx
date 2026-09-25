import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { scrollToSection as goToSection } from "@/lib/motion";

interface NavbarProps {
  onContactClick: () => void;
}

const navLinks = [
  { label: "שירותים", href: "#services" },
  { label: "אודות", href: "#about" },
  { label: "תיק עבודות", href: "#portfolio" },
  { label: "צור קשר", href: "#contact" },
];

const Navbar = ({ onContactClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
        ticking = false;
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const tween = gsap.fromTo(
      ".nav-item",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.3 }
    );
    return () => {
      tween.kill();
    };
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    goToSection(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-4" : "py-6"
      }`}
    >
      <div className="container px-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="nav-item text-2xl font-display font-bold text-gradient"
          onClick={(e) => {
            e.preventDefault();
            goToSection("top");
          }}
        >
          YH
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(link.href)}
              className="nav-item text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* CTA */}
        <Button
          onClick={onContactClick}
          className="nav-item hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg"
        >
          בוא נדבר
        </Button>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass mt-4 mx-4 rounded-xl p-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(link.href)}
                className="text-lg font-medium text-foreground hover:text-primary transition-colors text-right"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => {
                onContactClick();
                setIsMobileMenuOpen(false);
              }}
              className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg w-full"
            >
              בוא נדבר
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
