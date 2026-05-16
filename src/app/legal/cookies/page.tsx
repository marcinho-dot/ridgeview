import { LegalLayout } from "@/components/legal/LegalLayout";
import { COMPANY } from "@/lib/legal/company";

export const metadata = {
  title: "Cookie Policy · Ridgeview Wine Estate",
  description:
    "How Ridgeview Wine Estate uses cookies and similar technologies on ridgeview.co.uk, in compliance with PECR and UK GDPR.",
};

export default function CookiesPage() {
  return (
    <LegalLayout
      kicker="Legal · Cookies"
      title="Cookie Policy"
      lastUpdated="2026-05-16"
    >
      <p>
        This Policy explains how {COMPANY.tradingName} (
        {COMPANY.legalName}) uses cookies and similar technologies on
        this website. It complements our{" "}
        <a href="/legal/privacy">Privacy Policy</a> and should be read
        together with it.
      </p>

      <h2>1. What is a cookie?</h2>
      <p>
        A cookie is a small text file that a website stores in your
        browser so the site can remember information about your visit —
        for example, which items are in your basket or whether you have
        accepted these cookies. Similar technologies include local
        storage, session storage, pixel tags and software development
        kits (SDKs); for the purposes of this Policy we refer to all of
        these collectively as &ldquo;cookies&rdquo;.
      </p>

      <h2>2. Categories of cookies we use</h2>

      <h3>Strictly necessary</h3>
      <p>
        These cookies are essential to operate the site. Without them,
        services like the shopping basket or the secure checkout cannot
        function. They are exempt from consent under the Privacy and
        Electronic Communications Regulations 2003 (PECR).
      </p>
      <ul>
        <li>
          <strong>Cart state</strong> — local storage key{" "}
          <code>ridgeview-cart-v1</code>; persists your basket between
          visits on the same device.
        </li>
        <li>
          <strong>Session flag</strong> — session storage key{" "}
          <code>rv-back-to-top-from-hero</code>; one-time-use flag (under
          10 seconds) so the booking page knows whether you arrived via
          the homepage Hero CTA.
        </li>
        <li>
          <strong>Order confirmation</strong> — session storage key{" "}
          <code>rv-last-order</code>; lets the confirmation page display
          your most recent order summary. Cleared when you close the
          browser.
        </li>
      </ul>

      <h3>Performance &amp; analytics</h3>
      <p>
        We currently do not run third-party analytics or performance
        cookies on this site. Should we introduce them in future
        (e.g. Vercel Analytics, Plausible, GA4), this section will be
        updated with the specific cookie names, the data each collects,
        and a way to opt out.
      </p>

      <h3>Functional</h3>
      <p>
        Cookies that remember preferences such as which navigation tab
        you opened last, or whether you have dismissed a notice. We do
        not currently use functional cookies beyond what is listed
        under &ldquo;Strictly necessary&rdquo;.
      </p>

      <h3>Marketing &amp; advertising</h3>
      <p>
        We do not currently place marketing or advertising cookies on
        this site. If this changes, we will display a consent banner
        before any non-essential cookies are set, and you will be able
        to accept or reject them at that point.
      </p>

      <h2>3. Managing cookies</h2>
      <p>
        Most modern browsers allow you to view, manage and delete
        cookies via their settings. Useful links:
      </p>
      <ul>
        <li>
          <a
            href="https://support.google.com/chrome/answer/95647"
            target="_blank"
            rel="noreferrer"
          >
            Google Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
            target="_blank"
            rel="noreferrer"
          >
            Mozilla Firefox
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac"
            target="_blank"
            rel="noreferrer"
          >
            Apple Safari
          </a>
        </li>
        <li>
          <a
            href="https://support.microsoft.com/en-gb/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
            target="_blank"
            rel="noreferrer"
          >
            Microsoft Edge
          </a>
        </li>
      </ul>
      <p>
        Please note that if you disable strictly necessary cookies, some
        parts of the site — including the shopping basket and checkout —
        may no longer work.
      </p>

      <h2>4. Updates to this Policy</h2>
      <p>
        We may update this Cookie Policy from time to time, for example
        when we add new tools to the site. The &ldquo;Last updated&rdquo; date at
        the top will always reflect the current revision.
      </p>

      <h2>5. Contact</h2>
      <p>
        For any cookie-related question, please email{" "}
        <a href={`mailto:${COMPANY.contact.email}`}>{COMPANY.contact.email}</a>
        .
      </p>
    </LegalLayout>
  );
}
