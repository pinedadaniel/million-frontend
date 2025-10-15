"use client";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useState } from "react";

export default function LenisSmoothScroll() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
      setTimeout(() => {
          setIsMounted(true);
      }, 2000)
  }, []);

  useLenis();

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ReactLenis root />
    </>
  );
}
