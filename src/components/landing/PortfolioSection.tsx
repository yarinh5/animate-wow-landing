import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ExternalLink, Code2, Smartphone, Palette } from "lucide-react";

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
    gradient: "from-primary/20 to-secondary/20",
  },
  {
    title: "אתר E-Commerce",
    category: "Web Development",
    description: "חנות אונליין מלאה עם מערכת תשלומים וניהול מלאי",
    tags: ["Next.js", "Stripe", "Supabase"],
    icon: Code2,
    gradient: "from-secondary/20 to-accent/20",
  },
  {
    title: "אפליקציית CRM",
    category: "CRM System",
    description: "מערכת ניהול לקוחות מותאמת אישית לחברת שירותים",
    tags: ["React", "TypeScript", "PostgreSQL"],
    icon: Smartphone,
    gradient: "from-accent/20 to-primary/20",
  },
];

const PortfolioSection = ({ onContactClick }: PortfolioSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Projects animation with parallax
      projectsRef.current.forEach((project, i) => {
        if (!project) return;

        gsap.fromTo(
          project,
          { opacity: 0, y: 100, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: project,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.2,
          }
        );

        // 3D tilt effect
        project.addEventListener("mousemove", (e) => {
          const rect = project.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          gsap.to(project, {
            rotateY: x * 10,
            rotateX: -y * 10,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        project.addEventListener("mouseleave", () => {
          gsap.to(project, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="py-24 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container px-4">
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            תיק עבודות
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            פרויקטים <span className="text-gradient">נבחרים</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            הנה כמה דוגמאות לעבודות שעשיתי עבור לקוחות מרוצים
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => (projectsRef.current[index] = el)}
              className="group glass rounded-2xl overflow-hidden gradient-border perspective-1000"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Gradient background */}
              <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                <project.icon className="w-16 h-16 text-primary/50 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category badge */}
                <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-xs font-medium">
                  {project.category}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground"
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
                  <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">רוצה משהו דומה?</p>
          <Button
            onClick={onContactClick}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-lg font-semibold rounded-xl glow transition-all duration-300 hover:scale-105"
          >
            התחל פרויקט חדש
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
