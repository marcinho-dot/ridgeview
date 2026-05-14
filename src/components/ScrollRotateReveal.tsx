"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";

interface ScrollRotateRevealProps {
  titleComponent: ReactNode;
  children: ReactNode;
  cardMaxWidth?: string;
  cardHeight?: string;
}

export function ScrollRotateReveal({
  titleComponent,
  children,
  cardMaxWidth = "max-w-5xl",
  cardHeight = "h-[30rem] md:h-[40rem]",
}: ScrollRotateRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.7, 0.9] : [1.05, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      ref={containerRef}
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{ perspective: "1000px" }}
      >
        <Header translate={translate}>{titleComponent}</Header>
        <Card rotate={rotate} scale={scale} cardMaxWidth={cardMaxWidth} cardHeight={cardHeight}>
          {children}
        </Card>
      </div>
    </div>
  );
}

function Header({
  translate,
  children,
}: {
  translate: MotionValue<number>;
  children: ReactNode;
}) {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="max-w-5xl mx-auto text-center relative z-10"
    >
      {children}
    </motion.div>
  );
}

function Card({
  rotate,
  scale,
  cardMaxWidth,
  cardHeight,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  cardMaxWidth: string;
  cardHeight: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className={`${cardMaxWidth} -mt-12 mx-auto ${cardHeight} w-full border border-[#C8A96E]/20 p-2 md:p-4 bg-[#0d0d0d] rounded-sm`}
    >
      <div className="h-full w-full overflow-hidden rounded-sm bg-[#080808]">
        {children}
      </div>
    </motion.div>
  );
}
