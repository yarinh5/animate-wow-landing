import { useEffect, useState } from "react";
import { isLiteDevice, scrollToSection } from "@/lib/motion";

const sections = [
  { id: "services", label: "שירותים" },
  { id: "about", label: "אודות" },
  { id: "portfolio", label: "תיק עבודות" },
  { id: "contact", label: "צור קשר" },
];

/** Desktop-only dot navigation, driven by IntersectionObserver (no layout reads on scroll) */
const SideNav = () => {
  const [enabled] = useState(() => !isLiteDevice());
  const [activeSection, setActiveSection] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -59% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) activeObserver.observe(el);
    });

    // Visible once the hero is mostly scrolled past
    const hero = document.querySelector("section");
    const heroObserver = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "-50% 0px 0px 0px" }
    );
    if (hero) heroObserver.observe(hero);

    return () => {
      activeObserver.disconnect();
      heroObserver.disconnect();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <nav
      className={`fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4 transition-all duration-500 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 pointer-events-none"
      }`}
    >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="group relative flex items-center gap-3"
          aria-label={section.label}
        >
          <span className="absolute left-8 whitespace-nowrap text-sm font-medium text-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-card/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-border/50">
            {section.label}
          </span>
          <div
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              activeSection === section.id
                ? "bg-primary border-primary scale-125 shadow-lg shadow-primary/50"
                : "bg-transparent border-muted-foreground/50 hover:border-primary hover:scale-110"
            }`}
          />
        </button>
      ))}
    </nav>
  );
};

export default SideNav;
