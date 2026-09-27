import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * On touch devices, soften GSAP entrance tweens so scrolling stays smooth:
 * removes blur filters and 3D rotations (very expensive to paint on phones),
 * shortens large offsets, and plays each entrance once instead of reversing.
 * The same effects still happen — just lighter.
 */
gsap.registerPlugin(ScrollTrigger);

const isTouch =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none), (pointer: coarse)").matches;

type Vars = Record<string, unknown>;

const lighten = (vars?: Vars) => {
  if (!vars || typeof vars !== "object") return vars;
  const v: Vars = { ...vars };
  delete v.filter;
  delete v.rotateX;
  delete v.rotateY;
  if (typeof v.y === "number" && Math.abs(v.y) > 40) v.y = Math.sign(v.y) * 40;
  if (typeof v.x === "number" && Math.abs(v.x) > 40) v.x = Math.sign(v.x) * 40;
  if (typeof v.scale === "number" && v.scale < 0.9 && v.scale > 0) v.scale = 0.92;
  if (typeof v.duration === "number" && v.duration > 0.8) v.duration = 0.8;
  if (typeof v.delay === "number" && v.delay > 0.3 && v.scrollTrigger) v.delay = 0.1;
  const st = v.scrollTrigger as Vars | undefined;
  if (st && typeof st === "object") {
    const s: Vars = { ...st };
    if (typeof s.toggleActions === "string") s.toggleActions = "play none none none";
    if (s.scrub !== undefined && s.scrub !== false) s.scrub = true;
    v.scrollTrigger = s;
  }
  return v;
};

if (isTouch) {
  ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true });
  const origTo = gsap.to.bind(gsap);
  const origFrom = gsap.from.bind(gsap);
  const origFromTo = gsap.fromTo.bind(gsap);
  (gsap as unknown as Vars).to = (t: gsap.TweenTarget, vars: Vars) =>
    origTo(t, lighten(vars) as gsap.TweenVars);
  (gsap as unknown as Vars).from = (t: gsap.TweenTarget, vars: Vars) =>
    origFrom(t, lighten(vars) as gsap.TweenVars);
  (gsap as unknown as Vars).fromTo = (t: gsap.TweenTarget, from: Vars, to: Vars) =>
    origFromTo(t, lighten(from) as gsap.TweenVars, lighten(to) as gsap.TweenVars);
}

export {};
