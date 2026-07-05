import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

interface TextScrambleProps {
  text: string;
  className?: string;
  duration?: number;
}

export const TextScramble = ({ text, className = "", duration = 1.2 }: TextScrambleProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const length = text.length;
    const frames = Math.max(Math.floor(duration * 60), 30);
    let frame = 0;
    let rafId = 0;
    let triggered = false;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        if (triggered) return;
        triggered = true;

        const animate = () => {
          frame++;
          const progress = frame / frames;
          const revealed = Math.floor(progress * length);

          let output = "";
          for (let i = 0; i < length; i++) {
            if (text[i] === " ") {
              output += " ";
            } else if (i < revealed) {
              output += text[i];
            } else {
              output += CHARS[Math.floor(Math.random() * CHARS.length)];
            }
          }

          el.textContent = output;

          if (frame < frames) {
            rafId = requestAnimationFrame(animate);
          }
        };

        rafId = requestAnimationFrame(animate);
      },
      once: true,
    });

    return () => {
      trigger.kill();
      cancelAnimationFrame(rafId);
    };
  }, [text, duration]);

  return <span ref={ref} className={className}>{text}</span>;
};

export default TextScramble;
