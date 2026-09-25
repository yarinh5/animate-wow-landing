import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Avoid refresh/jumps when the mobile address bar shows/hides
ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true });

export const DESKTOP_QUERY = "(min-width: 768px) and (pointer: fine)";
export const LITE_QUERY = "(max-width: 767px), (pointer: coarse)";
export const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
export const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

export const MM_CONDITIONS = {
  isDesktop: DESKTOP_QUERY,
  reduce: REDUCED_QUERY,
};

const mq = (q: string) => typeof window !== "undefined" && window.matchMedia(q).matches;

/** True on phones / touch devices: native scroll + light animations only */
export const isLiteDevice = () => mq(LITE_QUERY);
export const prefersReducedMotion = () => mq(REDUCED_QUERY);

type Cleanup = () => void;
/** addEventListener that registers its own removal */
export const listen = <K extends keyof HTMLElementEventMap>(
  cleanups: Cleanup[],
  el: Element | null | undefined,
  type: K,
  fn: (e: HTMLElementEventMap[K]) => void
) => {
  if (!el) return;
  el.addEventListener(type, fn as EventListener);
  cleanups.push(() => el.removeEventListener(type, fn as EventListener));
};

/** Lightweight one-shot reveal for mobile: opacity + small y, once, batched */
export const liteReveal = (targets: gsap.DOMTarget) => {
  const els = gsap.utils.toArray<Element>(targets);
  if (!els.length) return;
  gsap.set(els, { opacity: 0, y: 30 });
  ScrollTrigger.batch(els, {
    start: "top 92%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", stagger: 0.08, overwrite: true }),
  });
};

/** Single scroll-to-section utility: Lenis on desktop, native smooth on mobile */
export const scrollToSection = (target: string | HTMLElement | null) => {
  if (target === null) return;
  if (target === "top") {
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: number) => void } }).lenis;
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el =
    typeof target === "string"
      ? (document.querySelector(target.startsWith("#") ? target : `#${target}`) as HTMLElement | null)
      : target;
  if (!el) return;
  const lenis = (window as unknown as { lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }).lenis;
  if (lenis) lenis.scrollTo(el, { offset: -80 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
};
