import { LegalLayout } from "@/components/legal/LegalLayout";
import { COMPANY, formatAddress } from "@/lib/legal/company";

export const metadata = {
  title: "Returns & Cancellation · Ridgeview Wine Estate",
  description:
    "Your right to cancel an order, return faulty goods, and the model cancellation form — Ridgeview Wine Estate (QBRidge Limited).",
};

export default function ReturnsPage() {
  return (
    <LegalLayout
      kicker="Legal · Returns"
      title="Returns &amp; Cancellation"
      lastUpdated="2026-05-16"
    >
      <p>
        We want every bottle of Ridgeview to bring joy. If something is
        not right, the page below explains what to do and what you are
        entitled to under UK consumer law.
      </p>

      <h2>1. Your right to cancel (14-day cooling-off)</h2>
      <p>
        Under the Consumer Contracts (Information, Cancellation and
        Additional Charges) Regulations 2013, you have the right to
        cancel your order — for any reason — within{" "}
        <strong>14 calendar days</strong> of the day you (or someone you
        nominate) receive the goods.
      </p>
      <p>
        To cancel, simply tell us in writing — by email, by post, or by
        using the{" "}
        <a href="#cancellation-form">model cancellation form</a> below.
        You do not have to give a reason.
      </p>

      <div className="legal-callout">
        <p>
          <strong>Important — sealed wine.</strong> Once a bottle has
          been opened it is no longer in a re-saleable condition, and the
          right to cancel does not apply to that bottle. Sealed,
          unopened bottles can be returned without issue.
        </p>
      </div>

      <h3>How to return the wine</h3>
      <ol>
        <li>
          Notify us within the 14-day window — see the form below.
        </li>
        <li>
          Send the bottles back, in the original packaging where
          possible, to our address (see below). Please use a tracked
          courier service so we can verify receipt.
        </li>
        <li>
          We refund the full purchase price (plus the original standard
          delivery cost) to your original payment method within 14 days
          of either receiving the goods back or receiving evidence that
          you have sent them — whichever is sooner.
        </li>
      </ol>
      <p>
        Return shipping costs are your responsibility unless the goods
        are damaged, faulty or not as described.
      </p>

      <h2>2. Damaged or faulty goods</h2>
      <p>
        Under the Consumer Rights Act 2015, you are entitled to goods of
        satisfactory quality, fit for purpose and as described. If a
        bottle arrives broken, leaking or otherwise faulty, please:
      </p>
      <ol>
        <li>
          Email{" "}
          <a href={`mailto:${COMPANY.contact.email}`}>
            {COMPANY.contact.email}
          </a>{" "}
          within <strong>7 days</strong> of delivery, with a photograph
          of the damaged item(s) and your order reference.
        </li>
        <li>
          We will arrange replacement bottles — at our cost — or, where
          you prefer, a full refund.
        </li>
        <li>
          You do not need to return a broken bottle; we accept the
          photograph as evidence.
        </li>
      </ol>

      <h2>3. Refund timing</h2>
      <p>
        Refunds are issued to your original payment method. Bank
        processing times vary, but most cards show the credit within
        3–5 working days of issue. We always aim to action refunds
        within 14 days of receiving the returned goods (or, in the case
        of damaged goods, within 14 days of accepting your claim).
      </p>

      <h2>4. Exceptions</h2>
      <ul>
        <li>
          <strong>Bottles opened or otherwise out of saleable
          condition</strong> — the right to cancel does not apply.
        </li>
        <li>
          <strong>Personalised or engraved products</strong> — these are
          made to order and cannot be returned under the 14-day rule
          unless they arrive damaged or are not as described.
        </li>
        <li>
          <strong>Estate visits, wine tastings and gift vouchers</strong>{" "}
          — bookings are covered by separate terms communicated at the
          time of booking.
        </li>
      </ul>

      <h2>5. How to contact us</h2>
      <address>
        Ridgeview Wine Estate (Returns)
        <br />
        {COMPANY.legalName}
        <br />
        {formatAddress()}
      </address>
      <p>
        Email{" "}
        <a href={`mailto:${COMPANY.contact.email}`}>
          {COMPANY.contact.email}
        </a>
        {" · "}
        Phone {COMPANY.contact.phone}
      </p>

      <h2 id="cancellation-form">6. Model cancellation form</h2>
      <p>
        You may use the form below to exercise your right to cancel.
        Completing it is optional; an email or letter saying you wish to
        cancel is equally valid.
      </p>

      <div className="legal-callout">
        <p>
          <strong>To:</strong> {COMPANY.legalName} ({COMPANY.tradingName}
          ), {formatAddress()}; {COMPANY.contact.email}.
        </p>
        <p>
          <strong>I/We&#42;</strong> hereby give notice that I/we&#42;
          cancel my/our&#42; contract of sale of the following goods:
        </p>
        <p>
          ............................................................
        </p>
        <p>
          <strong>Ordered on / received on&#42;:</strong>{" "}
          ____________________
        </p>
        <p>
          <strong>Name of consumer(s):</strong> ____________________
        </p>
        <p>
          <strong>Address of consumer(s):</strong> ____________________
        </p>
        <p>
          <strong>Signature of consumer(s)</strong> (only if this form
          is notified on paper): ____________________
        </p>
        <p>
          <strong>Date:</strong> ____________________
        </p>
        <p className="legal-meta">&#42; Delete as appropriate.</p>
      </div>

      <h2>7. Statutory rights</h2>
      <p>
        Nothing in this policy affects your statutory rights as a
        consumer in the United Kingdom. For independent advice you can
        contact Citizens Advice on 0808 223 1133 (England) or visit{" "}
        <a
          href="https://www.citizensadvice.org.uk"
          target="_blank"
          rel="noreferrer"
        >
          citizensadvice.org.uk
        </a>
        .
      </p>
    </LegalLayout>
  );
}
