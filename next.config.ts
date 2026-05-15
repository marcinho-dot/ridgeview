import type { NextConfig } from "next";

// Vercel-native deployment.
// Previous config used `output: "export"` + basePath `/ridgeview` to support
// static export to a Hostinger subdirectory. After the 2026-05-11 migration
// to Marc's Vercel setup, we ship as a regular Next.js app at the domain
// root — Vercel's CDN handles image optimization and caching natively.
//
// `distDir` is split so a local `npm run build:check` never collides with a
// running `npm run dev`. Dev uses `.next/`, the pre-push verification build
// uses `.next-build/`. Vercel runs plain `npm run build` (no BUILD_CHECK
// env), so production deploys still land in `.next/` — unchanged from
// Vercel's perspective.
const nextConfig: NextConfig = {
  trailingSlash: true,
  distDir: process.env.BUILD_CHECK === "1" ? ".next-build" : ".next",
};

export default nextConfig;
