"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { basePath } from "@/lib/basePath";

export function BottomNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 left-0 w-full z-40 md:hidden bg-black/60 backdrop-blur-xl border-t border-white/[0.06] py-4 px-6 flex items-center justify-between"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href={`${basePath}/`}
            className="font-body text-[10px] text-white/70 uppercase tracking-[0.2em] border border-white/15 rounded-[5px] px-5 py-2.5 hover:border-white/30 hover:text-white/90 active:scale-[0.97] transition-all duration-300"
          >
            Home
          </a>

          <a
            href={`${basePath}/#wine-collection`}
            className="font-body text-[10px] text-white/70 uppercase tracking-[0.2em] border border-white/15 rounded-[5px] px-5 py-2.5 hover:border-[#C8A96E]/40 hover:text-[#C8A96E]/90 active:scale-[0.97] transition-all duration-300"
          >
            View All Wines
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
