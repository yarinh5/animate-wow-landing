import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Award, Clock, CheckCircle, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
  onContactClick: () => void;
}

const stats = [
  { icon: Rocket, value: "50+", label: "פרויקטים הושלמו" },
  { icon: Award, value: "5+", label: "שנות ניסיון" },
  { icon: Clock, value: "24/7", label: "תמיכה ושירות" },
  { icon: CheckCircle, value: "100%", label: "שביעות רצון" },
];

const AboutSection = ({ onContactClick }: AboutSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 80, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Stats counter animation
      const statElements = statsRef.current?.querySelectorAll(".stat-value");
      statElements?.forEach((el) => {
        const finalValue = el.textContent || "";
        const numericValue = parseInt(finalValue.replace(/\D/g, ""));
        
        if (!isNaN(numericValue) && numericValue > 0) {
          gsap.fromTo(
            el,
            { textContent: "0" },
            {
              textContent: numericValue,
              duration: 2,
              ease: "power2.out",
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reset",
              },
              onUpdate: function () {
                const suffix = finalValue.replace(/[0-9]/g, "");
                el.textContent = Math.floor(Number(this.targets()[0].textContent)) + suffix;
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px]" />

      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div ref={contentRef} className="order-2 lg:order-1">
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
              קצת עליי
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              מביא את <span className="text-gradient">החזון שלך</span> לחיים
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              אני יארין חזן, מפתח ומעצב דיגיטלי עם תשוקה ליצירת חוויות משתמש מדהימות. 
              מתמחה בפיתוח דפי נחיתה שממירים, אתרים מקצועיים, אוטומציות חכמות ומערכות CRM.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              כל פרויקט שאני לוקח הוא הזדמנות ליצור משהו ייחודי שעוזר לעסקים לצמוח ולהגיע 
              ללקוחות חדשים. אני מאמין בגישה אישית וביכולת להבין את הצרכים הספציפיים של כל לקוח.
            </p>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="stat-value text-2xl font-display font-bold text-gradient">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            <Button
              onClick={onContactClick}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl glow transition-all duration-300 hover:scale-105"
            >
              בוא נעבוד יחד
            </Button>
          </div>

          {/* Visual element */}
          <div ref={imageRef} className="order-1 lg:order-2 relative">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative circles */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse" />
              <div className="absolute inset-4 rounded-full border border-secondary/30" />
              <div className="absolute inset-8 rounded-full border border-accent/20" />
              
              {/* Main content */}
              <div className="absolute inset-12 glass rounded-3xl flex items-center justify-center gradient-border">
                <div className="text-center p-8">
                  <div className="text-6xl font-display font-black text-gradient mb-4">YH</div>
                  <p className="text-muted-foreground">Web Developer</p>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-0 right-0 glass rounded-xl p-4 floating">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm">זמין לעבודה</span>
                </div>
              </div>

              <div className="absolute bottom-10 left-0 glass rounded-xl p-4 floating" style={{ animationDelay: "2s" }}>
                <div className="flex items-center gap-2">
                  <Rocket className="w-4 h-4 text-primary" />
                  <span className="text-sm">משלוח מהיר</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
