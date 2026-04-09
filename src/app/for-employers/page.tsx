"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Shield,
  FileText,
  ClipboardCheck,
  AlertTriangle,
  Users,
  Lock,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react"

type Status = "idle" | "submitting" | "ok" | "error"

export default function ForEmployersPage() {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)

  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")
  const [employees, setEmployees] = useState("")
  const [ats, setAts] = useState("")
  const [country, setCountry] = useState("")
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
          source: "compliance-waitlist",
          company,
          role,
          employees,
          ats,
          country,
          locale: "en",
          website,
        }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || "Could not save your request. Try again.")
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
      <section className="bg-gradient-to-b from-slate-50 via-blue-50 to-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-1.5 text-xs font-semibold text-red-800 mb-5">
              <AlertTriangle className="h-3.5 w-3.5" />
              EU AI Act · High-risk rules enforced 2 August 2026
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.05]">
              EU AI Act compliance for{" "}
              <span className="text-blue-600">recruitment</span>.
              <br />
              Audit-ready in a week.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              If you use AI to screen, rank or filter candidates, you are a
              high-risk deployer under Annex III. HireCheck Compliance generates
              every document you need, logs every AI decision, and keeps you
              audit-ready — without a legal team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#waitlist"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-700 shadow-sm"
              >
                Get early access
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <Link
                href="/ai-act-ready"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-800 hover:bg-slate-50"
              >
                Run the free 3-min check
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 md:py-20 border-b border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-600 mb-2">
            The problem
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            By August 2026, if you use AI in hiring, you must prove it.
          </h2>
          <div className="space-y-4 text-lg text-slate-700 leading-relaxed">
            <p>
              The EU AI Act classifies any AI system used to{" "}
              <strong>recruit, screen, evaluate or promote</strong> workers as{" "}
              <strong>high-risk</strong> under Annex III, point 4. That includes
              every CV-screening tool, every ChatGPT shortlist, every ranking
              feature inside Workday, Teamtailor, SmartRecruiters, Recruitee,
              Greenhouse — and every HR team quietly pasting applications into
              an LLM.
            </p>
            <p>
              As the <em>deployer</em> (Article 26), you are legally responsible
              for human oversight, documentation, candidate disclosure,
              incident logging, employee representative notification and a{" "}
              <strong>Fundamental Rights Impact Assessment</strong> (Article 27).
              Registration in the EU database is required before use.
            </p>
            <p className="text-red-700 font-semibold">
              Fines reach €35M or 7% of global turnover. The deadline is not
              optional and not moving.
            </p>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2 text-center">
            The solution
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
            Everything Article 26 requires. In one dashboard.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-slate-200 bg-white p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700 flex-shrink-0">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-1">
                      {f.article}
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1">
                      {f.title}
                    </h3>
                    <p className="text-sm text-slate-600">{f.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Timeline */}
      <section className="py-16 md:py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-2">
            Timeline
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Countdown to enforcement
          </h2>
          <div className="space-y-5">
            {TIMELINE.map((t) => (
              <div key={t.date} className="flex gap-4 items-start">
                <Clock className="h-5 w-5 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <div className="text-sm font-bold text-red-400">{t.date}</div>
                  <div className="text-base text-slate-200">{t.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
              Early access
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Be the first to know when we launch
            </h2>
            <p className="text-slate-600">
              Sign up for early access. You&apos;ll get a personal onboarding
              call with the founder and be first to try HireCheck Compliance
              when it goes live.
            </p>
          </div>

          {status === "ok" ? (
            <div className="rounded-xl border-2 border-green-500 bg-green-50 p-8 text-center">
              <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-green-900 mb-2">
                You&apos;re on the list.
              </h3>
              <p className="text-sm text-green-800">
                We&apos;ll reach out within 48 hours to schedule your onboarding
                call. In the meantime, run the{" "}
                <Link href="/ai-act-ready" className="underline font-semibold">
                  free 3-minute AI Act check
                </Link>{" "}
                to see your current risk score.
              </p>
            </div>
          ) : (
            <form
              onSubmit={submit}
              className="rounded-xl border border-slate-200 bg-slate-50 p-6 md:p-8 space-y-4"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <Field
                  label="Work email *"
                  value={email}
                  onChange={setEmail}
                  type="email"
                  required
                  placeholder="you@company.eu"
                />
                <Field
                  label="Company *"
                  value={company}
                  onChange={setCompany}
                  required
                  placeholder="Acme OÜ"
                />
                <Field
                  label="Your role"
                  value={role}
                  onChange={setRole}
                  placeholder="Head of HR / DPO / CEO"
                />
                <SelectField
                  label="Employees"
                  value={employees}
                  onChange={setEmployees}
                  options={[
                    { v: "", l: "Select…" },
                    { v: "1-10", l: "1–10" },
                    { v: "11-50", l: "11–50" },
                    { v: "51-200", l: "51–200" },
                    { v: "201-500", l: "201–500" },
                    { v: "501-1000", l: "501–1000" },
                    { v: "1000+", l: "1000+" },
                  ]}
                />
                <Field
                  label="ATS / hiring tool"
                  value={ats}
                  onChange={setAts}
                  placeholder="Workday, Teamtailor, none…"
                />
                <Field
                  label="Country"
                  value={country}
                  onChange={setCountry}
                  placeholder="Estonia"
                />
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

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {status === "submitting"
                  ? "Submitting…"
                  : "Get early access →"}
              </button>

              <p className="text-xs text-slate-500 text-center">
                We use your details only to prepare your onboarding and send
                you a single update when we launch. No marketing newsletter.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Footer note */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="text-sm text-slate-600">
            HireCheck Compliance is built by the team behind HireCheck, the
            public Human-First Score for EU employers. Not legal advice — but
            the same checklist a qualified DPO would walk you through.
          </p>
          <div className="mt-4">
            <Link
              href="/et/tooandjatele"
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              Eesti keeles →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

const FEATURES = [
  {
    icon: FileText,
    article: "Art. 26(1) · Art. 29",
    title: "AI Systems Inventory",
    body: "Log every AI tool you use in hiring — vendor, model, purpose, risk class. Auto-generated, export-ready.",
  },
  {
    icon: Users,
    article: "Art. 26(2)",
    title: "Human Oversight Protocol",
    body: "Document who reviews every AI decision, how, and with what authority to override. Template + sign-off workflow.",
  },
  {
    icon: ClipboardCheck,
    article: "Art. 26(5–6)",
    title: "Decision audit trail",
    body: "Every AI-assisted decision logged for 6 months — rejection, ranking, shortlist. Exportable for regulators.",
  },
  {
    icon: Shield,
    article: "Art. 27",
    title: "FRIA wizard",
    body: "Interactive Fundamental Rights Impact Assessment. Finish in 30 minutes instead of 30 hours with a consultant.",
  },
  {
    icon: AlertTriangle,
    article: "Art. 26(11)",
    title: "Candidate disclosure",
    body: "Ready-to-ship disclosure statements for your career site, application form and rejection emails. Multi-language.",
  },
  {
    icon: Lock,
    article: "GDPR Art. 22",
    title: "Bias & rights monitoring",
    body: "Alerts when rejection patterns suggest discrimination. Auto-generated Article 22 response templates when candidates appeal.",
  },
]

const TIMELINE = [
  {
    date: "2 February 2025 — in force",
    event:
      "Prohibited practices already banned: emotion recognition at work, social scoring, untargeted scraping.",
  },
  {
    date: "2 August 2026 — enforcement",
    event:
      "High-risk obligations apply. Every AI system used in recruitment must comply with Articles 26, 27 and 29.",
  },
  {
    date: "2 August 2027 — full scope",
    event:
      "Remaining high-risk system obligations enforced. Fines up to €35M or 7% of global turnover.",
  },
]

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-700 mb-1 block">
        {label}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </label>
  )
}

function SelectField({
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
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-700 mb-1 block">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {options.map((o) => (
          <option key={o.v} value={o.v}>
            {o.l}
          </option>
        ))}
      </select>
    </label>
  )
}
