import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "About",
  description: "Why HireCheck exists and who is behind it.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">Why HireCheck exists</h1>

      <div className="prose prose-slate max-w-none space-y-6 text-slate-700 text-lg">
        <p>
          I polished my CV with AI — translation, grammar, formatting. The
          same kind of help every company quietly uses internally. An ATS
          flagged it. No human ever read it. I got a templated email.
        </p>
        <p>
          I posted about it. Within a few days that post reached{" "}
          <strong>70,000+ people</strong> and I realised I was nowhere near
          alone. Thousands of candidates across the EU are being rejected by
          software that neither they nor the companies fully understand, and
          most of them don&apos;t know they have legal rights against it.
        </p>
        <p>
          <strong>They do.</strong> GDPR Article 22(3) gives every EU
          candidate the right to contest a decision made solely by automated
          processing and to demand human intervention. Article 15(1)(h) gives
          you the right to meaningful information about the logic involved.
          From <strong>2 August 2026</strong>, the EU AI Act classifies hiring
          AI as high-risk, and employers will have to document everything or
          face fines up to €35M or 7% of global turnover.
        </p>
        <p>
          HireCheck is the tool I wish I had had that week. It does two
          things:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Generates a legally-grounded{" "}
            <Link href="/human-review" className="text-blue-600 hover:underline">
              Article 22 human-review letter
            </Link>{" "}
            in 60 seconds, in English or Estonian, that you can send to any
            employer in the EU.
          </li>
          <li>
            Publishes a{" "}
            <Link href="/companies" className="text-blue-600 hover:underline">
              Human-First Score
            </Link>{" "}
            for EU employers, built from real candidate reports — not paid
            placements, not sentiment scraping, not a rant site.
          </li>
        </ul>
        <p>
          The{" "}
          <Link href="/methodology" className="text-blue-600 hover:underline">
            methodology
          </Link>{" "}
          is public, the dataset will be open, and there is no way to pay to
          improve a score. Companies can respond to reports, but they cannot
          edit or remove them.
        </p>
        <p>
          Built in Estonia, for the EU. Free. Forever.
        </p>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
          <Link href="/human-review">
            Generate my Art. 22 letter
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/submit">Share my hiring experience</Link>
        </Button>
      </div>
    </div>
  )
}
