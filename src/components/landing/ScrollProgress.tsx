import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { isLiteDevice } from "@/lib/motion";

/** Desktop-only top progress bar */
const ScrollProgress = () => {
  const progressRef = useRef<HTMLDivElement>(null);
  const [enabled] = useState(() => !isLiteDevice());

  useEffect(() => {
    if (!enabled || !progressRef.current) return;
    const tween = gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-transparent hidden md:block">
      <div
        ref={progressRef}
        className="h-full bg-gradient-to-r from-primary via-secondary to-accent origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
};

export default ScrollProgress;
