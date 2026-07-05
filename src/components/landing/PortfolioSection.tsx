import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ExternalLink, Code2, Smartphone, Palette, Sparkles, Layers } from "lucide-react";
import { TextScramble } from "@/components/landing/TextScramble";

gsap.registerPlugin(ScrollTrigger);

interface PortfolioSectionProps {
  onContactClick: () => void;
}

const projects = [
  {
    title: "דף נחיתה לסטארטאפ",
    category: "Landing Page",
    description: "דף נחיתה מודרני עם אנימציות מתקדמות וממשק משתמש אינטואיטיבי",
    tags: ["React", "GSAP", "Tailwind"],
    icon: Palette,
    gradient: "from-primary/30 to-secondary/30",
  },
  {
    title: "אתר E-Commerce",
    category: "Web Development",
    description: "חנות אונליין מלאה עם מערכת תשלומים וניהול מלאי",
    tags: ["Next.js", "Stripe", "Supabase"],
    icon: Code2,
    gradient: "from-secondary/30 to-accent/30",
  },
  {
    title: "אפליקציית CRM",
    category: "CRM System",
    description: "מערכת ניהול לקוחות מותאמת אישית לחברת שירותים",
    tags: ["React", "TypeScript", "PostgreSQL"],
    icon: Smartphone,
    gradient: "from-accent/30 to-primary/30",
  },
  {
    title: "פלטפורמת אוטומציה",
    category: "Automation",
    description: "מערכת אוטומציה מתקדמת לניהול תהליכים עסקיים",
    tags: ["Node.js", "API", "Webhooks"],
    icon: Layers,
    gradient: "from-primary/30 to-accent/30",
  },
];

const PortfolioSection = ({ onContactClick }: PortfolioSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with dramatic reveal
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 100, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Projects animation with crazy effects
      projectsRef.current.forEach((project, i) => {
        if (!project) return;

        // Initial dramatic entrance with rotation and scale
        gsap.fromTo(
          project,
          { 
            opacity: 0, 
            y: 200, 
            scale: 0.5,
            rotateX: 45,
            rotateY: i % 2 === 0 ? -30 : 30,
            filter: "blur(15px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: project,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.2,
          }
        );

        // Icon spin animation
        const icon = project.querySelector(".project-icon");
        if (icon) {
          gsap.fromTo(
            icon,
            { rotation: -360, scale: 0, opacity: 0 },
            {
              rotation: 0,
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "elastic.out(1, 0.5)",
              scrollTrigger: {
                trigger: project,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
              delay: i * 0.15 + 0.3,
            }
          );
        }

        // Tags stagger animation
        const tags = project.querySelectorAll(".project-tag");
        gsap.fromTo(
          tags,
          { opacity: 0, scale: 0, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: project,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.1 + 0.5,
          }
        );

        // 3D tilt effect on hover
        project.addEventListener("mousemove", (e) => {
          const rect = project.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          gsap.to(project, {
            rotateY: x * 20,
            rotateX: -y * 20,
            scale: 1.05,
            boxShadow: `${x * -30}px ${y * 30}px 60px -15px hsl(var(--primary) / 0.4)`,
            duration: 0.3,
            ease: "power2.out",
          });

          // Move icon based on mouse
          gsap.to(icon, {
            x: x * 20,
            y: y * 20,
            rotation: x * 15,
            duration: 0.3,
          });
        });

        project.addEventListener("mouseleave", () => {
          gsap.to(project, {
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            boxShadow: "none",
            duration: 0.5,
            ease: "power2.out",
          });
          gsap.to(icon, {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.5,
          });
        });
      });

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="py-32 relative overflow-hidden"
      style={{ perspective: "1500px" }}
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px]" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[150px]" />

      <div className="container px-4 relative z-10">
        <div ref={titleRef} className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-primary text-sm font-medium tracking-wider uppercase">
              תיק עבודות
            </span>
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold mb-6">
            פרויקטים <span className="text-gradient">נבחרים</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            הנה כמה דוגמאות לעבודות שעשיתי עבור לקוחות מרוצים
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => (projectsRef.current[index] = el)}
              className="group glass rounded-3xl overflow-hidden gradient-border cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Gradient background */}
              <div className={`h-56 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                <div className="project-icon">
                  <project.icon className="w-20 h-20 text-primary/60 group-hover:text-primary transition-colors duration-500" />
                </div>
                
                {/* Animated overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Category badge */}
                <div className="absolute top-4 right-4 glass px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-md">
                  {project.category}
                </div>

                {/* Floating particles on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-primary rounded-full animate-pulse"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + i * 10}%`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="project-tag text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  className="text-primary hover:text-primary hover:bg-primary/10 p-0 h-auto font-medium group/btn"
                >
                  <span>צפה בפרויקט</span>
                  <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="text-center mt-16">
          <p className="text-muted-foreground mb-6 text-lg">רוצה משהו דומה?</p>
          <Button
            onClick={onContactClick}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-7 text-lg font-semibold rounded-2xl glow transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-primary/50"
          >
            התחל פרויקט חדש
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;