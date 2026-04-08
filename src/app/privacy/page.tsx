import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How HireCheck handles personal data under GDPR.",
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-slate-500 mb-8">
        Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Who we are</h2>
          <p>
            HireCheck (hirecheck.eu) is an independent transparency project
            operating in the European Union. The controller for personal data
            processed through this site can be contacted at{" "}
            <a href="mailto:privacy@hirecheck.eu" className="text-blue-600 hover:underline">
              privacy@hirecheck.eu
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. What we collect</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Reports:</strong> the company name, job title, country,
              outcome category, response-time category, and any optional free-text
              comment you choose to submit. Reports are published in anonymised form.
            </li>
            <li>
              <strong>Technical data:</strong> IP address (used only for
              rate-limiting and spam prevention, never published, retained up to
              30 days), HTTP user agent, timestamps.
            </li>
            <li>
              <strong>Article 22 letter tool:</strong> the details you type are
              processed entirely in your browser. We do not store them.
            </li>
            <li>
              <strong>Account data (future):</strong> when company claim
              functionality goes live, verified owners will provide an email
              address and a proof-of-domain-control artifact.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Legal bases (Art. 6 GDPR)</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Legitimate interest</strong> (Art. 6(1)(f)) for publishing
              anonymised hiring reports in the public interest of labour-market
              transparency and consumer-protection-style accountability.
            </li>
            <li>
              <strong>Consent</strong> (Art. 6(1)(a)) when you voluntarily submit
              a report.
            </li>
            <li>
              <strong>Contractual necessity</strong> (Art. 6(1)(b)) for any future
              paid company account functionality.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Your rights</h2>
          <p>
            Under the GDPR you have the right to access, rectify, erase, restrict,
            port, and object to processing of your personal data, and to withdraw
            consent at any time. You may also lodge a complaint with your national
            supervisory authority (in Estonia: Andmekaitse Inspektsioon,{" "}
            <a href="https://www.aki.ee" className="text-blue-600 hover:underline">
              aki.ee
            </a>
            ).
          </p>
          <p>
            Because reports are anonymised on publication, we cannot always
            connect a published entry back to a specific individual. If you can
            identify the report (e.g. by company, date, and outcome), contact us
            and we will honour valid erasure requests within one month.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Retention</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>IP addresses used for rate-limiting: up to 30 days.</li>
            <li>Reports: indefinitely, unless an erasure request is honoured.</li>
            <li>Server logs: up to 90 days.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Sharing</h2>
          <p>
            We do not sell personal data. Aggregated, anonymised datasets may be
            released under an open-data licence. Processors we use include our
            VPS hosting provider (EU-based) and, optionally, Supabase (EU region)
            as a database backend.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">7. Cookies</h2>
          <p>
            HireCheck uses only technically necessary cookies/local-storage
            items required for the site to function. We do not use advertising or
            third-party tracking cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">8. Changes</h2>
          <p>
            We may update this policy; material changes will be announced on the
            site.
          </p>
        </section>
      </div>
    </div>
  )
}
