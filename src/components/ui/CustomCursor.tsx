"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [finePointer, setFinePointer] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Fast dot
  const dotX = useSpring(mouseX, { stiffness: 800, damping: 50, mass: 0.3 });
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 50, mass: 0.3 });

  // Slower ring
  const ringX = useSpring(mouseX, { stiffness: 180, damping: 28, mass: 0.6 });
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 28, mass: 0.6 });

  useEffect(() => {
    // Only show on fine-pointer (desktop) devices
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setFinePointer(true);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const attachHover = () => {
      document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
        el.addEventListener("mouseenter", () => setHovering(true));
        el.addEventListener("mouseleave", () => setHovering(false));
      });
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    attachHover();
    const t = setInterval(attachHover, 1500);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      clearInterval(t);
    };
  }, [mouseX, mouseY]);

  if (!finePointer) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[99999] pointer-events-none rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
          backgroundColor: "rgba(245,240,232,0.9)",
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.4 : 1,
          transition: "opacity 0.15s, scale 0.1s",
          mixBlendMode: "difference",
        }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[99998] pointer-events-none rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 44 : 26,
          height: hovering ? 44 : 26,
          border: "1px solid rgba(245,240,232,0.45)",
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.7 : 1,
          transition: "width 0.35s cubic-bezier(0.25,0.46,0.45,0.94), height 0.35s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.2s, scale 0.1s",
        }}
      />
    </>
  );
}
