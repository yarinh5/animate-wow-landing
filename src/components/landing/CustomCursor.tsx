import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const [enabled] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );

  useEffect(() => {
    // Desktop mouse only — never runs on touch devices
    if (!enabled) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId: number;
    let shown = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
      }
      if (!shown) {
        shown = true;
        setVisible(true);
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0)`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select, label')) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    const onLeave = () => {
      shown = false;
      setVisible(false);
    };
    const onEnter = () => {
      shown = true;
      setVisible(true);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    document.body.style.cursor = "none";

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.body.style.cursor = "";
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-2 w-2 rounded-full bg-primary mix-blend-difference transition-opacity duration-200"
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 rounded-full border border-primary transition-[width,height,opacity,background-color,margin] duration-300 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: "translate3d(-100px, -100px, 0)",
          ...(hovering && {
            width: "60px",
            height: "60px",
            marginLeft: "-10px",
            marginTop: "-10px",
            backgroundColor: "hsl(var(--primary) / 0.15)",
            boxShadow: "0 0 30px hsl(var(--primary) / 0.5)",
          }),
        }}
      />
    </>
  );
};

export default CustomCursor;