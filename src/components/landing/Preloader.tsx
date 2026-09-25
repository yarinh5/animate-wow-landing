import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const yRef = useRef<HTMLSpanElement>(null);
  const hRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock page scroll while the preloader is visible, restore original value after
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const restore = () => {
      document.body.style.overflow = prevOverflow;
    };
    let timeoutId: ReturnType<typeof setTimeout>;

    const tl = gsap.timeline({
      onComplete: () => {
        restore();
        timeoutId = setTimeout(onComplete, 200);
      },
    });
    const lite = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) tl.timeScale(4);
    else if (lite) tl.timeScale(1.5);

    // Initial state
    gsap.set([yRef.current, hRef.current], { opacity: 0, y: 40, scale: 0.5 });

    // Letters entrance
    tl.to(yRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: "back.out(2)",
    })
      .to(
        hRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "back.out(2)",
        },
        "-=0.4"
      )
      // Split apart
      .to(
        yRef.current,
        { x: -60, rotation: -15, duration: 0.6, ease: "power2.inOut" },
        "+=0.3"
      )
      .to(
        hRef.current,
        { x: 60, rotation: 15, duration: 0.6, ease: "power2.inOut" },
        "<"
      )
      // Sound wave pulse
      .to(
        waveRef.current,
        {
          scale: 3,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "<"
      )
      // Recombine
      .to([yRef.current, hRef.current], {
        x: 0,
        rotation: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)",
      })
      // Progress bar
      .to(
        barRef.current,
        {
          width: "100%",
          duration: 0.8,
          ease: "power2.inOut",
          onUpdate: function () {
            setProgress(Math.round(this.progress() * 100));
          },
        },
        "-=0.5"
      )
      // Exit
      .to([yRef.current, hRef.current], {
        scale: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.in",
      })
      .to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      );

    return () => {
      tl.kill();
      clearTimeout(timeoutId);
      restore();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
    >
      <div className="relative flex items-center justify-center">
        <div
          ref={waveRef}
          className="absolute h-32 w-32 rounded-full border-2 border-primary"
        />
        <div className="flex items-center text-7xl font-bold md:text-9xl">
          <span
            ref={yRef}
            className="inline-block bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent"
          >
            Y
          </span>
          <span
            ref={hRef}
            className="inline-block bg-gradient-to-br from-accent to-primary bg-clip-text text-transparent"
          >
            H
          </span>
        </div>
      </div>
      <div className="mt-16 w-64">
        <div className="h-0.5 w-full overflow-hidden bg-muted">
          <div
            ref={barRef}
            className="h-full w-0 bg-gradient-to-r from-primary to-accent"
          />
        </div>
        <div className="mt-3 text-center font-mono text-xs text-muted-foreground">
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default Preloader;