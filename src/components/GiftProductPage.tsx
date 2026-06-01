"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { basePath } from "@/lib/basePath";
import { PurchaseWidget, type Variant } from "@/components/sku/PurchaseWidget";
import type { GiftProduct } from "@/data/giftProducts";

/**
 * Shared product page for FIXED gift products — the curated Duos/Trios
 * and accessories. One PurchaseWidget variant (the product itself), so
 * the format selector is hidden; the page is just hero + price + ATB +
 * what's-included. Data lives in src/data/giftProducts.ts; each route
 * under /gift-sets/<slug> is a thin wrapper that passes one product in.
 *
 * The configurable "The Ridgeview Gift Set" does NOT use this — it has
 * its own multi-variant wine picker.
 */
function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}s` }}>{children}</div>;
}

export function GiftProductPage({ product }: { product: GiftProduct }) {
  const variants: Variant[] = [
    { variantId: product.slug, label: product.name, detail: product.kind, price: product.price, image: product.image },
  ];

  return (
    <div className="bg-[#010101]">
      <Navbar />
      <main>
        <section className="relative bg-[#010101] pt-28 md:pt-24 pb-12 md:pb-16 overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(200,169,110,0.05) 0%, transparent 70%)" }}
          />

          <div className="relative max-w-[1500px] mx-auto px-6 md:px-12">
            {/* Breadcrumb */}
            <FadeUp>
              <p className="font-body text-white/35 text-[10px] uppercase tracking-[0.3em] mb-4 md:mb-6">
                <a href={`${basePath}/`} className="link-underline hover:text-[#C8A96E] transition-colors duration-500">Home</a>
                <span className="mx-3 text-white/20">/</span>
                <a href={`${basePath}/gift-sets`} className="link-underline hover:text-[#C8A96E] transition-colors duration-500">Gift Sets</a>
                <span className="mx-3 text-white/20">/</span>
                <span className="text-white/55">{product.name}</span>
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-[52fr_48fr] gap-8 md:gap-14 items-center">
              {/* ── Info column ── */}
              <div className="order-2 md:order-1">
                <FadeUp delay={0.05}>
                  <p className="font-display italic text-[#C8A96E] tracking-widest mb-2 md:mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
                    {product.kicker}
                  </p>
                </FadeUp>

                <div className="overflow-hidden pb-2 md:pb-4 mb-3 md:mb-5">
                  <motion.h1
                    className="font-display italic text-cream leading-[1.04]"
                    style={{ fontSize: "clamp(36px, 5.2vw, 72px)", fontWeight: 400 }}
                    initial={{ y: "102%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {product.name}
                  </motion.h1>
                </div>

                <FadeUp delay={0.3}>
                  <p className="font-display italic text-white/85 mb-4 md:mb-6" style={{ fontSize: "clamp(17px, 1.9vw, 24px)", fontWeight: 400, lineHeight: 1.35 }}>
                    {product.subtitle}
                  </p>
                </FadeUp>

                <FadeUp delay={0.38}>
                  <div className="mb-5 md:mb-6" style={{ height: "1px", maxWidth: "440px", background: "rgba(200,169,110,0.18)" }} />
                </FadeUp>

                <FadeUp delay={0.42}>
                  <p className="font-body text-white/70 mb-5 md:mb-7" style={{ fontSize: "clamp(14px, 1.4vw, 16px)", fontWeight: 400, lineHeight: 1.75, maxWidth: "500px" }}>
                    {product.description}
                  </p>
                </FadeUp>

                <FadeUp delay={0.48}>
                  <ul className="mb-7 md:mb-8 space-y-2.5" style={{ maxWidth: "480px" }}>
                    {product.included.map((item) => (
                      <li key={item} className="flex items-start gap-3 font-body text-white/65" style={{ fontSize: "clamp(13px, 1.15vw, 14.5px)", lineHeight: 1.6 }}>
                        <span aria-hidden className="text-[#C8A96E]/80 flex-shrink-0 mt-1.5" style={{ fontSize: "7px" }}>◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </FadeUp>

                <FadeUp delay={0.55}>
                  <div className="max-w-[480px]">
                    <PurchaseWidget
                      slug={product.slug}
                      productName={product.name}
                      vintage={product.kind}
                      image={product.image}
                      variants={variants}
                      freeShippingThreshold={45}
                      memberNote="20% off for members. Add your personalised gift note at checkout."
                      ctaId="gift-product-cta"
                    />
                  </div>
                </FadeUp>
              </div>

              {/* ── Image column ── */}
              <FadeUp delay={0.2} className="order-1 md:order-2">
                <div className="relative aspect-[4/5] md:aspect-square w-full rounded-md overflow-hidden bg-[#0d0d0d] border border-white/[0.06]">
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse 60% 60% at 50% 45%, rgba(200,169,110,0.07) 0%, transparent 70%)" }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${basePath}${product.image}`}
                    alt={`${product.name} — Ridgeview`}
                    className="absolute inset-0 w-full h-full object-contain p-6 md:p-10"
                  />
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="relative bg-[#0a0a0a] py-20 md:py-28 border-t border-white/[0.06]">
          <div className="max-w-[820px] mx-auto px-6 md:px-16 text-center">
            <FadeUp delay={0.05}>
              <p className="font-display italic text-[#C8A96E] tracking-widest mb-5" style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}>
                [ More ways to gift ]
              </p>
            </FadeUp>
            <FadeUp delay={0.15}>
              <h2 className="font-display italic text-cream leading-[1.08] mb-8" style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 400 }}>
                Explore the full <span className="text-[#C8A96E]">gift range</span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.25}>
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
                <a href={`${basePath}/gift-sets`} className="btn-cta">All gift sets</a>
                <a href={`${basePath}/gift-vouchers`} className="btn-cta">Gift vouchers</a>
              </div>
            </FadeUp>
          </div>
        </section>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
