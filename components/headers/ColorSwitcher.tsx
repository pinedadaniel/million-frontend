"use client";
import React, { useEffect, useState } from "react";
import HoverCursorEffect from "../animation/HoverCursorEffect";

export default function ThemeSwitcherButton({
  parentClass = "color loading__fade"
}) {
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("dark");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedScheme = localStorage.getItem("color-scheme") as "light" | "dark";
    if (savedScheme) {
      setColorScheme(savedScheme);
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const currentScheme = document.documentElement.getAttribute("color-scheme");
    if (currentScheme !== colorScheme) {
      document.documentElement.setAttribute("color-scheme", colorScheme);
    }
    localStorage.setItem("color-scheme", colorScheme);
  }, [colorScheme, isMounted]);

  return (
    <div
      className={parentClass + " " + "fade-in"}
      data-duration="1.2"
      data-delay="300"
    >
        <HoverCursorEffect
          as="a"
          className="btn btn-default-small hover-default-small"
          href="#letstalk"
        >
          <i className="ph ph-phone me-2" style={{ zIndex: 1 }}></i>
          <span className="btn-caption" style={{ zIndex: 1 }}>
            Let&#39;s Talk
          </span>
        </HoverCursorEffect>
    </div>
  );
}
