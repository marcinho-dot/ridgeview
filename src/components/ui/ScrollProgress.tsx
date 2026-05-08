"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[99997] pointer-events-none origin-left"
      style={{
        scaleX,
        height: "1px",
        background:
          "linear-gradient(90deg, rgba(245,240,232,0) 0%, rgba(245,240,232,0.55) 40%, rgba(245,240,232,0.8) 100%)",
      }}
    />
  );
}
