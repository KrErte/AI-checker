import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Methodology",
  description: "How the HireSignal Human-First Score is calculated.",
}

export default function MethodologyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">Methodology</h1>
      <p className="text-sm text-slate-500 mb-8">
        How the Human-First Score is calculated. Open, reproducible, no
        pay-to-rank.
      </p>

      <div className="prose prose-slate max-w-none space-y-8 text-slate-700">
        <section>
          <h2 className="text-xl font-semibold mb-2">Why a score at all?</h2>
          <p>
            Candidates want a simple signal: will this employer treat my
            application like a human being or like a row in a spreadsheet? The
            Human-First Score is a single 0–100 number derived from structured
            fields only — never from free-text reviews, sponsorships, or
            editorial opinion.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Inputs</h2>
          <p>
            Every report collects only four structured signals plus an
            optional anonymous comment:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Outcome</strong> — automated rejection, human response, no response, or interview.</li>
            <li><strong>Response time</strong> — within 24h, within a week, within a month, over a month, or never.</li>
            <li><strong>Rejection email received</strong> — yes / no.</li>
            <li><strong>Country</strong> — for cross-EU comparisons.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">The formula</h2>
          <p>
            For each report we assign an outcome weight and a response-time
            weight, then average per company:
          </p>
          <pre className="bg-slate-100 rounded-lg p-4 text-xs overflow-x-auto">{`outcome_weight:
  interview            = 100
  human_response       =  80
  automated_rejection  =  40
  no_response          =  10

response_weight:
  within_24h    = 100
  within_week   =  80
  within_month  =  50
  over_month    =  20
  never         =   0

report_score  = 0.7 * outcome_weight + 0.3 * response_weight
company_score = mean(report_score for company)`}</pre>
          <p>
            Companies with fewer than 3 reports are shown as{" "}
            <em>&quot;not enough data&quot;</em> and are excluded from rankings
            to prevent single-candidate bias.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">What we deliberately do NOT do</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>We do not accept money to improve, hide, or remove a score.</li>
            <li>We do not run sentiment analysis on free-text comments.</li>
            <li>We do not use the Human-First Score itself as a hiring signal — it is a compliance-and-trust signal, not a candidate-quality signal.</li>
            <li>We do not publish individual reporters. Everything is anonymised on publication.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Abuse resistance</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Per-IP rate limiting on submissions.</li>
            <li>Honeypot fields and server-side schema validation.</li>
            <li>Outlier reports (e.g. a single flood from one source) are weighted down.</li>
            <li>Companies can post a factual response to any report.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Open dataset</h2>
          <p>
            Aggregated, anonymised report data will be released under an
            open-data licence once the dataset is large enough to be useful
            without risking re-identification. Researchers and journalists are
            welcome to contact us for early access.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Changes</h2>
          <p>
            Changes to the formula will be announced publicly and historical
            scores will be re-computed so rankings remain comparable over time.
          </p>
        </section>
      </div>
    </div>
  )
}
