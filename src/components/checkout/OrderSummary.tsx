"use client";

/**
 * OrderSummary - sticky right-rail panel used on /checkout.
 *
 * Same visual language as the cart-page summary block, slightly more
 * detail (per-line breakdown), and a small "What happens next" footer
 * to reassure during the form-filling stage.
 */

import Image from "next/image";
import { formatPence, type CartItem } from "@/lib/cart/types";
import { basePath } from "@/lib/basePath";

interface OrderSummaryProps {
  items: CartItem[];
  subtotalPence: number;
  shippingPence: number;
  shippingLabel: string;
  vatLabel: string;
  vatRateLabel: string;
  totalPence: number;
}

export function OrderSummary({
  items,
  subtotalPence,
  shippingPence,
  shippingLabel,
  vatLabel,
  vatRateLabel,
  totalPence,
}: OrderSummaryProps) {
  return (
    <div className="border border-white/[0.08] bg-[#0a0a0a] p-6 md:p-8 rounded-sm">
      <p
        className="font-display italic text-[#C8A96E] tracking-widest mb-3"
        style={{ fontSize: "clamp(11px, 1vw, 13px)" }}
      >
        [ Order Summary ]
      </p>
      <h2
        className="font-display italic text-cream leading-tight mb-6"
        style={{ fontSize: "clamp(22px, 2.2vw, 28px)" }}
      >
        Your Order
      </h2>

      {/* Line items - compact list */}
      <ul className="space-y-4 max-h-[40vh] overflow-y-auto pr-1">
        {items.map((item) => (
          <li key={item.id} className="flex gap-3">
            <div className="relative shrink-0 w-[52px] aspect-[3/4] rounded-sm overflow-hidden bg-white/[0.02]">
              <Image
                src={`${basePath}${item.image}`}
                alt={item.name}
                fill
                sizes="52px"
                className="object-contain p-1"
              />
              <span
                aria-hidden
                className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#C8A96E] text-[#010101] font-body text-[10px] font-medium leading-none tabular-nums"
              >
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="font-display italic text-cream leading-tight truncate"
                style={{ fontSize: "clamp(13px, 1.15vw, 15px)" }}
              >
                {item.name}
              </p>
              <p
                className="mt-0.5 font-body font-light text-white/45 uppercase tracking-[0.18em]"
                style={{ fontSize: "clamp(9px, 0.8vw, 10px)" }}
              >
                {item.vintage} · {item.variantLabel}
              </p>
              {item.note && (
                <p className="mt-1 font-body font-light text-white/40 leading-[1.5]" style={{ fontSize: "9.5px" }}>
                  {item.note}
                </p>
              )}
            </div>
            <p
              className="font-body font-light text-cream tabular-nums whitespace-nowrap"
              style={{ fontSize: "clamp(12px, 1.05vw, 14px)" }}
            >
              {formatPence(item.unitPricePence * item.quantity)}
            </p>
          </li>
        ))}
      </ul>

      {/* Totals breakdown */}
      <div className="mt-6 pt-6 border-t border-white/[0.06] space-y-2">
        <Row label="Subtotal" value={formatPence(subtotalPence)} />
        <Row
          label={`Shipping · ${shippingLabel.split("·")[0].trim()}`}
          value={shippingPence === 0 ? "FREE" : formatPence(shippingPence)}
        />
      </div>

      <div className="flex items-baseline justify-between pt-4 mt-4 border-t border-white/[0.06]">
        <span
          className="font-body font-light text-cream uppercase tracking-[0.22em]"
          style={{ fontSize: "clamp(11px, 1vw, 13px)" }}
        >
          Total
        </span>
        <div className="text-right">
          <p
            className="font-display italic text-cream tabular-nums leading-none"
            style={{ fontSize: "clamp(22px, 2.2vw, 28px)" }}
          >
            {formatPence(totalPence)}
          </p>
          <p
            className="mt-1 font-body font-light text-white/45 tabular-nums"
            style={{ fontSize: "clamp(10px, 0.9vw, 11px)" }}
          >
            (includes {vatLabel} {vatRateLabel} VAT)
          </p>
        </div>
      </div>

      {/* Reassurance footer */}
      <div className="mt-6 pt-6 border-t border-white/[0.06]">
        <p
          className="font-body font-light text-white/45 leading-relaxed"
          style={{ fontSize: "clamp(10px, 0.9vw, 11px)" }}
        >
          Need help? Contact our team on{" "}
          <a
            href="mailto:info@ridgeview.co.uk"
            className="text-[#C8A96E] hover:text-cream"
          >
            info@ridgeview.co.uk
          </a>{" "}
          or call{" "}
          <a
            href="tel:+441444242040"
            className="text-[#C8A96E] hover:text-cream"
          >
            01444 242040
          </a>
          .
        </p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <span
        className="font-body font-light text-white/65"
        style={{ fontSize: "clamp(11px, 1vw, 13px)" }}
      >
        {label}
      </span>
      <span
        className="font-body font-light text-cream tabular-nums"
        style={{ fontSize: "clamp(12px, 1.1vw, 14px)" }}
      >
        {value}
      </span>
    </div>
  );
}
