"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { basePath } from "@/lib/basePath";

/**
 * /wine-club/gift — gift the OurView membership (£580), mirroring the UK
 * gift-membership product. Collects the RECIPIENT's details (the buyer
 * gifts a year to someone else) exactly like the UK form: title, name,
 * email, birthday, delivery address.
 *
 * No payment backend yet, so submit opens a prefilled email to the team
 * (same enquiry pattern as the engraved-bottle / bespoke-set / notify-me
 * forms). The buyer's own address becomes the reply-to, so the team can
 * arrange payment + dispatch. Wiring this to real checkout is a launch
 * decision tracked in tasks/roadmap.md. UK also runs a product video
 * here — likewise noted in the roadmap.
 */

const GIFT_EMAIL = "info@ridgeview.co.uk";
const PRICE = "£580";

const inputClass =
  "w-full bg-white/[0.04] border border-white/15 rounded-sm px-4 py-3 font-body text-cream " +
  "placeholder:text-white/30 focus:outline-none focus:border-[#C8A96E] transition-colors duration-300";
const labelClass =
  "block font-body text-white/45 uppercase tracking-[0.2em] mb-2";

export default function WineClubGiftPage() {
  const [sent, setSent] = useState(false);
  const [f, setF] = useState({
    title: "",
    first: "",
    last: "",
    email: "",
    birthday: "",
    address1: "",
    address2: "",
    city: "",
    county: "",
    postcode: "",
    message: "",
  });

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((s) => ({ ...s, [k]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = "OurView Wine Club — Gift Membership request";
    const body =
      `Hello Ridgeview team,\n\n` +
      `I'd like to gift a year of OurView Wine Club membership (${PRICE}).\n\n` +
      `RECIPIENT'S DETAILS\n` +
      `Title: ${f.title}\n` +
      `Name: ${f.first} ${f.last}\n` +
      `Email: ${f.email}\n` +
      `Birthday: ${f.birthday}\n` +
      `Address: ${f.address1}${f.address2 ? ", " + f.address2 : ""}\n` +
      `City/Town: ${f.city}\n` +
      `County: ${f.county}\n` +
      `Postcode: ${f.postcode}\n\n` +
      (f.message ? `Gift message:\n${f.message}\n\n` : "") +
      `Please reply to this email to arrange payment and the welcome case delivery.\n\nThank you.\n`;
    window.location.href = `mailto:${GIFT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="bg-[#010101] min-h-screen">
      <Navbar />
      <main>
        <section className="relative bg-[#010101] pt-28 md:pt-32 pb-20 md:pb-28 overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(200,169,110,0.06) 0%, transparent 70%)" }}
          />
          <div className="relative max-w-[1100px] mx-auto px-6 md:px-16">
            {/* Breadcrumb */}
            <p className="font-body text-white/35 text-[10px] uppercase tracking-[0.3em] mb-6">
              <a href={`${basePath}/`} className="link-underline hover:text-[#C8A96E] transition-colors duration-500">Home</a>
              <span className="mx-3 text-white/20">/</span>
              <a href={`${basePath}/wine-club`} className="link-underline hover:text-[#C8A96E] transition-colors duration-500">Wine Club</a>
              <span className="mx-3 text-white/20">/</span>
              <span className="text-white/55">Gift Membership</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-[42fr_58fr] gap-10 md:gap-16 items-start">
              {/* ── Left: pitch ── */}
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="font-display italic text-[#C8A96E] tracking-widest mb-4"
                  style={{ fontSize: "clamp(13px, 1.3vw, 16px)" }}
                >
                  [ OurView · Gift Membership ]
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display italic text-cream leading-[1.05] mb-5"
                  style={{ fontSize: "clamp(34px, 4.6vw, 60px)", fontWeight: 400 }}
                >
                  Gift a year of <span className="text-[#C8A96E]">OurView</span>.
                </motion.h1>
                <p className="font-body text-white/70 leading-[1.8] mb-6" style={{ fontSize: "clamp(14px, 1.4vw, 16px)", maxWidth: "460px" }}>
                  An exquisite gift for those who seek the unique and exceptional —
                  a full year of OurView membership: the luxury Welcome Case, two
                  curated seasonal cases, member pricing, archive wines and
                  priority invitations. We&rsquo;ll reach out to your recipient at
                  the end of the year to see if they&rsquo;d like to continue.
                </p>
                <p className="font-display italic text-cream mb-2" style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 400 }}>
                  {PRICE}
                </p>
                <p className="font-body text-white/45" style={{ fontSize: "12.5px" }}>
                  One-off payment · includes the Welcome Case (worth £134)
                </p>
                {/* NOTE: UK runs a product video here — see tasks/roadmap.md
                    (Video-TODO). Add the embed once the asset is in. */}
              </div>

              {/* ── Right: recipient form ── */}
              <div className="bg-[#0a0a0a] border border-white/[0.08] rounded-md p-6 md:p-9">
                {sent ? (
                  <div className="text-center py-10">
                    <p className="font-display italic text-[#C8A96E] mb-3" style={{ fontSize: "clamp(22px, 2.2vw, 30px)" }}>
                      Thank you.
                    </p>
                    <p className="font-body text-white/65 leading-[1.7]" style={{ fontSize: "14px", maxWidth: "360px", margin: "0 auto" }}>
                      Your gift request is on its way to our team. We&rsquo;ll reply
                      shortly to arrange payment and the Welcome Case delivery.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <p className="font-body text-cream uppercase tracking-[0.22em] mb-1" style={{ fontSize: "12px" }}>
                      Recipient&rsquo;s details
                    </p>

                    <div className="grid grid-cols-[80px_1fr] gap-3">
                      <div>
                        <label className={labelClass} style={{ fontSize: "9.5px" }} htmlFor="g-title">Title</label>
                        <select id="g-title" value={f.title} onChange={set("title")} className={inputClass}>
                          <option value="">—</option>
                          <option>Mr</option><option>Mrs</option><option>Ms</option><option>Mx</option><option>Dr</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass} style={{ fontSize: "9.5px" }} htmlFor="g-first">First name</label>
                        <input id="g-first" required value={f.first} onChange={set("first")} className={inputClass} autoComplete="given-name" />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass} style={{ fontSize: "9.5px" }} htmlFor="g-last">Last name</label>
                      <input id="g-last" required value={f.last} onChange={set("last")} className={inputClass} autoComplete="family-name" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass} style={{ fontSize: "9.5px" }} htmlFor="g-email">Email</label>
                        <input id="g-email" type="email" required value={f.email} onChange={set("email")} className={inputClass} autoComplete="email" />
                      </div>
                      <div>
                        <label className={labelClass} style={{ fontSize: "9.5px" }} htmlFor="g-bday">Birthday</label>
                        <input id="g-bday" type="date" value={f.birthday} onChange={set("birthday")} className={`${inputClass} [color-scheme:dark]`} />
                      </div>
                    </div>
                    <p className="font-body text-white/35" style={{ fontSize: "11px", marginTop: "-8px" }}>
                      We check they&rsquo;re over 18 — and we believe birthdays are for celebrating.
                    </p>

                    <div>
                      <label className={labelClass} style={{ fontSize: "9.5px" }} htmlFor="g-addr1">Address line 1</label>
                      <input id="g-addr1" value={f.address1} onChange={set("address1")} className={inputClass} autoComplete="address-line1" />
                    </div>
                    <div>
                      <label className={labelClass} style={{ fontSize: "9.5px" }} htmlFor="g-addr2">Address line 2</label>
                      <input id="g-addr2" value={f.address2} onChange={set("address2")} className={inputClass} autoComplete="address-line2" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass} style={{ fontSize: "9.5px" }} htmlFor="g-city">City / Town</label>
                        <input id="g-city" value={f.city} onChange={set("city")} className={inputClass} autoComplete="address-level2" />
                      </div>
                      <div>
                        <label className={labelClass} style={{ fontSize: "9.5px" }} htmlFor="g-county">County</label>
                        <input id="g-county" value={f.county} onChange={set("county")} className={inputClass} autoComplete="address-level1" />
                      </div>
                    </div>
                    <div className="sm:max-w-[200px]">
                      <label className={labelClass} style={{ fontSize: "9.5px" }} htmlFor="g-post">Postcode</label>
                      <input id="g-post" value={f.postcode} onChange={set("postcode")} className={inputClass} autoComplete="postal-code" />
                    </div>

                    <div>
                      <label className={labelClass} style={{ fontSize: "9.5px" }} htmlFor="g-msg">Gift message (optional)</label>
                      <textarea id="g-msg" rows={3} value={f.message} onChange={set("message")} className={inputClass} />
                    </div>

                    <button type="submit" className="btn-cta w-full md:w-auto text-center">
                      Send gift request
                    </button>
                    <p className="font-body text-white/35" style={{ fontSize: "11px" }}>
                      We&rsquo;ll reply to arrange payment and delivery — no charge is taken now.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
