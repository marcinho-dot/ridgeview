import type { NextConfig } from "next";

// Vercel-native deployment.
// Previous config used `output: "export"` + basePath `/ridgeview` to support
// static export to a Hostinger subdirectory. After the 2026-05-11 migration
// to Marc's Vercel setup, we ship as a regular Next.js app at the domain
// root — Vercel's CDN handles image optimization and caching natively.
const nextConfig: NextConfig = {
  trailingSlash: true,
};

export default nextConfig;
