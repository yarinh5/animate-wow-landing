import { useEffect } from "react";
import Lenis from "lenis";

const SmoothScroll = () => {
  useEffect(() => {
    // Touch devices: native scrolling is smoother than JS-driven scrolling
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) {
      ScrollTrigger.config({ ignoreMobileResize: true });
      ScrollTrigger.normalizeScroll(false);
      return;
    }
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    // Expose globally so smooth in-page anchors work
    (window as unknown as { lenis: Lenis }).lenis = lenis;
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
  return null;
};
export default SmoothScroll;
/*
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Expose globally so smooth in-page anchors work with existing scrollIntoView calls
    (window as unknown as { lenis: Lenis }).lenis = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;