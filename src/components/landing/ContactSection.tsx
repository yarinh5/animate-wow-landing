import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Send, Mail, Phone, MapPin, Loader2, Sparkles, MessageSquare } from "lucide-react";
import { z } from "zod";

gsap.registerPlugin(ScrollTrigger);

const contactSchema = z.object({
  name: z.string().trim().min(1, "שם חובה").max(100, "שם ארוך מדי"),
  email: z.string().trim().email("אימייל לא תקין").max(255, "אימייל ארוך מדי"),
  phone: z.string().trim().min(1, "טלפון חובה").max(20, "טלפון ארוך מדי"),
  message: z.string().trim().min(1, "הודעה חובה").max(1000, "ההודעה ארוכה מדי"),
});

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const inputsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
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

      // Form animation with dramatic slide
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: -150, rotateY: 20 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Form inputs stagger animation
      inputsRef.current.forEach((input, i) => {
        if (!input) return;
        gsap.fromTo(
          input,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.1 + 0.3,
          }
        );
      });

      // Info animation with dramatic slide
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: 150, rotateY: -20 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Contact info items animation
      const infoItems = infoRef.current?.querySelectorAll(".contact-item");
      infoItems?.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: 50, scale: 0.9 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: infoRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.15 + 0.3,
          }
        );

        // Hover animation
        item.addEventListener("mouseenter", () => {
          gsap.to(item, {
            x: -10,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(item.querySelector(".contact-icon"), {
            scale: 1.2,
            rotation: 10,
            duration: 0.3,
          });
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(item, {
            x: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(item.querySelector(".contact-icon"), {
            scale: 1,
            rotation: 0,
            duration: 0.3,
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const firstError = result.error.errors[0];
      toast({
        title: "שגיאה בטופס",
        description: firstError.message,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "ההודעה נשלחה בהצלחה! 🎉",
        description: "אחזור אליך בהקדם האפשרי",
      });

      // Reset form
      setFormData({ name: "", email: "", phone: "", message: "" });

      // Success animation
      gsap.fromTo(
        formRef.current,
        { scale: 1 },
        { 
          scale: 1.02, 
          duration: 0.2, 
          yoyo: true, 
          repeat: 3,
          ease: "power2.inOut",
        }
      );
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "שגיאה בשליחה",
        description: "נסה שוב מאוחר יותר",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 relative overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Background effects */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[180px]" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="container px-4 relative z-10">
        <div ref={titleRef} className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-primary text-sm font-medium tracking-wider uppercase">
              צור קשר
            </span>
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold mb-6">
            בוא <span className="text-gradient">נדבר</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            יש לך פרויקט בראש? אשמח לשמוע ולעזור להפוך אותו למציאות
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass rounded-3xl p-8 md:p-10 gradient-border space-y-6"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-primary" />
              <span className="font-semibold">שלח לי הודעה</span>
            </div>
            
            <div ref={(el) => (inputsRef.current[0] = el)} className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="text-sm font-medium mb-2 block">
                  שם מלא
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="השם שלך"
                  className="bg-muted/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 h-12 rounded-xl"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium mb-2 block">
                  אימייל
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="bg-muted/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 h-12 rounded-xl"
                  required
                />
              </div>
            </div>

            <div ref={(el) => (inputsRef.current[1] = el)}>
              <label htmlFor="phone" className="text-sm font-medium mb-2 block">
                טלפון
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="050-0000000"
                className="bg-muted/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 h-12 rounded-xl"
                required
              />
            </div>

            <div ref={(el) => (inputsRef.current[2] = el)}>
              <label htmlFor="message" className="text-sm font-medium mb-2 block">
                הודעה
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="ספר לי על הפרויקט שלך..."
                rows={5}
                className="bg-muted/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none rounded-xl"
                required
              />
            </div>

            <div ref={(el) => (inputsRef.current[3] = el)}>
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-7 text-lg font-semibold rounded-2xl glow transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                    שולח...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 ml-2" />
                    שלח הודעה
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Contact info */}
          <div ref={infoRef} className="flex flex-col justify-center" style={{ transformStyle: "preserve-3d" }}>
            <h3 className="text-2xl font-display font-bold mb-6">
              דרכים נוספות ליצור קשר
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              אני זמין לפניות בכל אחד מהערוצים הבאים. אשמח לענות על כל שאלה או לדבר על הפרויקט הבא שלך.
            </p>

            <div className="space-y-6">
              <div className="contact-item flex items-center gap-4 group cursor-pointer">
                <div className="contact-icon w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 shadow-lg">
                  <Mail className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">אימייל</div>
                  <a
                    href="mailto:yarinhazan395@gmail.com"
                    className="text-lg font-semibold hover:text-primary transition-colors"
                  >
                    yarinhazan395@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-item flex items-center gap-4 group cursor-pointer">
                <div className="contact-icon w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 shadow-lg">
                  <Phone className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">טלפון</div>
                  <div className="text-lg font-semibold">זמין לשיחה</div>
                </div>
              </div>

              <div className="contact-item flex items-center gap-4 group cursor-pointer">
                <div className="contact-icon w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 shadow-lg">
                  <MapPin className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">מיקום</div>
                  <div className="text-lg font-semibold">ישראל</div>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="mt-12 p-6 glass rounded-2xl gradient-border group hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
                <span className="font-semibold text-lg">זמין לפרויקטים חדשים</span>
              </div>
              <p className="text-muted-foreground">
                בדרך כלל אני מגיב תוך 24 שעות. בוא נדבר על הפרויקט שלך!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;