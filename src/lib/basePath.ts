// Empty string after the 2026-05-11 migration from Hostinger (which served
// the site under `/ridgeview/`) to Marc's Vercel setup (root domain).
// Kept as an exported constant rather than removed so all existing
// `${basePath}/images/...` refs (109 in 24 files) keep working without a
// flat find/replace — they simply evaluate to `/images/...` now.
export const basePath = "";
