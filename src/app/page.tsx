import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LiveCounter } from "@/components/live-counter"
import {
  ArrowRight,
  Shield,
  FileText,
  Scale,
  AlertTriangle,
  Gavel,
  Clock,
} from "lucide-react"

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-xs font-medium text-amber-800 mb-6">
              <AlertTriangle className="h-3.5 w-3.5" />
              EU AI Act enforces hiring AI as &quot;high-risk&quot; from 2 August 2026
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Your CV was rejected by AI.
              <br />
              <span className="text-blue-600">Now demand a human.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              GDPR Article 22 already gives you the right to a human review of
              any automated hiring decision. We help you use it — free — and
              publish which EU employers actually screen candidates fairly.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-base px-7 h-12">
                <Link href="/human-review">
                  <FileText className="mr-2 h-5 w-5" />
                  Generate my Art. 22 letter
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-7 h-12">
                <Link href="/submit">
                  Share my hiring experience
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="mb-8 text-sm">
              <Link href="/cv-check" className="text-blue-600 hover:underline font-medium">
                Or check if your next CV will look AI-written →
              </Link>
            </div>

            <LiveCounter />
          </div>
        </div>
      </section>

      {/* The paradox */}
      <section className="py-16 md:py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              The paradox nobody is talking about
            </h2>
            <p className="text-center text-slate-600 mb-12">
              Companies use AI to screen you — but flag your application if
              they suspect <em>you</em> used AI.
            </p>

            <div className="grid md:grid-cols-3 gap-5">
              <Card className="border-red-100">
                <CardContent className="pt-6">
                  <AlertTriangle className="h-8 w-8 text-red-500 mb-3" />
                  <h3 className="font-semibold mb-2">You polish your CV with AI</h3>
                  <p className="text-sm text-slate-600">
                    Translation, grammar, formatting. The same tools every
                    company uses internally.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-orange-100">
                <CardContent className="pt-6">
                  <Shield className="h-8 w-8 text-orange-500 mb-3" />
                  <h3 className="font-semibold mb-2">Their ATS flags it</h3>
                  <p className="text-sm text-slate-600">
                    An AI detector auto-rejects your application. No human ever
                    reads it. You get a templated email — or nothing.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-blue-100">
                <CardContent className="pt-6">
                  <Gavel className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold mb-2">The law is on your side</h3>
                  <p className="text-sm text-slate-600">
                    GDPR Art. 22(3) gives you a right to contest that decision
                    and demand human intervention. Most candidates don&apos;t
                    know this.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What you can do */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              What you can do — in 5 minutes
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 font-bold mb-4">
                  1
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  Generate a GDPR letter
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Plug in a few details and download a legally-grounded letter
                  demanding human review. EN + ET. Legally cites Art. 22 + 15.
                </p>
                <Link
                  href="/human-review"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 inline-flex items-center"
                >
                  Open generator <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 font-bold mb-4">
                  2
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  Report what happened
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Which company? Did you get a human response? How long?
                  Structured data only — no ranty reviews.
                </p>
                <Link
                  href="/submit"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 inline-flex items-center"
                >
                  Submit a report <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 font-bold mb-4">
                  3
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  Compare employers
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Browse the Human-First Score — real candidate data, open
                  methodology, no pay-to-rank.
                </p>
                <Link
                  href="/companies"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 inline-flex items-center"
                >
                  Browse companies <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why now */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why this matters right now
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4 p-5 rounded-xl border border-slate-200">
                <Clock className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">
                    2 August 2026 — EU AI Act high-risk rules kick in for hiring
                  </h3>
                  <p className="text-sm text-slate-600">
                    Any AI system used in recruitment becomes classified as
                    high-risk. Fines go up to €35M or 7% of global turnover.
                    Employers need to document everything. Candidates need a way
                    to hold them accountable.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-xl border border-slate-200">
                <Scale className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">
                    GDPR Art. 22 + 15 already apply — right now
                  </h3>
                  <p className="text-sm text-slate-600">
                    You don&apos;t need to wait for 2026. Any decision made
                    solely on automated processing, including profiling, that
                    produces legal or similarly significant effects can be
                    contested. Rejection from a job is significant. This site
                    gives you the letter.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-5 rounded-xl border border-slate-200">
                <Shield className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">
                    No pay-to-rank, no sponsored reviews
                  </h3>
                  <p className="text-sm text-slate-600">
                    The Human-First Score is computed from structured fields
                    only. Methodology is public. The dataset is open. Companies
                    can respond, not edit.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center mt-10">
              <Link
                href="/methodology"
                className="text-sm text-blue-600 hover:underline"
              >
                Read the methodology →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don&apos;t let a bot decide your career.
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Takes 60 seconds. Costs nothing. Ships a real legal letter to your
            inbox.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 text-base px-8 h-12"
          >
            <Link href="/human-review">
              Generate my letter now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
