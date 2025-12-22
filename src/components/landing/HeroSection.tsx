import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles, Star, Zap, Code } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create magnetic cursor effect
      const hero = heroRef.current;
      if (hero) {
        hero.addEventListener("mousemove", (e) => {
          const rect = hero.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          gsap.to(".glow-orb", {
            x: x * 100,
            y: y * 100,
            duration: 1,
            ease: "power2.out",
          });
        });
      }

      // Orbit animation
      const orbits = orbitsRef.current?.children;
      if (orbits) {
        Array.from(orbits).forEach((orbit, i) => {
          gsap.to(orbit, {
            rotation: 360,
            duration: 20 + i * 10,
            repeat: -1,
            ease: "none",
          });
        });
      }

      // Particles animation with stagger explosion
      const particles = particlesRef.current?.children;
      if (particles) {
        gsap.fromTo(
          particles,
          { 
            opacity: 0, 
            scale: 0,
            x: 0,
            y: 0,
          },
          {
            opacity: 0.8,
            scale: 1,
            duration: 1.5,
            stagger: {
              each: 0.05,
              from: "center",
            },
            ease: "elastic.out(1, 0.5)",
          }
        );

        // Floating animation for each particle with more dynamic movement
        Array.from(particles).forEach((particle, i) => {
          const randomDuration = gsap.utils.random(4, 8);
          const randomX = gsap.utils.random(-50, 50);
          const randomY = gsap.utils.random(-50, 50);
          
          gsap.to(particle, {
            y: randomY,
            x: randomX,
            rotation: gsap.utils.random(-180, 180),
            duration: randomDuration,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.1,
          });

        });
      }

      // Floating icons animation
      const floatingIcons = floatingIconsRef.current?.children;
      if (floatingIcons) {
        Array.from(floatingIcons).forEach((icon, i) => {
          gsap.fromTo(
            icon,
            { opacity: 0, scale: 0, rotation: -180 },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 1,
              delay: 0.5 + i * 0.2,
              ease: "back.out(2)",
            }
          );

          gsap.to(icon, {
            y: gsap.utils.random(-30, 30),
            x: gsap.utils.random(-20, 20),
            rotation: gsap.utils.random(-15, 15),
            duration: gsap.utils.random(3, 5),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.3,
          });
        });
      }

      // Title animation with dramatic 3D effect
      const titleChars = titleRef.current?.innerText.split("");
      if (titleRef.current && titleChars) {
        titleRef.current.innerHTML = titleChars
          .map((char) => `<span class="inline-block transform-gpu">${char === " " ? "&nbsp;" : char}</span>`)
          .join("");

        gsap.fromTo(
          titleRef.current.children,
          { 
            opacity: 0, 
            y: 150, 
            rotateX: -90,
            scale: 0.5,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: 0.04,
            ease: "back.out(2)",
            delay: 0.3,
          }
        );

        // Add hover effect to each character
        Array.from(titleRef.current.children).forEach((char) => {
          char.addEventListener("mouseenter", () => {
            gsap.to(char, {
              y: -20,
              scale: 1.3,
              duration: 0.3,
              ease: "power2.out",
            });
          });
          char.addEventListener("mouseleave", () => {
            gsap.to(char, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        });
      }

      // Subtitle animation with wave effect
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 80, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1.2, 
          ease: "elastic.out(1, 0.8)", 
          delay: 1 
        }
      );

      // CTA animation with bounce
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0, rotation: -10 },
        { 
          opacity: 1, 
          scale: 1, 
          rotation: 0,
          duration: 1, 
          ease: "elastic.out(1, 0.5)", 
          delay: 1.5 
        }
      );

      // Scroll-triggered parallax for background
      gsap.to(".parallax-bg", {
        y: 200,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="parallax-bg absolute inset-0 pointer-events-none">
        <div className="glow-orb absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[150px] animate-pulse" />
        <div className="glow-orb absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/30 rounded-full blur-[120px]" />
        <div className="glow-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/15 rounded-full blur-[180px]" />
      </div>

      {/* Orbital rings */}
      <div ref={orbitsRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[300px] h-[300px] border border-primary/10 rounded-full" />
        <div className="absolute w-[500px] h-[500px] border border-secondary/10 rounded-full" />
        <div className="absolute w-[700px] h-[700px] border border-accent/5 rounded-full" />
      </div>

      {/* Floating icons */}
      <div ref={floatingIconsRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[10%] w-16 h-16 glass rounded-xl flex items-center justify-center">
          <Code className="w-8 h-8 text-primary" />
        </div>
        <div className="absolute top-1/3 right-[15%] w-14 h-14 glass rounded-xl flex items-center justify-center">
          <Zap className="w-7 h-7 text-secondary" />
        </div>
        <div className="absolute bottom-1/3 left-[20%] w-12 h-12 glass rounded-xl flex items-center justify-center">
          <Star className="w-6 h-6 text-accent" />
        </div>
      </div>

      {/* Floating particles with glow */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full shadow-lg shadow-primary/50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Animated grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none animate-pulse"
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
          יארין חזן
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