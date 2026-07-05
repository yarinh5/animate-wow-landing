import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FloatingShapes = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shapes = containerRef.current?.querySelectorAll(".parallax-shape");
    if (!shapes) return;

    shapes.forEach((shape, i) => {
      gsap.to(shape, {
        y: gsap.utils.random(-150, 150),
        x: gsap.utils.random(-50, 50),
        rotation: gsap.utils.random(-90, 90),
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1 + i * 0.3,
        },
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="parallax-shape absolute top-[15%] left-[8%] w-24 h-24 border border-primary/15 rounded-full" />
      <div className="parallax-shape absolute top-[35%] right-[10%] w-20 h-20 bg-secondary/10 rounded-lg rotate-45" />
      <div className="parallax-shape absolute top-[60%] left-[15%] w-16 h-16 border border-accent/15 rounded-full" />
      <div className="parallax-shape absolute top-[80%] right-[12%] w-28 h-28 bg-primary/5 rounded-full blur-xl" />
      <div className="parallax-shape absolute top-[45%] left-[85%] w-12 h-12 border border-secondary/20 rotate-12" />
      <div className="parallax-shape absolute top-[25%] left-[40%] w-8 h-8 bg-accent/10 rounded-full" />
    </div>
  );
};

export default FloatingShapes;
