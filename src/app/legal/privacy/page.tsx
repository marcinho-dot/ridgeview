import { LegalLayout } from "@/components/legal/LegalLayout";
import { COMPANY, formatAddress } from "@/lib/legal/company";

export const metadata = {
  title: "Privacy Policy · Ridgeview Wine Estate",
  description:
    "How Ridgeview Wine Estate (QBRidge Limited) collects and processes your personal data, in compliance with UK GDPR and the Data Protection Act 2018.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      kicker="Legal · Privacy"
      title="Privacy Policy"
      lastUpdated="2026-05-16"
    >
      <p>
        {COMPANY.legalName}, trading as {COMPANY.tradingName}, is the data
        controller for the personal information collected through this
        website and any subsequent customer service interactions. This
        Policy explains what we collect, why we collect it, the legal
        basis for each processing activity, how long we keep it, and the
        rights you have over your data.
      </p>

      <p>
        We process personal data in accordance with the United Kingdom
        General Data Protection Regulation (UK GDPR) and the Data
        Protection Act 2018.
      </p>

      <h2>1. Who we are</h2>
      <p>
        Data controller: <strong>{COMPANY.legalName}</strong> (company
        number {COMPANY.companyNumber}, {COMPANY.jurisdiction}).
      </p>
      <address>{formatAddress()}</address>
      <p>
        Contact for any privacy enquiry:{" "}
        <a href={`mailto:${COMPANY.contact.email}`}>{COMPANY.contact.email}</a>{" "}
        · {COMPANY.contact.phone}.
      </p>

      <h2>2. What we collect</h2>
      <p>
        Depending on how you use our website, we may collect the
        following categories of personal data:
      </p>
      <ul>
        <li>
          <strong>Identity data</strong> — first name, last name, date of
          birth (for age verification), and where applicable, title.
        </li>
        <li>
          <strong>Contact data</strong> — billing and delivery address,
          email address, telephone number.
        </li>
        <li>
          <strong>Transaction data</strong> — products purchased, order
          values, payment confirmation tokens. We do not store full card
          numbers; payment is handled by our PCI-compliant payment
          processor.
        </li>
        <li>
          <strong>Account data</strong> — if you create an account: user
          ID, hashed password, communication preferences.
        </li>
        <li>
          <strong>Marketing data</strong> — your preferences in receiving
          marketing from us; your interaction with our emails.
        </li>
        <li>
          <strong>Technical data</strong> — IP address, browser type and
          version, time-zone setting, device type, and pages visited.
        </li>
        <li>
          <strong>Sensitive data</strong> — only where you voluntarily
          disclose it (e.g. dietary requirements for an estate visit).
          We process this with explicit consent.
        </li>
      </ul>

      <h2>3. Why we process it (and our legal basis)</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <Row
            purpose="Process and fulfil your order"
            basis="Performance of a contract"
            data="Identity, Contact, Transaction"
          />
          <Row
            purpose="Verify your age (Challenge 25 / UK Licensing Act 2003)"
            basis="Compliance with a legal obligation"
            data="Identity"
          />
          <Row
            purpose="Send order confirmations, dispatch and delivery updates"
            basis="Performance of a contract"
            data="Identity, Contact, Transaction"
          />
          <Row
            purpose="Send marketing emails about our wines and estate events"
            basis="Consent (opt-in)"
            data="Identity, Contact, Marketing"
          />
          <Row
            purpose="Manage your account and login"
            basis="Performance of a contract"
            data="Identity, Account"
          />
          <Row
            purpose="Run and improve the website, prevent fraud"
            basis="Legitimate interests"
            data="Technical, Usage"
          />
          <Row
            purpose="Comply with HMRC and Companies House obligations (invoicing, accounting)"
            basis="Compliance with a legal obligation"
            data="Identity, Transaction"
          />
        </tbody>
      </table>

      <h2>4. Who we share it with</h2>
      <p>
        We never sell your personal data. We share it only with the
        following categories of third parties, and only to the extent
        needed:
      </p>
      <ul>
        <li>
          <strong>Payment processors</strong> — our card payment provider
          handles your transaction and does not return card details to
          us. (Provider will be named here once integration is confirmed
          by our board.)
        </li>
        <li>
          <strong>Delivery courier</strong> — name, address and phone
          number for the courier of choice.
        </li>
        <li>
          <strong>Email service provider</strong> — for order
          confirmations and (with consent) marketing.
        </li>
        <li>
          <strong>IT and hosting providers</strong> — Vercel Inc.,
          deployment platform; standard server logs for security and
          troubleshooting.
        </li>
        <li>
          <strong>Professional advisors</strong> — accountants and
          lawyers, under standard confidentiality terms.
        </li>
        <li>
          <strong>HMRC and other regulators</strong> — where required by
          law.
        </li>
      </ul>

      <h2>5. International transfers</h2>
      <p>
        Some of our service providers operate outside the United
        Kingdom. Where personal data is transferred outside the UK, we
        rely on the UK International Data Transfer Agreement, the UK
        Addendum to the EU Standard Contractual Clauses, or transfers
        to countries the UK Government has determined provide adequate
        protection. You can request a copy of the relevant safeguards
        by contacting us.
      </p>

      <h2>6. How long we keep it</h2>
      <ul>
        <li>
          <strong>Order records</strong> — kept for at least six years
          after the end of the tax year in which the order was placed,
          to meet HMRC accounting requirements.
        </li>
        <li>
          <strong>Account data</strong> — for as long as your account is
          active. You can delete your account at any time; we will
          retain only what we are legally required to keep.
        </li>
        <li>
          <strong>Marketing consents</strong> — until you withdraw
          consent (unsubscribe link in every email, or write to us).
        </li>
        <li>
          <strong>Technical logs</strong> — typically 30–90 days.
        </li>
      </ul>

      <h2>7. Your rights</h2>
      <p>
        Under the UK GDPR you have the following rights — free of charge
        in most cases:
      </p>
      <ul>
        <li>
          <strong>Access</strong> — a copy of the personal data we hold
          about you.
        </li>
        <li>
          <strong>Rectification</strong> — correction of inaccurate data.
        </li>
        <li>
          <strong>Erasure</strong> — deletion where it is no longer
          needed (subject to legal retention obligations).
        </li>
        <li>
          <strong>Restriction</strong> — limit how we process your data.
        </li>
        <li>
          <strong>Portability</strong> — receive your data in a
          machine-readable format.
        </li>
        <li>
          <strong>Objection</strong> — to processing based on legitimate
          interests, including direct marketing.
        </li>
        <li>
          <strong>Withdrawal of consent</strong> — at any time, where we
          rely on consent.
        </li>
      </ul>
      <p>
        To exercise any of these rights, email{" "}
        <a href={`mailto:${COMPANY.contact.email}`}>{COMPANY.contact.email}</a>
        . We aim to respond within one calendar month.
      </p>

      <h2>8. Right to complain</h2>
      <p>
        If you are unhappy with how we have handled your data, please
        contact us first so we can put things right. You also have the
        right to lodge a complaint with the Information Commissioner&rsquo;s
        Office (ICO) — the UK&rsquo;s data protection regulator — at{" "}
        <a
          href={COMPANY.external.icoUrl}
          target="_blank"
          rel="noreferrer"
        >
          ico.org.uk
        </a>
        .
      </p>

      <h2>9. Cookies</h2>
      <p>
        Our website uses cookies and similar technologies. Full details
        — including how to control them — are on our{" "}
        <a href="/legal/cookies">Cookie Policy</a>.
      </p>

      <h2>10. Changes to this policy</h2>
      <p>
        We may update this Policy from time to time. The &ldquo;Last updated&rdquo;
        date at the top will reflect the most recent revision. Where a
        change materially affects how we use your data, we will tell you
        directly (e.g. by email or a prominent notice on the site).
      </p>

      <div className="legal-callout">
        <p className="legal-meta">
          <strong>Note for review.</strong> Our ICO data-controller
          registration number and the named payment processor / email
          provider will be added here once finalised by our board.
        </p>
      </div>
    </LegalLayout>
  );
}

function Row({
  purpose,
  basis,
  data,
}: {
  purpose: string;
  basis: string;
  data: string;
}) {
  return (
    <tr>
      <td
        style={{
          padding: "0.65rem 1rem 0.65rem 0",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          verticalAlign: "top",
          width: "45%",
        }}
      >
        {purpose}
      </td>
      <td
        style={{
          padding: "0.65rem 1rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          verticalAlign: "top",
          color: "#c8a96e",
          width: "25%",
        }}
      >
        {basis}
      </td>
      <td
        style={{
          padding: "0.65rem 0",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          verticalAlign: "top",
          fontSize: "0.9em",
          color: "rgba(255,255,255,0.55)",
        }}
      >
        {data}
      </td>
    </tr>
  );
}
