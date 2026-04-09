"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { QUESTIONS, scoreAnswers, type AnswerValue, type ReadinessResult } from "@/lib/ai-act-check"

type Stage = "intro" | "quiz" | "email" | "result"

const GROUP_LABELS: Record<string, string> = {
  ai_usage: "A. AI usage",
  data: "B. Data",
  decisions: "C. Decisions",
  docs: "D. Documentation",
  risk: "E. Annex III",
}

const RISK_COLORS: Record<ReadinessResult["risk"], string> = {
  low: "bg-green-50 border-green-300 text-green-900",
  medium: "bg-yellow-50 border-yellow-300 text-yellow-900",
  high: "bg-orange-50 border-orange-300 text-orange-900",
  high_annex_iii: "bg-red-50 border-red-400 text-red-900",
}

const RISK_LABELS: Record<ReadinessResult["risk"], string> = {
  low: "Low risk",
  medium: "Medium risk",
  high: "High risk",
  high_annex_iii: "HIGH RISK — Annex III",
}


export default function AiActReadyPage() {
  const [stage, setStage] = useState<Stage>("intro")
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({})
  const [step, setStep] = useState(0)
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [website, setWebsite] = useState("") // honeypot

  const result = useMemo(() => {
    if (Object.keys(answers).length < QUESTIONS.length) return null
    return scoreAnswers(answers)
  }, [answers])

  const current = QUESTIONS[step]
  const progress = Math.round((step / QUESTIONS.length) * 100)

  function answer(value: AnswerValue) {
    const next = { ...answers, [current.id]: value }
    setAnswers(next)
    if (step + 1 >= QUESTIONS.length) {
      setStage("email")
    } else {
      setStep(step + 1)
    }
  }

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const r = result || scoreAnswers(answers)
      const res = await fetch("/api/ai-act-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "ai-act-ready",
          score: r.score,
          risk: r.risk,
          annex_iii: r.annex_iii_flags.length,
          website,
        }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || "Could not save your email. Try again.")
      }
      setStage("result")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setSubmitting(false)
    }
  }

  if (stage === "intro") {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-red-600">
          EU AI Act · High-risk rules apply 2 August 2026
        </p>
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
          Is your SaaS ready for the EU AI Act?
        </h1>
        <p className="mb-6 text-lg text-gray-700">
          Free 3-minute questionnaire. 15 yes/no questions. Get a personalised
          risk score, a list of every gap you have, and what to fix first — no
          email required to see your score.
        </p>
        <p className="mb-8 text-sm text-gray-600">
          Built by <Link href="/about" className="underline">HireCheck</Link> for
          EU SaaS founders. Rule-based scoring against the AI Act final text and
          GDPR. Not legal advice — but it&apos;s the same checklist your DPO would walk
          you through.
        </p>
        <button
          onClick={() => setStage("quiz")}
          className="rounded-lg bg-black px-6 py-3 text-base font-semibold text-white hover:bg-gray-800"
        >
          Start the check →
        </button>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { n: "15", label: "Questions" },
            { n: "3 min", label: "To complete" },
            { n: "8", label: "Templates if you need them" },
          ].map((x) => (
            <div key={x.label} className="rounded-lg border border-gray-200 p-4">
              <div className="text-2xl font-bold">{x.n}</div>
              <div className="text-sm text-gray-600">{x.label}</div>
            </div>
          ))}
        </div>
      </main>
    )
  }

  if (stage === "quiz") {
    return (
      <main className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
            <span>{GROUP_LABELS[current.group]}</span>
            <span>
              {step + 1} / {QUESTIONS.length}
            </span>
          </div>
          <div className="h-1 w-full rounded bg-gray-200">
            <div
              className="h-1 rounded bg-black transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <h2 className="mb-3 text-2xl font-semibold leading-snug">{current.text}</h2>
        {current.help && (
          <p className="mb-6 text-sm text-gray-600">{current.help}</p>
        )}
        <div className="flex gap-3">
          {(["yes", "no", "unsure"] as AnswerValue[]).map((v) => (
            <button
              key={v}
              onClick={() => answer(v)}
              className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium capitalize hover:border-black hover:bg-gray-50"
            >
              {v === "unsure" ? "Not sure" : v}
            </button>
          ))}
        </div>
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="mt-6 text-sm text-gray-500 underline"
          >
            ← Back
          </button>
        )}
      </main>
    )
  }

  if (stage === "email") {
    const r = scoreAnswers(answers)
    return (
      <main className="mx-auto max-w-xl px-4 py-16">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
          Your score is ready
        </p>
        <h2 className="mb-2 text-3xl font-bold">{r.score} / 100</h2>
        <p className="mb-6 text-gray-700">
          {r.gaps.length} gap{r.gaps.length === 1 ? "" : "s"} found
          {r.annex_iii_flags.length > 0 && ` · ${r.annex_iii_flags.length} Annex III flag${r.annex_iii_flags.length === 1 ? "" : "s"}`}
          .
        </p>
        <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
          Drop your email to see the full report — every gap, the AI Act articles
          they map to, and what to fix first. No spam, no newsletter, no upsell on
          this page.
        </div>
        <form onSubmit={submitEmail} className="space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="founder@yourstartup.eu"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base"
          />
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            style={{ position: "absolute", left: "-9999px" }}
            aria-hidden
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {submitting ? "Saving…" : "Show me the gaps →"}
          </button>
        </form>
        <p className="mt-4 text-xs text-gray-500">
          We store your email to send you one update if the AI Act requirements
          change. That&apos;s it.
        </p>
      </main>
    )
  }

  // result
  const r = result || scoreAnswers(answers)
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className={`mb-8 rounded-xl border-2 p-6 ${RISK_COLORS[r.risk]}`}>
        <div className="mb-2 text-xs font-bold uppercase tracking-widest">
          {RISK_LABELS[r.risk]}
        </div>
        <div className="mb-3 flex items-baseline gap-3">
          <div className="text-5xl font-bold">{r.score}</div>
          <div className="text-lg opacity-75">/ 100</div>
        </div>
        <p className="text-sm leading-relaxed">{r.summary}</p>
      </div>

      {r.annex_iii_flags.length > 0 && (
        <div className="mb-8 rounded-lg border border-red-300 bg-red-50 p-4">
          <h3 className="mb-2 font-semibold text-red-900">
            Annex III high-risk classifications
          </h3>
          <ul className="list-inside list-disc text-sm text-red-800">
            {r.annex_iii_flags.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      )}

      <h3 className="mb-4 text-xl font-semibold">Gaps to close</h3>
      {r.gaps.length === 0 ? (
        <p className="mb-8 text-gray-600">No gaps detected. Re-check after any product change.</p>
      ) : (
        <div className="mb-8 space-y-4">
          {r.gaps.map((g) => (
            <div key={g.id} className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="mb-1 flex items-center justify-between">
                <h4 className="font-semibold">{g.title}</h4>
                <span
                  className={`text-xs font-bold uppercase ${
                    g.severity === "high"
                      ? "text-red-600"
                      : g.severity === "medium"
                      ? "text-orange-600"
                      : "text-yellow-600"
                  }`}
                >
                  {g.severity}
                </span>
              </div>
              <p className="mb-2 text-sm text-gray-700">{g.description}</p>
              <p className="text-sm">
                <span className="font-semibold">Fix: </span>
                {g.fix}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Next steps */}
      <div className="mb-12 rounded-xl border-2 border-blue-600 bg-blue-50 p-6">
        <h3 className="mb-3 text-2xl font-bold">What to do next</h3>
        <div className="space-y-3 text-gray-700">
          {r.gaps.length > 0 && (
            <p>
              You have <strong>{r.gaps.length} gap{r.gaps.length === 1 ? "" : "s"}</strong> to
              close before 2 August 2026. Use the checklist above as your starting point —
              each gap maps to a specific AI Act article.
            </p>
          )}
          <p>
            Want to stay audit-ready automatically?{" "}
            <Link
              href="/for-employers#waitlist"
              className="font-semibold text-blue-600 underline"
            >
              Get early access to HireCheck Compliance
            </Link>{" "}
            — we&apos;re building a dashboard that generates every document, logs
            every AI decision, and keeps you compliant.
          </p>
          <p className="text-sm text-gray-500">
            Eesti keeles:{" "}
            <Link href="/et/tooandjatele#waitlist" className="underline">
              tooandjatele
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="text-sm text-gray-500">
        <p className="mb-2">
          <strong>Deadline countdown:</strong> {r.deadline_days} days until 2
          August 2026.
        </p>
        <p>
          This is a rule-based starter check, not legal advice. For high-risk
          systems consult a qualified DPO.
        </p>
      </div>
    </main>
  )
}
