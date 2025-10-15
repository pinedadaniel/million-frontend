"use client";

import { useEffect, useRef } from "react";

export default function MasonryGrid({
  children,
  className = "",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const isotopContainer = useRef<HTMLDivElement | null>(null);
  const initIsotop = async () => {
    const Isotope = (await import("isotope-layout")).default;
    const imagesloaded = (await import("imagesloaded")).default;

    if (!isotopContainer.current) return;
    // Initialize Isotope in the mounted hook
    const isotope = new Isotope(isotopContainer.current, {
      itemSelector: ".gallery__item",
      layoutMode: "masonry", // or 'fitRows', depending on your layout needs
    });
    imagesloaded(isotopContainer.current).on("progress", function () {
      // Trigger Isotope layout
      isotope.layout();
    });
  };

  useEffect(() => {
    /////////////////////////////////////////////////////
    // Magnate Animation

    setTimeout(() => {
      initIsotop();
    }, 100);
  }, []);
  return (
    <div className={className} ref={isotopContainer} {...rest}>
      {children}
    </div>
  );
}
