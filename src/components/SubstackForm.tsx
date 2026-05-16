"use client";

/**
 * SubstackForm — reusable email-capture pill for Ridgeview's Substack.
 *
 * Bumped contrast 2026-05-17 (user feedback: form was too low-contrast
 * against dark backgrounds):
 *   border  white/20  → white/35  (visible at rest)
 *   bg              0 → white/[0.04]  (subtle frosted plate)
 *   input text  white/80 → white/95
 *   placeholder white/40 → white/55
 *   icons       white/50 → white/65 (Substack) / 0.70 (arrow)
 *   hover gold  /40 → /55          (warmer hover edge)
 *
 * Used on:
 *   - Homepage  ImageReveal "Stay close to the estate" block
 *   - /beyond-the-bottle  PageHero subtitle area
 */

function IconSubstack({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24l9.54-5.417L20.539 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  );
}

function IconArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 01.75-.75h10.638l-3.96-3.72a.75.75 0 011.04-1.06l5.25 4.93a.75.75 0 010 1.06l-5.25 4.93a.75.75 0 11-1.04-1.06l3.96-3.72H3.75A.75.75 0 013 10z"
        clipRule="evenodd"
      />
    </svg>
  );
}

interface Props {
  className?: string;
}

export function SubstackForm({ className = "" }: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const input = e.currentTarget.querySelector("input");
        const email = input?.value;
        if (email) {
          window.open(
            `https://substack.com/@ridgeview?email=${encodeURIComponent(email)}`,
            "_blank",
          );
        }
      }}
      className={`flex items-center gap-0 border border-white/35 bg-white/[0.04] rounded-full hover:border-[#C8A96E]/55 focus-within:border-[#C8A96E]/55 transition-colors duration-300 ${className}`}
    >
      <div className="flex items-center justify-center w-13 h-[50px] pl-1">
        <IconSubstack className="w-[16px] h-[16px] text-white/70" />
      </div>
      <input
        type="email"
        placeholder="Your email for our Substack newsletter"
        required
        className="flex-1 bg-transparent border-0 px-3 py-3.5 font-body text-white/95 text-[13px] tracking-wide placeholder:text-white/55 focus:outline-none"
        style={{ fontWeight: 300 }}
      />
      <button
        type="submit"
        className="flex items-center justify-center w-13 h-[50px] pr-1 hover:bg-[#C8A96E]/10 rounded-r-full transition-all duration-300 group/btn"
        aria-label="Subscribe on Substack"
      >
        <IconArrowRight className="w-4 h-4 text-white/65 group-hover/btn:text-[#C8A96E] transition-colors duration-300" />
      </button>
    </form>
  );
}
