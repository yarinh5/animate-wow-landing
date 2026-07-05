import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Code, Globe, Zap, Users, ArrowLeft, Sparkles } from "lucide-react";
import { TextScramble } from "@/components/landing/TextScramble";

gsap.registerPlugin(ScrollTrigger);

interface ServicesSectionProps {
  onContactClick: () => void;
}

const services = [
  {
    icon: Globe,
    title: "דפי נחיתה",
    description: "דפי נחיתה ממירים ומרשימים שמשדרגים את העסק שלך ומביאים לקוחות חדשים",
    features: ["עיצוב מותאם אישית", "אופטימיזציה למובייל", "מהירות טעינה גבוהה"],
    color: "primary",
  },
  {
    icon: Code,
    title: "פיתוח אתרים",
    description: "אתרים מקצועיים עם חווית משתמש מושלמת וטכנולוגיות מתקדמות",
    features: ["React & TypeScript", "עיצוב רספונסיבי", "SEO מובנה"],
    color: "secondary",
  },
  {
    icon: Zap,
    title: "אוטומציות",
    description: "חסוך זמן וכסף עם אוטומציות חכמות שעובדות 24/7 בשבילך",
    features: ["חיבור בין מערכות", "תהליכים אוטומטיים", "דוחות בזמן אמת"],
    color: "accent",
  },
  {
    icon: Users,
    title: "מערכות CRM",
    description: "נהל את הלקוחות שלך ביעילות עם מערכות CRM מותאמות אישית",
    features: ["ניהול לידים", "מעקב מכירות", "דשבורדים מתקדמים"],
    color: "primary",
  },
];

const ServicesSection = ({ onContactClick }: ServicesSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to(backgroundRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Title animation with split text effect
      const titleElement = titleRef.current?.querySelector("h2");
      if (titleElement) {
        gsap.fromTo(
          titleElement,
          { 
            opacity: 0, 
            y: 120,
            rotateX: -45,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Cards animation with dramatic entrance
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        // Initial dramatic entrance
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            y: 150, 
            rotateY: -30,
            rotateX: 15,
            scale: 0.7,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 60%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.15,
          }
        );

        // Icon animation inside card
        const icon = card.querySelector(".service-icon");
        if (icon) {
          gsap.fromTo(
            icon,
            { rotation: -180, scale: 0 },
            {
              rotation: 0,
              scale: 1,
              duration: 0.8,
              ease: "elastic.out(1, 0.5)",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
              delay: i * 0.1 + 0.3,
            }
          );
        }

        // Features stagger animation
        const features = card.querySelectorAll(".feature-item");
        gsap.fromTo(
          features,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.1 + 0.5,
          }
        );

        // Hover effect with GSAP - more dramatic
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.05,
            y: -20,
            rotateY: 5,
            rotateX: -5,
            boxShadow: "0 30px 60px -15px hsl(var(--primary) / 0.3)",
            duration: 0.4,
            ease: "power2.out",
          });
          gsap.to(card.querySelector(".service-icon"), {
            scale: 1.2,
            rotation: 10,
            duration: 0.3,
          });
          gsap.to(card.querySelector(".card-glow"), {
            opacity: 1,
            scale: 1.5,
            duration: 0.4,
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            rotateY: 0,
            rotateX: 0,
            boxShadow: "none",
            duration: 0.4,
            ease: "power2.out",
          });
          gsap.to(card.querySelector(".service-icon"), {
            scale: 1,
            rotation: 0,
            duration: 0.3,
          });
          gsap.to(card.querySelector(".card-glow"), {
            opacity: 0,
            scale: 1,
            duration: 0.4,
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-32 relative overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Animated background */}
      <div ref={backgroundRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[150px]" />
      </div>

      <div className="container px-4 relative z-10">
        <div ref={titleRef} className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-primary text-sm font-medium tracking-wider uppercase">
              השירותים שלי
            </span>
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold mb-6">
            מה אני <span className="text-gradient">יכול לעשות</span> בשבילך?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            פתרונות דיגיטליים מקצה לקצה שמקדמים את העסק שלך
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group glass rounded-3xl p-8 gradient-border hover:border-primary/50 transition-all duration-500 relative overflow-hidden"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Card glow effect */}
              <div className="card-glow absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 transition-opacity duration-300" />

              <div className="flex items-start gap-6 relative z-10">
                <div className="service-icon w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="feature-item flex items-center gap-2 text-sm text-foreground/80">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={onContactClick}
                    variant="ghost"
                    className="text-primary hover:text-primary hover:bg-primary/10 p-0 h-auto font-medium group/btn"
                  >
                    <span>קבל הצעת מחיר</span>
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover/btn:-translate-x-2 transition-transform duration-300" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button with animation */}
        <div className="text-center mt-16">
          <Button
            onClick={onContactClick}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-7 text-lg font-semibold rounded-2xl glow transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-primary/50"
          >
            בוא נדבר על הפרויקט שלך
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;