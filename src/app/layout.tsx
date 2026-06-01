import type { Metadata } from "next";
import "./globals.css";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { RevealInit } from "@/components/RevealInit";
import { HashScroll } from "@/components/HashScroll";
import { CartProvider } from "@/lib/cart/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";

export const metadata: Metadata = {
  title: "Ridgeview Wine Estate - English Sparkling Wine",
  description:
    "Ridgeview Wine Estate crafts award-winning English sparkling wines from our home vineyard in Sussex. Celebrate life with estate-crafted, limited production sparkling wines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=cormorant-garamond:400i,600i,700i|raleway:300,400,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <CartProvider>
          <RevealInit />
          {/* Global hash-anchor scroller — native fragment scrolling is
              broken site-wide by `overflow-x: clip` on <html>, so every
              page needs this JS scroller. One instance here covers all
              routes (same-page #clicks via hashchange + full-load landings
              via mount). */}
          <HashScroll />
          <ScrollProgress />
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
