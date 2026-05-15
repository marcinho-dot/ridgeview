import type { Metadata } from "next";
import "./globals.css";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { RevealInit } from "@/components/RevealInit";

export const metadata: Metadata = {
  title: "Ridgeview Wine Estate — English Sparkling Wine",
  description:
    "Ridgeview Wine Estate crafts award-winning English sparkling wines from our home vineyard in Sussex. Celebrate life with estate-crafted, limited production wines.",
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
        <RevealInit />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
