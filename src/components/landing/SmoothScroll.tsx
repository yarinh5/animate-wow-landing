import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isLiteDevice, prefersReducedMotion } from "@/lib/motion";

/** Lenis on desktop only. Mobile/touch keeps 100% native browser scrolling. */
const SmoothScroll = () => {
  useEffect(() => {
    if (isLiteDevice() || prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    const w = window as unknown as { lenis?: Lenis };
    w.lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      delete w.lenis;
    };
  }, []);

  return null;
};

export default SmoothScroll;
