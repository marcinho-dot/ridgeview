import { LegalLayout } from "@/components/legal/LegalLayout";
import { COMPANY, formatAddressLines } from "@/lib/legal/company";

export const metadata = {
  title: "Company Information · Ridgeview Wine Estate",
  description:
    "Legal entity, registered office, company number, VAT registration and regulatory information for Ridgeview Wine Estate (QBRidge Limited).",
};

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
        <li>
          <strong>VAT registration:</strong>{" "}
          {COMPANY.vatNumber ?? (
            <span className="legal-meta">
              Pending board confirmation — will be added here on
              receipt.
            </span>
          )}
        </li>
        <li>
          <strong>AWRS number (Alcohol Wholesaler Registration Scheme):</strong>{" "}
          {COMPANY.awrsNumber ?? (
            <span className="legal-meta">
              Pending board confirmation — will be added here on
              receipt.
            </span>
          )}
        </li>
        <li>
          <strong>ICO data-controller registration:</strong>{" "}
          {COMPANY.icoNumber ?? (
            <span className="legal-meta">
              Pending board confirmation — will be added here on
              receipt.
            </span>
          )}
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

      <h2>Director(s)</h2>
      <p>
        Current directors of {COMPANY.legalName} are available to the
        public via Companies House at{" "}
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

      <h2>Authority &amp; supervision</h2>
      <p>
        As a UK seller of alcoholic products, {COMPANY.tradingName} is
        subject to the Licensing Act 2003 and operates under the
        relevant premises licences for its winery and on-site Wine Bar &amp;
        Shop. We are also registered with HM Revenue and Customs (HMRC)
        for excise duty on alcoholic products.
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
