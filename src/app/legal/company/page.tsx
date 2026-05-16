import { LegalLayout } from "@/components/legal/LegalLayout";
import { COMPANY, formatAddressLines } from "@/lib/legal/company";

export const metadata = {
  title: "Company Information · Ridgeview Wine Estate",
  description:
    "Registered entity, office address and statutory contact information for Ridgeview Wine Estate (QBRidge Limited), as required by the Companies Act 2006.",
};

/**
 * /legal/company — statutory company info.
 *
 * Scope deliberately mirrors the equivalent page on ridgeview.co.uk:
 * we display only what UK legislation requires on a public web page
 * under the Companies Act 2006 s.82 and the Companies (Trading
 * Disclosures) Regulations 2008 — namely the registered name,
 * registered number, country of incorporation and registered office.
 *
 * Other regulatory identifiers (VAT, AWRS, ICO data-controller
 * registration) appear on the documents that legally require them —
 * VAT invoices, B2B alcohol-trade paperwork, ICO subject-access
 * responses — but are NOT displayed on the public website. This is
 * standard practice across UK wine retailers (Berry Bros &amp; Rudd,
 * Majestic, Laithwaites, Nyetimber, etc.) and matches the public
 * footprint of ridgeview.co.uk itself.
 */
export default function CompanyPage() {
  return (
    <LegalLayout
      kicker="Legal · Company"
      title="Company Information"
      lastUpdated="2026-05-16"
    >
      <p>
        Statutory and contact information for the business behind{" "}
        <a href="https://www.ridgeview.co.uk">ridgeview.co.uk</a>, as
        required by the Companies Act 2006, the Electronic Commerce (EC
        Directive) Regulations 2002, and applicable consumer-protection
        legislation.
      </p>

      <h2>Registered entity</h2>
      <ul>
        <li>
          <strong>Legal name:</strong> {COMPANY.legalName}
        </li>
        <li>
          <strong>Trading name:</strong> {COMPANY.tradingName}
        </li>
        <li>
          <strong>Companies House number:</strong>{" "}
          {COMPANY.companyNumber}
        </li>
        <li>
          <strong>Jurisdiction of incorporation:</strong>{" "}
          {COMPANY.jurisdiction}
        </li>
      </ul>

      <h2>Registered office &amp; trading address</h2>
      <address>
        {formatAddressLines().map((line) => (
          <span key={line} style={{ display: "block" }}>
            {line}
          </span>
        ))}
      </address>

      <h2>Contact</h2>
      <ul>
        <li>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${COMPANY.contact.email}`}>
            {COMPANY.contact.email}
          </a>
        </li>
        <li>
          <strong>Phone:</strong> {COMPANY.contact.phone}
        </li>
      </ul>

      <h2>Public records &amp; directors</h2>
      <p>
        The current officers of {COMPANY.legalName} (including
        directors and registered secretary), together with our latest
        confirmation statement and statutory filings, are available
        free of charge from Companies House at{" "}
        <a
          href={`https://find-and-update.company-information.service.gov.uk/company/${COMPANY.companyNumber}`}
          target="_blank"
          rel="noreferrer"
        >
          find-and-update.company-information.service.gov.uk/company/
          {COMPANY.companyNumber}
        </a>
        .
      </p>

      <h2>Tax &amp; alcohol licensing</h2>
      <p>
        {COMPANY.tradingName} is registered with HM Revenue &amp;
        Customs for Value Added Tax. A valid VAT invoice is issued with
        every order — the relevant VAT registration number is shown on
        each invoice and on customer-service correspondence where
        required. As a UK seller of alcoholic products, we operate
        under the Licensing Act 2003 and hold the appropriate premises
        licence(s) covering production, on-site retail and online
        despatch. Trade buyers may request our AWRS (Alcohol Wholesaler
        Registration Scheme) details directly from{" "}
        <a href={`mailto:${COMPANY.contact.email}`}>
          {COMPANY.contact.email}
        </a>
        .
      </p>

      <h2>Data protection</h2>
      <p>
        {COMPANY.legalName} is the data controller for personal
        information processed via this website. We are registered with
        the UK Information Commissioner&rsquo;s Office under the Data
        Protection Act 2018; the ICO registration certificate is
        available on request. For further detail see our{" "}
        <a href="/legal/privacy">Privacy Policy</a>.
      </p>

      <h2>Alternative Dispute Resolution</h2>
      <p>
        In the unlikely event a dispute about your order cannot be
        resolved directly with us, you may refer the matter to a
        certified Alternative Dispute Resolution (ADR) provider for the
        wine trade — currently the{" "}
        <a
          href="https://www.wsta.co.uk"
          target="_blank"
          rel="noreferrer"
        >
          Wine and Spirit Trade Association
        </a>
        . As a consumer, you also have access to general consumer
        advice via Citizens Advice on 0808 223 1133 or{" "}
        <a
          href="https://www.citizensadvice.org.uk"
          target="_blank"
          rel="noreferrer"
        >
          citizensadvice.org.uk
        </a>
        .
      </p>

      <h2>Drink responsibly</h2>
      <p>
        We support the responsible enjoyment of wine. For independent
        advice on alcohol, please visit{" "}
        <a
          href={COMPANY.external.drinkawareUrl}
          target="_blank"
          rel="noreferrer"
        >
          drinkaware.co.uk
        </a>
        .
      </p>
    </LegalLayout>
  );
}
