import { LegalLayout } from "@/components/legal/LegalLayout";
import { COMPANY } from "@/lib/legal/company";

export const metadata = {
  title: "Delivery · Ridgeview Wine Estate",
  description:
    "How and where we deliver Ridgeview English sparkling wine — UK mainland, next-working-day, free over £45.",
};

export default function DeliveryPage() {
  return (
    <LegalLayout
      kicker="Legal · Delivery"
      title="Delivery"
      lastUpdated="2026-05-16"
    >
      <p>
        Every Ridgeview order is hand-picked from our cellar in Ditchling
        Common and dispatched by courier with the care our sparkling wines
        deserve. Here is what to expect.
      </p>

      <h2>Where we deliver</h2>
      <ul>
        <li>
          <strong>UK mainland</strong> — next working day for orders
          placed before 12:00 (noon) on a working day.
        </li>
        <li>
          <strong>Scotland and Northern Ireland</strong> — please allow
          one additional working day on top of the standard mainland
          service.
        </li>
        <li>
          <strong>Channel Islands, Isle of Man, BFPO</strong> — please
          contact our team for a quote and lead-time:{" "}
          <a href={`mailto:${COMPANY.contact.email}`}>
            {COMPANY.contact.email}
          </a>
          .
        </li>
        <li>
          <strong>International</strong> — we are not currently set up
          for direct international shipping. If you would like to ship
          to an address outside the United Kingdom, please email us so
          we can assist.
        </li>
      </ul>

      <h2>Cost</h2>
      <ul>
        <li>
          <strong>Standard delivery</strong> — £5.50 per order.
        </li>
        <li>
          <strong>Free delivery</strong> — on every order over £45.
        </li>
        <li>
          <strong>Click &amp; Collect</strong> — free; collect from our
          Wine Bar &amp; Shop at the estate during opening hours.
        </li>
        <li>
          <strong>Nominated-day delivery</strong> — price on application;
          add a note at checkout and we will confirm the cost.
        </li>
      </ul>

      <h2>Cut-off time</h2>
      <p>
        Orders placed <strong>before 12:00 (noon)</strong> on a working
        day qualify for next-working-day delivery on the UK mainland.
        Orders placed after noon, at weekends or on UK bank holidays are
        dispatched on the next working day.
      </p>

      <h2>Age verification on delivery</h2>
      <p>
        Wine is an age-restricted product. Our courier may ask the
        recipient for photographic ID and will not release the package
        if a verified adult (18 or over) is not present at the address.
        Where age cannot be verified, the parcel will be returned to us
        and a re-delivery charge may apply.
      </p>

      <h2>Maximum order size</h2>
      <p>
        Standard online checkout supports orders of up to{" "}
        <strong>36 bottles</strong>. For larger orders (events, weddings,
        corporate gifting), please contact our team on{" "}
        {COMPANY.contact.phone} or{" "}
        <a href={`mailto:${COMPANY.contact.email}`}>
          {COMPANY.contact.email}
        </a>{" "}
        and we will arrange directly.
      </p>

      <h2>Tracking</h2>
      <p>
        Once your order leaves the cellar you will receive a tracking
        link by email. If anything looks off — late delivery, damage in
        transit, or a courier issue — please contact us within 7 days of
        the dispatch email and we will put it right.
      </p>

      <h2>If something goes wrong</h2>
      <p>
        We take great care in packing each order. In the rare case a
        bottle arrives broken or faulty, please email{" "}
        <a href={`mailto:${COMPANY.contact.email}`}>
          {COMPANY.contact.email}
        </a>{" "}
        with a photograph within 7 days. We will arrange a replacement
        or refund at no cost to you, in line with the Consumer Rights
        Act 2015. The full process is on our{" "}
        <a href="/legal/returns">Returns &amp; Cancellation page</a>.
      </p>
    </LegalLayout>
  );
}
