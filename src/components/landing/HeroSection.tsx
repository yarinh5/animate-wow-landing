import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { DESKTOP_QUERY, HOVER_QUERY, LITE_QUERY, isLiteDevice, listen, prefersReducedMotion } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles, Star, Zap, Code } from "lucide-react";

const TITLE = "ירין חזן";

interface HeroSectionProps {
  onContactClick: () => void;
}

const HeroSection = ({ onContactClick }: HeroSectionProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const orbitsRef = useRef<HTMLDivElement>(null);
  const floatingIconsRef = useRef<HTMLDivElement>(null);
  const [lite] = useState(() => isLiteDevice());
  const [particlePositions] = useState(() =>
    Array.from({ length: lite ? 7 : 30 }, () => ({ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }))
  );

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const mm = gsap.matchMedia();
    const cleanups: Array<() => void> = [];

    // ---------- Mobile / touch: light, one-shot entrance only ----------
    mm.add(LITE_QUERY, () => {
      if (prefersReducedMotion()) return;
      const particles = particlesRef.current?.children;
      if (particles) gsap.fromTo(particles, { opacity: 0 }, { opacity: 0.7, duration: 0.8, stagger: 0.06 });
      gsap.fromTo(titleRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.1 });
      gsap.fromTo(subtitleRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.25 });
      gsap.fromTo(ctaRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.4 });
      const icons = floatingIconsRef.current?.children;
      if (icons) gsap.fromTo(icons, { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 0.5 });
    });

    // ---------- Desktop: full rich experience ----------
    mm.add(DESKTOP_QUERY, () => {
      if (prefersReducedMotion()) return;
      listen(cleanups, hero, "mousemove", (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(".glow-orb", { x: x * 100, y: y * 100, duration: 1, ease: "power2.out", overwrite: "auto" });
      });

      const orbits = orbitsRef.current?.children;
      if (orbits) Array.from(orbits).forEach((orbit, i) => gsap.to(orbit, { rotation: 360, duration: 20 + i * 10, repeat: -1, ease: "none" }));

      const particles = particlesRef.current?.children;
      if (particles) {
        gsap.fromTo(particles, { opacity: 0, scale: 0 }, { opacity: 0.8, scale: 1, duration: 1.5, stagger: { each: 0.05, from: "center" }, ease: "elastic.out(1, 0.5)" });
        Array.from(particles).forEach((particle, i) => {
          gsap.to(particle, { y: gsap.utils.random(-50, 50), x: gsap.utils.random(-50, 50), rotation: gsap.utils.random(-180, 180), duration: gsap.utils.random(4, 8), repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.1 });
        });
      }

      const icons = floatingIconsRef.current?.children;
      if (icons) Array.from(icons).forEach((icon, i) => {
        gsap.fromTo(icon, { opacity: 0, scale: 0, rotation: -180 }, { opacity: 1, scale: 1, rotation: 0, duration: 1, delay: 0.5 + i * 0.2, ease: "back.out(2)" });
        gsap.to(icon, { y: gsap.utils.random(-30, 30), x: gsap.utils.random(-20, 20), rotation: gsap.utils.random(-15, 15), duration: gsap.utils.random(3, 5), repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.3 });
      });

      const chars = titleRef.current ? Array.from(titleRef.current.querySelectorAll<HTMLElement>(".hero-char")) : [];
      if (chars.length) {
        gsap.fromTo(chars, { opacity: 0, y: 150, rotateX: -90, scale: 0.5, filter: "blur(10px)" }, { opacity: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)", duration: 1.2, stagger: 0.04, ease: "back.out(2)", delay: 0.3 });
        if (window.matchMedia(HOVER_QUERY).matches) {
          chars.forEach((char) => {
            listen(cleanups, char, "mouseenter", () => gsap.to(char, { y: -20, scale: 1.3, duration: 0.3, ease: "power2.out" }));
            listen(cleanups, char, "mouseleave", () => gsap.to(char, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" }));
          });
        }
      }

      gsap.fromTo(subtitleRef.current, { opacity: 0, y: 80, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "elastic.out(1, 0.8)", delay: 1 });
      gsap.fromTo(ctaRef.current, { opacity: 0, scale: 0, rotation: -10 }, { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: "elastic.out(1, 0.5)", delay: 1.5 });

      gsap.to(hero.querySelector(".parallax-bg"), { y: 200, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1 } });
    });

    return () => {
      cleanups.forEach((fn) => fn());
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative hero-min-h flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="parallax-bg absolute inset-0 pointer-events-none">
        <div className="glow-orb absolute top-1/4 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/30 rounded-full blur-[60px] md:blur-[150px] md:animate-pulse" />
        <div className="glow-orb absolute bottom-1/4 right-1/4 w-[260px] h-[260px] md:w-[400px] md:h-[400px] bg-secondary/30 rounded-full blur-[50px] md:blur-[120px]" />
        <div className="glow-orb hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/15 rounded-full blur-[180px]" />
      </div>

      {/* Orbital rings */}
      <div ref={orbitsRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[300px] h-[300px] border border-primary/10 rounded-full" />
        <div className="hidden md:block absolute w-[500px] h-[500px] border border-secondary/10 rounded-full" />
        <div className="hidden md:block absolute w-[700px] h-[700px] border border-accent/5 rounded-full" />
      </div>

      {/* Floating icons */}
      <div ref={floatingIconsRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[10%] w-16 h-16 glass rounded-xl flex items-center justify-center">
          <Code className="w-8 h-8 text-primary" />
        </div>
        <div className="hidden md:flex absolute top-1/3 right-[15%] w-14 h-14 glass rounded-xl flex items-center justify-center">
          <Zap className="w-7 h-7 text-secondary" />
        </div>
        <div className="hidden md:flex absolute bottom-1/3 left-[20%] w-12 h-12 glass rounded-xl flex items-center justify-center">
          <Star className="w-6 h-6 text-accent" />
        </div>
      </div>

      {/* Floating particles with glow */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {particlePositions.map((pos, i) => (
          <div key={i} className="absolute w-2 h-2 bg-primary rounded-full shadow-lg shadow-primary/50" style={pos} />
        ))}
      </div>

      {/* Animated grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none md:animate-pulse"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container relative z-10 text-center px-4">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          <span className="text-primary text-sm font-medium tracking-wider uppercase bg-primary/10 px-4 py-2 rounded-full">
            Web Development Expert
          </span>
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
        </div>

        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-9xl font-display font-black mb-6 text-gradient leading-tight cursor-default"
          style={{ perspective: "1000px" }}
        >
          {lite
            ? TITLE
            : TITLE.split("").map((c, i) => (
                <span key={i} className="hero-char inline-block transform-gpu text-gradient">{c === " " ? "\u00A0" : c}</span>
              ))}
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          מפתח דפי נחיתה מקצועיים, אתרים מרשימים, אוטומציות חכמות ומערכות CRM
          <br />
          <span className="text-primary font-semibold">שמביאות תוצאות אמיתיות לעסק שלך</span>
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={onContactClick}
            size="lg"
            className="group bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-7 text-lg font-semibold rounded-2xl glow pulse-glow transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-primary/50"
          >
            <span>בוא נדבר</span>
            <ArrowDown className="w-5 h-5 mr-2 group-hover:translate-y-2 transition-transform duration-300" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary hover:scale-105 px-10 py-7 text-lg font-semibold rounded-2xl transition-all duration-300"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            גלה את השירותים
          </Button>
        </div>

        {/* Animated scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">גלול למטה</span>
            <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center p-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;