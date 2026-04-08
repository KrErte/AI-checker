"use client"
import { useMemo, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { analyzeCv, type HighlightType } from "@/lib/cv-analyzer"
import { AlertTriangle, CheckCircle, FileText, Sparkles, ArrowRight, Shield } from "lucide-react"

const SAMPLE = `Passionate about leveraging cutting-edge technology to drive results. Results-driven software engineer with a proven track record of spearheading innovative solutions. Meticulously orchestrated the implementation of robust, scalable systems — delivering seamless user experiences across the entire ecosystem. Championed a paradigm shift in how our team approached optimization. Successfully streamlined workflows and significantly improved overall efficiency. Strategically leveraged emerging technologies to catalyze growth and empower cross-functional teams.`

const STRIPE = process.env.NEXT_PUBLIC_STRIPE_CV_CHECK || "mailto:hello@hirecheck.eu?subject=Human-Proof%20my%20CV"

const typeLabel: Record<HighlightType, string> = {
  cliche: "AI cliché",
  burstiness: "Uniform rhythm",
  adverb: "Adverb overload",
  hedge: "Hedge phrase",
  em_dash: "Em-dash tell",
}

const typeColor: Record<HighlightType, string> = {
  cliche: "bg-red-50 border-red-200 text-red-900",
  burstiness: "bg-orange-50 border-orange-200 text-orange-900",
  adverb: "bg-amber-50 border-amber-200 text-amber-900",
  hedge: "bg-yellow-50 border-yellow-200 text-yellow-900",
  em_dash: "bg-purple-50 border-purple-200 text-purple-900",
}

export default function CvCheckPage() {
  const [text, setText] = useState("")
  const analysis = useMemo(() => analyzeCv(text), [text])
  const hasInput = text.trim().length > 40

  const riskColor =
    analysis.risk === "low"
      ? "text-green-600"
      : analysis.risk === "medium"
        ? "text-amber-600"
        : "text-red-600"
  const riskBg =
    analysis.risk === "low"
      ? "bg-green-50 border-green-200"
      : analysis.risk === "medium"
        ? "bg-amber-50 border-amber-200"
        : "bg-red-50 border-red-200"

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 via-blue-50 to-white py-12 md:py-16 border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-medium text-blue-800 mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              Instant · Private · Runs in your browser
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4 leading-[1.1]">
              Is your CV going to{" "}
              <span className="text-red-600">look AI-written</span>?
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Paste your CV below. We scan it for the exact patterns that ATS
              AI-detectors flag — clichés, uniform sentence rhythm, em-dashes,
              hedge phrases. Full analysis is free. Your text never leaves your
              browser.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {/* Input */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base">Paste your CV</CardTitle>
                <button
                  onClick={() => setText(SAMPLE)}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Try a sample
                </button>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste the full text of your CV here…"
                  rows={18}
                  className="font-mono text-xs"
                />
                <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Your CV is analysed entirely in your browser. Nothing is sent
                  to our servers.
                </p>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-4">
              <Card className={riskBg}>
                <CardContent className="pt-6">
                  {!hasInput ? (
                    <div className="text-center py-8">
                      <FileText className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                      <p className="text-sm text-slate-500">
                        Paste your CV on the left to get your AI-risk score.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className={`text-5xl font-bold ${riskColor}`}>
                          {analysis.score}
                        </span>
                        <span className="text-slate-500">/ 100 AI-risk</span>
                      </div>
                      <div className={`text-sm font-semibold uppercase tracking-wide ${riskColor} mb-3`}>
                        {analysis.risk} risk
                      </div>
                      <p className="text-sm text-slate-700 mb-4">{analysis.summary}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                        <Stat label="Words" value={analysis.stats.words} />
                        <Stat label="Sentences" value={analysis.stats.sentences} />
                        <Stat label="Clichés" value={analysis.stats.cliche_count} />
                        <Stat label="Em-dashes" value={analysis.stats.em_dash_count} />
                        <Stat label="Avg sentence" value={`${analysis.stats.avg_sentence_length}w`} />
                        <Stat label="Rhythm variety" value={`${(analysis.stats.burstiness * 100).toFixed(0)}%`} />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {hasInput && analysis.highlights.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      {analysis.highlights.length} flagged pattern
                      {analysis.highlights.length === 1 ? "" : "s"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 max-h-[400px] overflow-y-auto">
                    {analysis.highlights.map((h, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-lg border text-xs ${typeColor[h.type]}`}
                      >
                        <div className="text-[10px] uppercase font-bold opacity-70 mb-1">
                          {typeLabel[h.type]}
                        </div>
                        <div className="font-mono text-[11px] mb-2 leading-snug">
                          &ldquo;{h.text.slice(0, 220)}
                          {h.text.length > 220 ? "…" : ""}&rdquo;
                        </div>
                        <div className="text-[11px] text-slate-700 mb-1">
                          <strong>Why:</strong> {h.reason}
                        </div>
                        <div className="text-[11px] text-slate-700">
                          <strong>Fix:</strong> {h.suggestion}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {hasInput && analysis.highlights.length === 0 && (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="pt-6 text-center">
                    <CheckCircle className="h-10 w-10 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-slate-700">
                      No obvious AI patterns detected. Your CV reads like a
                      human wrote it.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Paid upsell */}
          {hasInput && analysis.risk !== "low" && (
            <div className="max-w-3xl mx-auto mt-12">
              <Card className="border-blue-500 border-2 bg-gradient-to-br from-blue-50 to-white">
                <CardContent className="pt-8 pb-8">
                  <div className="flex items-start gap-4">
                    <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white flex-shrink-0">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs uppercase tracking-wide text-blue-600 font-bold mb-1">
                        Human-proof my CV · €9
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        We rewrite the flagged sentences. By a human. Within 24 hours.
                      </h3>
                      <p className="text-sm text-slate-600 mb-4">
                        Send your CV to our inbox. A human (not an LLM) rewrites
                        every flagged sentence with specific, concrete
                        alternatives tuned to your role. You receive back:
                      </p>
                      <ul className="text-sm text-slate-700 space-y-1.5 mb-5">
                        <li className="flex gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>3 rewritten versions of every flagged sentence</span>
                        </li>
                        <li className="flex gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>A full &ldquo;safe-to-send&rdquo; rewrite of your CV</span>
                        </li>
                        <li className="flex gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Written response time: 24 hours or your money back</span>
                        </li>
                        <li className="flex gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>No subscriptions, no upsells, no AI generation — just rewriting labour</span>
                        </li>
                      </ul>
                      <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                        <a href={STRIPE}>
                          Human-proof my CV · €9
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                      <p className="text-xs text-slate-500 mt-3">
                        Honest disclaimer: we cannot guarantee any specific ATS
                        or detector result. We can guarantee a human rewrite
                        that eliminates the patterns listed above.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Secondary CTA to letter */}
          {hasInput && (
            <div className="max-w-3xl mx-auto mt-8 text-center">
              <p className="text-sm text-slate-600">
                Already got rejected by an AI screener?{" "}
                <Link href="/human-review" className="text-blue-600 font-medium hover:underline">
                  Generate a free GDPR Article 22 letter →
                </Link>
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white/60 rounded-md px-2 py-1.5">
      <div className="text-[10px] text-slate-500 uppercase tracking-wide">{label}</div>
      <div className="font-semibold text-slate-900">{value}</div>
    </div>
  )
}
