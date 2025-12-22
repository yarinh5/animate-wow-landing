import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Send, Mail, Phone, MapPin, Loader2 } from "lucide-react";
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
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
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
      // Form animation
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Info animation
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
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
        { scale: 1.02, duration: 0.2, yoyo: true, repeat: 1 }
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
      className="py-24 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px]" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px]" />

      <div className="container px-4">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            צור קשר
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
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
            className="glass rounded-2xl p-8 gradient-border space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
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
                  className="bg-muted/50 border-border/50 focus:border-primary transition-colors"
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
                  className="bg-muted/50 border-border/50 focus:border-primary transition-colors"
                  required
                />
              </div>
            </div>

            <div>
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
                className="bg-muted/50 border-border/50 focus:border-primary transition-colors"
                required
              />
            </div>

            <div>
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
                className="bg-muted/50 border-border/50 focus:border-primary transition-colors resize-none"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-semibold rounded-xl glow transition-all duration-300 hover:scale-[1.02]"
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
          </form>

          {/* Contact info */}
          <div ref={infoRef} className="flex flex-col justify-center">
            <h3 className="text-2xl font-display font-bold mb-6">
              דרכים נוספות ליצור קשר
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              אני זמין לפניות בכל אחד מהערוצים הבאים. אשמח לענות על כל שאלה או לדבר על הפרויקט הבא שלך.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">אימייל</div>
                  <a
                    href="mailto:yarinhazan395@gmail.com"
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    yarinhazan395@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">טלפון</div>
                  <div className="text-lg font-medium">זמין לשיחה</div>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">מיקום</div>
                  <div className="text-lg font-medium">ישראל</div>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="mt-12 p-6 glass rounded-2xl gradient-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="font-medium">זמין לפרויקטים חדשים</span>
              </div>
              <p className="text-sm text-muted-foreground">
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
