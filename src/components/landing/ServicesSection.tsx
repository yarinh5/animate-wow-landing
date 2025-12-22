import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Code, Globe, Zap, Users, ArrowLeft } from "lucide-react";

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
  },
  {
    icon: Code,
    title: "פיתוח אתרים",
    description: "אתרים מקצועיים עם חווית משתמש מושלמת וטכנולוגיות מתקדמות",
    features: ["React & TypeScript", "עיצוב רספונסיבי", "SEO מובנה"],
  },
  {
    icon: Zap,
    title: "אוטומציות",
    description: "חסוך זמן וכסף עם אוטומציות חכמות שעובדות 24/7 בשבילך",
    features: ["חיבור בין מערכות", "תהליכים אוטומטיים", "דוחות בזמן אמת"],
  },
  {
    icon: Users,
    title: "מערכות CRM",
    description: "נהל את הלקוחות שלך ביעילות עם מערכות CRM מותאמות אישית",
    features: ["ניהול לידים", "מעקב מכירות", "דשבורדים מתקדמים"],
  },
];

const ServicesSection = ({ onContactClick }: ServicesSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards stagger animation
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 100, rotateY: -15 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 60%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.15,
          }
        );

        // Hover effect with GSAP
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.02,
            y: -10,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
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
      id="services"
      className="py-24 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="container px-4">
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            השירותים שלי
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            מה אני <span className="text-gradient">יכול לעשות</span> בשבילך?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            פתרונות דיגיטליים מקצה לקצה שמקדמים את העסק שלך
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group glass rounded-2xl p-8 gradient-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
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
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover/btn:-translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Button
            onClick={onContactClick}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-lg font-semibold rounded-xl glow transition-all duration-300 hover:scale-105"
          >
            בוא נדבר על הפרויקט שלך
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
