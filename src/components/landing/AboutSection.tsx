import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Award, Clock, CheckCircle, Rocket, Star, Sparkles } from "lucide-react";
import { TextScramble } from "@/components/landing/TextScramble";

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
  const floatingElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation with dramatic slide
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -150, rotateY: 20 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Image animation with 3D flip
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 150, rotateY: -20, scale: 0.8 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Floating elements continuous animation
      const floatingElements = floatingElementsRef.current?.children;
      if (floatingElements) {
        Array.from(floatingElements).forEach((el, i) => {
          // Initial entrance
          gsap.fromTo(
            el,
            { opacity: 0, scale: 0, rotation: -90 },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.8,
              delay: 0.5 + i * 0.2,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: imageRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // Continuous floating
          gsap.to(el, {
            y: gsap.utils.random(-25, 25),
            x: gsap.utils.random(-15, 15),
            rotation: gsap.utils.random(-10, 10),
            duration: gsap.utils.random(3, 5),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.5,
          });
        });
      }

      // Stats counter animation with dramatic effect
      const statElements = statsRef.current?.querySelectorAll(".stat-item");
      statElements?.forEach((statItem, i) => {
        // Entrance animation
        gsap.fromTo(
          statItem,
          { opacity: 0, y: 80, scale: 0.5, rotation: -15 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.15,
          }
        );

        // Icon pulse animation
        const icon = statItem.querySelector(".stat-icon");
        gsap.to(icon, {
          scale: 1.2,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      });

      // Counter animation
      const valueElements = statsRef.current?.querySelectorAll(".stat-value");
      valueElements?.forEach((el) => {
        const finalValue = el.textContent || "";
        const numericValue = parseInt(finalValue.replace(/\D/g, ""));
        
        if (!isNaN(numericValue) && numericValue > 0) {
          gsap.fromTo(
            el,
            { textContent: "0" },
            {
              textContent: numericValue,
              duration: 2.5,
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

      // Decorative circles animation
      gsap.to(".orbit-ring", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".orbit-ring-reverse", {
        rotation: -360,
        duration: 25,
        repeat: -1,
        ease: "none",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-32 relative overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Background effects */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px]" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <div ref={contentRef} className="order-2 lg:order-1" style={{ transformStyle: "preserve-3d" }}>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-primary text-sm font-medium tracking-wider uppercase">
                קצת עליי
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              מביא את <span className="text-gradient">החזון שלך</span> לחיים
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              אני יארין חזן, מפתח ומעצב דיגיטלי עם תשוקה ליצירת חוויות משתמש מדהימות. 
              מתמחה בפיתוח דפי נחיתה שממירים, אתרים מקצועיים, אוטומציות חכמות ומערכות CRM.
            </p>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              כל פרויקט שאני לוקח הוא הזדמנות ליצור משהו ייחודי שעוזר לעסקים לצמוח ולהגיע 
              ללקוחות חדשים. אני מאמין בגישה אישית וביכולת להבין את הצרכים הספציפיים של כל לקוח.
            </p>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item text-center group cursor-pointer">
                  <div className="stat-icon w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors duration-300">
                    <stat.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="stat-value text-3xl font-display font-bold text-gradient">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <Button
              onClick={onContactClick}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-7 text-lg font-semibold rounded-2xl glow transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-primary/50"
            >
              בוא נעבוד יחד
            </Button>
          </div>

          {/* Visual element */}
          <div ref={imageRef} className="order-1 lg:order-2 relative" style={{ transformStyle: "preserve-3d" }}>
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Animated orbital rings */}
              <div className="orbit-ring absolute inset-0 rounded-full border-2 border-primary/20" />
              <div className="orbit-ring-reverse absolute inset-4 rounded-full border border-secondary/30" />
              <div className="orbit-ring absolute inset-8 rounded-full border border-accent/20" />
              <div className="orbit-ring-reverse absolute inset-12 rounded-full border border-primary/10" />
              
              {/* Orbiting dots */}
              <div className="orbit-ring absolute inset-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/50" />
              </div>
              <div className="orbit-ring-reverse absolute inset-4">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-secondary rounded-full shadow-lg shadow-secondary/50" />
              </div>
              
              {/* Main content */}
              <div className="absolute inset-16 glass rounded-3xl flex items-center justify-center gradient-border overflow-hidden">
                <div className="text-center p-8 relative z-10">
                  <div className="text-7xl md:text-8xl font-display font-black text-gradient mb-4">YH</div>
                  <p className="text-muted-foreground font-medium">Web Developer</p>
                </div>
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
              </div>

              {/* Floating elements */}
              <div ref={floatingElementsRef}>
                <div className="absolute top-4 right-4 glass rounded-xl p-4 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
                    <span className="text-sm font-medium">זמין לעבודה</span>
                  </div>
                </div>

                <div className="absolute bottom-8 left-0 glass rounded-xl p-4 shadow-xl">
                  <div className="flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">משלוח מהיר</span>
                  </div>
                </div>

                <div className="absolute top-1/3 left-0 glass rounded-xl p-3 shadow-xl">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-medium">5.0</span>
                  </div>
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