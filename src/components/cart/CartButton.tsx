"use client";

/**
 * CartButton — basket icon + line-item count badge.
 *
 * Renders the CartIcon (woven basket with grapes) with a gold-bordered
 * count badge in the top-right. Clicking it opens the cart drawer.
 * The badge is hidden when count = 0, and pulses briefly each time
 * an item is freshly added (via `recentlyAddedId`).
 *
 * Sits in the Navbar's right action zone next to the Search and
 * Account icons. Inherits color from the parent (Navbar handles the
 * scroll-state colour shift on its own).
 */

import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart/CartContext";
import { CartIcon } from "./CartIcon";

interface CartButtonProps {
  /** Tailwind class for the icon stroke colour at rest — passed
   *  through so the Navbar can match its current state (white/65
   *  vs. cream depending on scroll). */
  className?: string;
}

export function CartButton({ className = "" }: CartButtonProps) {
  const { count, openDrawer, recentlyAddedId } = useCart();
  const [pulse, setPulse] = useState(false);

  // Pulse the badge briefly each time recentlyAddedId becomes truthy.
  useEffect(() => {
    if (!recentlyAddedId) return;
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 600);
    return () => clearTimeout(t);
  }, [recentlyAddedId]);

  return (
    <button
      type="button"
      onClick={openDrawer}
      aria-label={`Open cart — ${count} item${count === 1 ? "" : "s"}`}
      className={`relative inline-flex items-center justify-center p-1 transition-colors duration-300 hover:text-[#C8A96E] focus-visible:outline-none focus-visible:text-[#C8A96E] ${className}`}
    >
      <CartIcon size={28} />
      {count > 0 && (
        <span
          aria-hidden
          className={`absolute bottom-0 right-0 flex items-center justify-center min-w-[14px] h-[14px] px-[3px] rounded-full bg-[#C8A96E] text-[#010101] font-body text-[8px] font-medium leading-none ring-1 ring-[#010101] tabular-nums transition-transform duration-300 ${
            pulse ? "scale-110" : "scale-100"
          }`}
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
