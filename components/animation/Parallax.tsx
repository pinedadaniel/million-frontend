"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ParallaxItemProps {
  /** Parallax speed; 0 = static, 1 = same as scroll, <1 = slower than scroll, >1 = faster than scroll */
  speed?: number; // default: 0.5
  children: React.ReactNode;
  className?: string;
}

export default function ParallaxItem({
  speed = 0.5,
  children,
  className = "",
}: ParallaxItemProps) {
  const el = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !el.current) return;

    // Registrar ScrollTrigger solo en el cliente
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (el.current) {
        gsap.to(el.current, {
          y: () => (1 - speed) * ScrollTrigger.maxScroll(window),
          ease: "none",
          scrollTrigger: {
            start: 0,
            end: "max",
            invalidateOnRefresh: true,
            scrub: 0,
          },
        });
      }
    }, el);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [speed, isMounted]);

  return (
    <div ref={el} className={className}>
      {children}
    </div>
  );
}
