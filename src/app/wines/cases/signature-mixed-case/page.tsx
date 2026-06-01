"use client";

import { GiftProductPage } from "@/components/GiftProductPage";
import { MIXED_CASES } from "@/data/giftProducts";

export default function Page() {
  return (
    <GiftProductPage
      product={MIXED_CASES["signature-mixed-case"]}
      category={{ label: "Cases of Wine", href: "/wines/cases" }}
      related={{
        heading: (
          <>
            Explore more <span className="text-[#C8A96E]">cases</span>
          </>
        ),
        links: [
          { label: "All cases", href: "/wines/cases" },
          { label: "Shop all wines", href: "/wines" },
        ],
      }}
    />
  );
}
