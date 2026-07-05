import { useEffect, useState } from "react";

const sections = [
  { id: "services", label: "שירותים" },
  { id: "about", label: "אודות" },
  { id: "portfolio", label: "תיק עבודות" },
  { id: "contact", label: "צור קשר" },
];

const SideNav = () => {
  const [activeSection, setActiveSection] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: HTMLElement) => void } }).lenis;
    if (lenis) lenis.scrollTo(el);
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 transition-all duration-500 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 pointer-events-none"
      }`}
    >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollTo(section.id)}
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
