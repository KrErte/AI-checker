"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  Bot,
  UserX,
  Scale,
  MessageSquareQuote,
  Send,
  ShieldAlert,
  FileText,
} from "lucide-react"

type Status = "idle" | "submitting" | "ok" | "error"

export default function DoubleStandardsPage() {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)

  const [email, setEmail] = useState("")
  const [usedAi, setUsedAi] = useState("")
  const [wasRejected, setWasRejected] = useState("")
  const [companyUsedAi, setCompanyUsedAi] = useState("")
  const [gotFeedback, setGotFeedback] = useState("")
  const [fairness, setFairness] = useState("")
  const [comment, setComment] = useState("")
  const [website, setWebsite] = useState("") // honeypot

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("submitting")
    setError(null)
    try {
      const res = await fetch("/api/ai-act-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "double-standards-candidate",
          locale: "en",
          website,
          survey: { usedAi, wasRejected, companyUsedAi, gotFeedback, fairness, comment },
        }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || "Could not save your response. Try again.")
      }
      setStatus("ok")
    } catch (err) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Something went wrong.")
    }
  }

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-b from-orange-50 via-red-50 to-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-xs font-semibold text-orange-800 mb-5">
              <Scale className="h-3.5 w-3.5" />
              88,000+ views · 742 reactions · a nerve was hit
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.05]">
              They use AI to filter you out.
              <br />
              <span className="text-red-600">But you can&apos;t use AI to get in.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Companies screen your CV with AI, reject you with AI, and write their job ads with AI.
              But if you use AI to present yourself clearly? Disqualified.
              It&apos;s time to make this visible.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#share"
                className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-3 text-base font-semibold text-white hover:bg-red-700 shadow-sm"
              >
                Share your experience
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <Link
                href="/submit"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-800 hover:bg-slate-50"
              >
                Report a company
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The double standard — visual */}
      <section className="py-16 md:py-20 border-b border-slate-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-600 mb-2 text-center">
            The double standard
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
            Same technology. Different rules.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border-2 border-green-200 bg-green-50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-200 text-green-800">
                  <Bot className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-green-900 text-lg">What companies do</h3>
              </div>
              <ul className="space-y-3 text-green-800">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span>Screen your CV with AI — <strong>totally fine</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span>Send automated rejection emails — <strong>totally fine</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span>Write job descriptions with ChatGPT — <strong>totally fine</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span>Rank you with algorithms — <strong>totally fine</strong></span>
                </li>
              </ul>
            </div>
            <div className="rounded-xl border-2 border-red-200 bg-red-50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-200 text-red-800">
                  <UserX className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-red-900 text-lg">What happens to you</h3>
              </div>
              <ul className="space-y-3 text-red-800">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-0.5 flex-shrink-0">✕</span>
                  <span>Use AI to translate your CV — <strong>disqualified</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-0.5 flex-shrink-0">✕</span>
                  <span>Use AI to format your cover letter — <strong>disqualified</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-0.5 flex-shrink-0">✕</span>
                  <span>Ask why you were rejected — <strong>ghosted</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-0.5 flex-shrink-0">✕</span>
                  <span>Ask if AI was used on you — <strong>silence</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* LinkedIn quote */}
      <section className="py-16 md:py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-start gap-4 mb-8">
            <MessageSquareQuote className="h-10 w-10 text-orange-400 flex-shrink-0 mt-1" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-4">
                From a viral LinkedIn post · 87K views
              </p>
              <blockquote className="text-xl md:text-2xl font-medium leading-relaxed text-slate-100 mb-6">
                &ldquo;A company used AI to filter out a candidate who used AI.
                Let that sink in for a moment.&rdquo;
              </blockquote>
              <blockquote className="text-lg text-slate-300 leading-relaxed mb-6">
                &ldquo;As a developer, AI is my tool. I use it every day — for coding, debugging, documentation.
                It doesn&apos;t make me a worse developer. It makes me a more effective one.&rdquo;
              </blockquote>
              <blockquote className="text-lg text-orange-300 font-semibold leading-relaxed">
                &ldquo;If your hiring process disqualifies candidates for using AI tools, you&apos;re not looking
                for the best builders. You&apos;re looking for the best form fillers.&rdquo;
              </blockquote>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-10">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">88K</div>
              <div className="text-sm text-slate-400">impressions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">742</div>
              <div className="text-sm text-slate-400">reactions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">27</div>
              <div className="text-sm text-slate-400">reposts</div>
            </div>
          </div>
        </div>
      </section>

      {/* Your rights */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2 text-center">
            You have rights
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
            The law is on your side. Use it.
          </h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Under GDPR and the upcoming EU AI Act, companies must be transparent about how they use AI on you.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldAlert,
                title: "GDPR Article 22",
                body: "You have the right not to be subject to a decision based solely on automated processing. You can demand human review.",
              },
              {
                icon: FileText,
                title: "EU AI Act (Aug 2026)",
                body: "Companies using AI in hiring must disclose it, document every decision, and give you the right to an explanation.",
              },
              {
                icon: Send,
                title: "Report it",
                body: "When companies break these rules, reporting it creates a public record. More reports = more accountability.",
              },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700 mb-4">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-600">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Survey / share form */}
      <section id="share" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-red-600 mb-2">
              Your experience matters
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Has this happened to you?
            </h2>
            <p className="text-slate-600">
              Help us build the first public dataset on AI double standards in hiring.
              Your answers are anonymous — we only ask for email if you want updates.
            </p>
          </div>

          {status === "ok" ? (
            <div className="rounded-xl border-2 border-green-500 bg-green-50 p-8 text-center">
              <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-green-900 mb-2">
                Thank you for sharing.
              </h3>
              <p className="text-sm text-green-800 mb-4">
                Every response makes the problem more visible. Together we can push for transparency.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/submit"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Report a specific company
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/human-review"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Generate a GDPR letter
                </Link>
              </div>
            </div>
          ) : (
            <form
              onSubmit={submit}
              className="rounded-xl border border-slate-200 bg-slate-50 p-6 md:p-8 space-y-5"
            >
              {/* Section 1: Your experience */}
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">
                  Your experience
                </h3>
                <div className="space-y-4">
                  <RadioGroup
                    label="Have you ever used AI to help with a job application (CV, cover letter, translation)?"
                    value={usedAi}
                    onChange={setUsedAi}
                    options={[
                      { v: "yes-regularly", l: "Yes, regularly" },
                      { v: "yes-once", l: "Yes, once or twice" },
                      { v: "no-but-would", l: "No, but I would" },
                      { v: "no", l: "No, and I wouldn't" },
                    ]}
                  />
                  <RadioGroup
                    label="Have you ever been rejected or penalized for using AI in an application?"
                    value={wasRejected}
                    onChange={setWasRejected}
                    options={[
                      { v: "yes-explicitly", l: "Yes — they told me directly" },
                      { v: "yes-suspected", l: "I suspect so, but wasn't told" },
                      { v: "no", l: "No, never" },
                      { v: "not-sure", l: "I don't know — I never got feedback" },
                    ]}
                  />
                </div>
              </div>

              <hr className="border-slate-200" />

              {/* Section 2: The company */}
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">
                  The company&apos;s side
                </h3>
                <div className="space-y-4">
                  <RadioGroup
                    label="Did the company that rejected you use AI in their own hiring process?"
                    value={companyUsedAi}
                    onChange={setCompanyUsedAi}
                    options={[
                      { v: "yes-obvious", l: "Yes — automated screening, chatbot, etc." },
                      { v: "probably", l: "Probably — instant rejection, no human contact" },
                      { v: "no", l: "No — fully human process" },
                      { v: "no-idea", l: "No idea — they never disclosed it" },
                    ]}
                  />
                  <RadioGroup
                    label="Did you receive any meaningful feedback on your application?"
                    value={gotFeedback}
                    onChange={setGotFeedback}
                    options={[
                      { v: "yes-personal", l: "Yes — personal, useful feedback" },
                      { v: "generic", l: "Generic template rejection" },
                      { v: "nothing", l: "Nothing at all — ghosted" },
                    ]}
                  />
                </div>
              </div>

              <hr className="border-slate-200" />

              {/* Section 3: Fairness */}
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">
                  Fairness
                </h3>
                <RadioGroup
                  label="Overall, do you think AI in hiring is applied fairly to candidates?"
                  value={fairness}
                  onChange={setFairness}
                  options={[
                    { v: "yes", l: "Yes — it's fine as it is" },
                    { v: "mostly", l: "Mostly, but needs more transparency" },
                    { v: "no", l: "No — it's a double standard" },
                    { v: "broken", l: "The whole system is broken" },
                  ]}
                />
              </div>

              <hr className="border-slate-200" />

              {/* Open comment */}
              <div>
                <label className="block">
                  <span className="text-xs font-semibold text-slate-700 mb-1 block">
                    Want to share your story? (optional)
                  </span>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                    placeholder="What happened? Which company? How did it feel?"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </label>
              </div>

              <hr className="border-slate-200" />

              {/* Email (optional) */}
              <div>
                <label className="block">
                  <span className="text-xs font-semibold text-slate-700 mb-1 block">
                    Email (optional — only if you want updates on results)
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </label>
              </div>

              {/* honeypot */}
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
                disabled={status === "submitting"}
                className="w-full rounded-lg bg-red-600 px-6 py-3 text-base font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {status === "submitting" ? "Submitting…" : "Submit your experience →"}
              </button>

              <p className="text-xs text-slate-500 text-center">
                Anonymous by default. Email is optional and only used for result updates.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* What you can do next */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h3 className="font-bold text-slate-900 mb-4">What you can do right now</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/submit"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Report a company
            </Link>
            <Link
              href="/human-review"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Generate a GDPR Article 22 letter
            </Link>
            <Link
              href="/my-rights"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Know your rights
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

/* ── form helpers ── */

function RadioGroup({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { v: string; l: string }[]
}) {
  const name = label.slice(0, 20).replace(/\s/g, "-")
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-slate-800 mb-2">
        {label}
      </legend>
      <div className="space-y-2">
        {options.map((o) => (
          <label
            key={o.v}
            className={`flex items-center gap-3 rounded-lg border px-4 py-2.5 cursor-pointer transition-colors ${
              value === o.v
                ? "border-blue-500 bg-blue-50"
                : "border-slate-200 bg-white hover:bg-slate-50"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={o.v}
              checked={value === o.v}
              onChange={() => onChange(o.v)}
              className="accent-blue-600"
            />
            <span className="text-sm text-slate-700">{o.l}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
