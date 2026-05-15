"use client";

/**
 * CartEmpty — the empty-state inside the cart drawer.
 *
 * Editorial copy + CTA back to the wine listing. Uses the same
 * basket-with-grapes mark as the navbar icon but oversized in
 * gold/30 for a single quiet image.
 */

import { basePath } from "@/lib/basePath";
import { useCart } from "@/lib/cart/CartContext";
import { CartIcon } from "./CartIcon";

export function CartEmpty() {
  const { closeDrawer } = useCart();

  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-16 md:py-24">
      <div className="text-[#C8A96E]/40 mb-6">
        <CartIcon size={64} />
      </div>
      <p
        className="font-display italic text-cream mb-3"
        style={{ fontSize: "clamp(20px, 2vw, 26px)" }}
      >
        Your basket is empty.
      </p>
      <p
        className="font-body font-light text-white/55 max-w-[36ch] mb-8"
        style={{ fontSize: "clamp(13px, 1.1vw, 15px)" }}
      >
        Bring something home from Sussex — bottles to celebrate, gift
        or simply enjoy.
      </p>
      <a
        href={`${basePath}/wines`}
        onClick={closeDrawer}
        className="btn-cta"
      >
        Shop all wines
      </a>
    </div>
  );
}
