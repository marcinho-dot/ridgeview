import { LegalLayout } from "@/components/legal/LegalLayout";
import { COMPANY, formatAddress } from "@/lib/legal/company";

export const metadata = {
  title: "Terms & Conditions · Ridgeview Wine Estate",
  description:
    "Terms governing your use of this website and orders placed with Ridgeview Wine Estate (QBRidge Limited), Sussex.",
};

export default function TermsPage() {
  return (
    <LegalLayout
      kicker="Legal · Terms"
      title="Terms & Conditions"
      lastUpdated="2026-05-16"
    >
      <p>
        These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your use of
        this website and any order you place with us. By placing an order,
        you confirm that you are at least 18 years of age and accept these
        Terms in full.
      </p>

      <h2>1. Who we are</h2>
      <p>
        This website is operated by <strong>{COMPANY.legalName}</strong>,
        trading as <strong>{COMPANY.tradingName}</strong>. We are a
        company registered in {COMPANY.jurisdiction} under company number{" "}
        <strong>{COMPANY.companyNumber}</strong>. Our registered office
        and trading address is:
      </p>
      <address>{formatAddress()}</address>
      <p>
        You can reach our customer team by email at{" "}
        <a href={`mailto:${COMPANY.contact.email}`}>{COMPANY.contact.email}</a>{" "}
        or by phone on {COMPANY.contact.phone}.
      </p>

      <h2>2. Age restriction</h2>
      <p>
        Wine is an age-restricted product. We do not sell alcohol to
        anyone under the age of 18 and we operate a{" "}
        <strong>Challenge 25</strong> policy in line with the UK Licensing
        Act 2003. Our courier may require photographic ID from the
        recipient on delivery. Where age cannot be verified, the order
        will be returned and any associated re-delivery costs will be your
        responsibility.
      </p>

      <h2>3. Placing an order</h2>
      <p>
        When you place an order through the website, you make an offer to
        buy the products in your basket at the prices and conditions shown
        at checkout. Your order is accepted only when we send you an order
        confirmation by email. Until that point, we may decline an order
        for any reason — for example, where stock is unavailable, where
        we cannot verify your age, or where the delivery address falls
        outside our serviceable area.
      </p>

      <h2>4. Prices, VAT and payment</h2>
      <p>
        All prices on our website are shown in pounds sterling (GBP) and
        include UK Value Added Tax at the prevailing rate (currently
        20 %). Any duty and excise applicable to alcoholic products is
        already incorporated into the displayed price. Delivery charges
        are shown separately at checkout before you commit to the order.
      </p>
      <p>
        Payment is taken at the point of order. We accept the major debit
        and credit cards listed at checkout. We will only process a
        payment for the value stated on your final order summary.
      </p>

      <h2>5. Delivery</h2>
      <p>
        We deliver to UK mainland addresses by next-working-day courier
        when orders are received before 12:00 (noon) on a working day.
        Delivery to Scotland and Northern Ireland may take one additional
        working day. Standard delivery costs £5.50 — orders over £45
        ship free. The maximum size of a single order is 36 bottles; for
        larger orders, please contact our team directly.
      </p>
      <p>
        We do not currently deliver outside the United Kingdom. For
        international enquiries, please email{" "}
        <a href={`mailto:${COMPANY.contact.email}`}>{COMPANY.contact.email}</a>
        . Full delivery information is available on our{" "}
        <a href="/legal/delivery">Delivery page</a>.
      </p>

      <h2>6. Right to cancel</h2>
      <p>
        Under the Consumer Contracts (Information, Cancellation and
        Additional Charges) Regulations 2013, you have the right to cancel
        an order for any reason within 14 days of receiving your goods,
        provided the bottles have not been opened. The cancellation
        process and a model cancellation form are detailed on our{" "}
        <a href="/legal/returns">Returns &amp; Cancellation page</a>.
      </p>

      <h2>7. Damaged or faulty goods</h2>
      <p>
        We take great care in packing your order. Should an item arrive
        damaged or faulty, please contact{" "}
        <a href={`mailto:${COMPANY.contact.email}`}>{COMPANY.contact.email}</a>{" "}
        within 7 days of delivery with a description and a photograph of
        the damage. We will arrange a replacement or refund at no cost to
        you in accordance with the Consumer Rights Act 2015.
      </p>

      <h2>8. Intellectual property</h2>
      <p>
        All content on this website — including text, photographs, the
        Ridgeview marque, wine labels and design — is the property of{" "}
        {COMPANY.legalName} or its licensors and is protected by UK and
        international copyright and trade-mark law. You may not reproduce
        or republish any part of the site for commercial purposes without
        our written permission.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        Nothing in these Terms limits our liability for death or personal
        injury caused by our negligence, for fraudulent misrepresentation,
        or for any matter for which it would be unlawful to limit
        liability. Subject to that, our total liability to you for any
        claim arising out of an order placed via this website is limited
        to the value of that order.
      </p>

      <h2>10. Privacy</h2>
      <p>
        We process the personal data you provide in accordance with the
        UK General Data Protection Regulation, the Data Protection Act
        2018 and our{" "}
        <a href="/legal/privacy">Privacy Policy</a>.
      </p>

      <h2>11. Governing law</h2>
      <p>
        These Terms are governed by the laws of England and Wales. Any
        dispute arising out of or in connection with these Terms shall be
        subject to the exclusive jurisdiction of the courts of England
        and Wales. If you are a consumer resident in another part of the
        United Kingdom, you have the benefit of any mandatory provisions
        of the law in your part of the UK.
      </p>

      <h2>12. Drink responsibly</h2>
      <p>
        We support the responsible enjoyment of wine. For information and
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

      <h2>13. Contact</h2>
      <p>
        Questions about these Terms? Write to us at{" "}
        <a href={`mailto:${COMPANY.contact.email}`}>{COMPANY.contact.email}</a>{" "}
        or by post to {COMPANY.legalName}, {formatAddress()}.
      </p>
    </LegalLayout>
  );
}
