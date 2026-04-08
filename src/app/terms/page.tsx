import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of HireSignal.",
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
      <p className="text-sm text-slate-500 mb-8">
        Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. What HireSignal is</h2>
          <p>
            HireSignal (hirecheck.eu) is a free, non-commercial transparency
            project that lets candidates report hiring experiences and generate
            GDPR Article 22 human-review letters. The site is provided
            &quot;as is&quot; with no warranty of any kind.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Acceptable use</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Only submit reports about your own genuine hiring experiences.</li>
            <li>
              No personal attacks, no naming of individual employees, no
              defamatory statements, no confidential information you are not
              entitled to share.
            </li>
            <li>
              No automated scraping, spam, or abuse of the report form or API.
            </li>
            <li>
              Submissions may be edited or removed at our discretion if they
              violate these rules.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Content and licence</h2>
          <p>
            You retain ownership of the content you submit, but by submitting a
            report you grant HireSignal a perpetual, irrevocable, worldwide,
            royalty-free licence to publish, aggregate, and redistribute it in
            anonymised form as part of an open dataset.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. The Article 22 letter tool</h2>
          <p>
            The letter generator is an informational tool, not legal advice.
            The text is processed entirely in your browser — we do not store
            it. Using the letter is your responsibility. We recommend reviewing
            it before sending.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Company responses and claims</h2>
          <p>
            Companies named in reports may contact{" "}
            <a href="mailto:contact@hirecheck.eu" className="text-blue-600 hover:underline">
              contact@hirecheck.eu
            </a>{" "}
            to post a factual response or to correct inaccurate information.
            Response rights do not include the right to edit or remove
            legitimate candidate reports.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Liability</h2>
          <p>
            HireSignal is provided without warranty. We are not liable for any
            indirect, incidental, or consequential damages arising from use of
            the site, the dataset, or the letter tool.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">7. Governing law</h2>
          <p>
            These terms are governed by the laws of the Republic of Estonia,
            without prejudice to any mandatory consumer-protection rights you
            have under the law of your EU country of residence.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">8. Contact</h2>
          <p>
            Questions:{" "}
            <a href="mailto:contact@hirecheck.eu" className="text-blue-600 hover:underline">
              contact@hirecheck.eu
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
