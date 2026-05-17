"use client";

/**
 * CartLineItem - one row in the cart drawer.
 *
 * Layout: bottle thumbnail (left) · product info + variant + qty
 * controls (middle) · line subtotal + remove button (right).
 * Each line has a subtle gold halo when freshly added.
 */

import { CartItem, formatPence } from "@/lib/cart/types";
import { useCart } from "@/lib/cart/CartContext";
import { basePath } from "@/lib/basePath";

interface CartLineItemProps {
  item: CartItem;
}

export function CartLineItem({ item }: CartLineItemProps) {
  const { setQuantity, remove, recentlyAddedId } = useCart();
  const lineSubtotal = item.unitPricePence * item.quantity;
  const isRecentlyAdded = recentlyAddedId === item.id;

  return (
    <li
      className={`flex gap-3 md:gap-4 py-4 md:py-5 border-b border-white/[0.08] transition-colors duration-500 ${
        isRecentlyAdded ? "bg-[rgba(200,169,110,0.06)]" : ""
      }`}
    >
      {/* Bottle thumbnail */}
      <a
        href={`${basePath}/wine/${item.slug}/`}
        className="relative flex-shrink-0 w-16 h-20 md:w-20 md:h-24 rounded-sm overflow-hidden bg-[rgba(245,240,232,0.02)]"
        aria-label={`View ${item.name}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${basePath}${item.image}`}
          alt={`${item.name} - ${item.variantLabel}`}
          className="absolute inset-0 w-full h-full object-contain object-center"
        />
      </a>

      {/* Middle: name + variant + qty controls */}
      <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
        <div>
          <a
            href={`${basePath}/wine/${item.slug}/`}
            className="font-display italic text-cream text-[clamp(14px,1.2vw,16px)] leading-tight hover:text-[#C8A96E] transition-colors"
          >
            {item.name}
          </a>
          <p className="font-body text-white/55 text-[10px] uppercase tracking-[0.22em] mt-1">
            {item.vintage} <span className="text-[#C8A96E]/60 mx-1">·</span>{" "}
            {item.variantLabel}
          </p>
        </div>

        {/* Qty spinner - same -/+ pattern as PurchaseWidget */}
        <div
          className="inline-flex items-center self-start gap-0 rounded-sm border border-white/15 bg-white/[0.02]"
          aria-label={`Quantity for ${item.name}`}
        >
          <button
            type="button"
            onClick={() => setQuantity(item.id, item.quantity - 1)}
            aria-label="Decrease quantity"
            className="w-7 h-7 md:w-8 md:h-8 inline-flex items-center justify-center text-white/65 hover:text-[#C8A96E] transition-colors"
          >
            <span aria-hidden className="text-base leading-none">
              -
            </span>
          </button>
          <span
            aria-live="polite"
            className="font-body text-cream text-xs px-2 min-w-[1.5ch] text-center tabular-nums"
          >
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity(item.id, item.quantity + 1)}
            aria-label="Increase quantity"
            className="w-7 h-7 md:w-8 md:h-8 inline-flex items-center justify-center text-white/65 hover:text-[#C8A96E] transition-colors"
          >
            <span aria-hidden className="text-base leading-none">
              +
            </span>
          </button>
        </div>
      </div>

      {/* Right: line subtotal + remove */}
      <div className="flex flex-col items-end justify-between text-right shrink-0">
        <p className="font-body text-cream text-[clamp(13px,1.1vw,15px)] font-light tabular-nums">
          {formatPence(lineSubtotal)}
        </p>
        <button
          type="button"
          onClick={() => remove(item.id)}
          aria-label={`Remove ${item.name} from cart`}
          className="font-body text-white/40 hover:text-[#C8A96E] uppercase tracking-[0.22em] text-[9px] transition-colors"
        >
          Remove
        </button>
      </div>
    </li>
  );
}
