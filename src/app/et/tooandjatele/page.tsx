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
  CheckCircle2,
  ArrowRight,
  Clock,
} from "lucide-react"

type Status = "idle" | "submitting" | "ok" | "error"

export default function TooandjateleEtPage() {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)

  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")
  const [employees, setEmployees] = useState("")
  const [ats, setAts] = useState("")
  const [country, setCountry] = useState("Eesti")
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
          locale: "et",
          website,
        }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(
          j.error || "Taotluse salvestamine ebaõnnestus. Proovi uuesti.",
        )
      }
      setStatus("ok")
    } catch (err) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Midagi läks valesti.")
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
              EU AI Act · kõrge riski reeglid jõustuvad 2. augustil 2026
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.05]">
              EU AI Act vastavus{" "}
              <span className="text-blue-600">värbamises</span>.
              <br />
              Auditivalmis nädalaga.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Kui kasutad värbamises AI-d kandidaatide skriinimiseks, järjestamiseks
              või filtreerimiseks, oled Annex III järgi <strong>kõrge riski
              kasutaja</strong>. HireCheck Compliance genereerib kõik vajalikud
              dokumendid, logib iga AI otsuse ja hoiab sind auditivalmis — ilma
              omaette juristita.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#waitlist"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-700 shadow-sm"
              >
                Liitu asutajate ootejärjekorraga
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <Link
                href="/ai-act-ready"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-800 hover:bg-slate-50"
              >
                Tee tasuta 3-min kontroll
              </Link>
            </div>
            <p className="mt-5 text-xs text-slate-500">
              Asutajahind — €49/kuus — fikseeritud esimesele 50 ettevõttele
              eluajaks.
            </p>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 md:py-20 border-b border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-600 mb-2">
            Probleem
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Augustiks 2026 pead tõestama, et kasutad AI-d värbamises seaduslikult.
          </h2>
          <div className="space-y-4 text-lg text-slate-700 leading-relaxed">
            <p>
              EU AI Act klassifitseerib iga AI-süsteemi, mida kasutatakse
              töötajate <strong>värbamiseks, skriinimiseks, hindamiseks või
              edutamiseks</strong>, Annex III punkti 4 järgi{" "}
              <strong>kõrge riski</strong> kategooriasse. See hõlmab iga
              CV-skriinimise tööriista, iga ChatGPT-ga tehtud eelvaliku, iga
              järjestamisfunktsiooni Workdays, Teamtailoris, SmartRecruitersis,
              Recruitees ja Greenhouse&apos;is — ning iga HR-tiimi, kes
              vaikselt kleebib avaldusi LLM-i aknasse.
            </p>
            <p>
              <em>Kasutajana</em> (art. 26) vastutad sa seaduslikult
              inimjärelevalve, dokumenteerimise, kandidaatide teavitamise,
              vahejuhtumite registreerimise, töötajate esindajate
              informeerimise ja{" "}
              <strong>põhiõiguste mõju hindamise</strong> (art. 27) eest. EU
              andmebaasis registreerimine on enne kasutust kohustuslik.
            </p>
            <p className="text-red-700 font-semibold">
              Trahvid ulatuvad 35M € või 7%-ni globaalsest käibest. Tähtaeg ei
              nihku ja ei ole läbiräägitav.
            </p>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2 text-center">
            Lahendus
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
            Kõik, mida art. 26 nõuab. Ühes töölaual.
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

      {/* Pricing */}
      <section className="py-16 md:py-20 border-b border-slate-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 text-center">
            Hinnad
          </h2>
          <p className="text-slate-600 mb-12 text-center">
            Asutajahinnad esimesele 50 ettevõttele. Fikseeritud eluajaks.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {PRICING.map((p) => (
              <div
                key={p.tier}
                className={`rounded-xl border p-8 flex flex-col ${
                  p.featured
                    ? "border-blue-600 border-2 bg-gradient-to-b from-blue-50 to-white shadow-md"
                    : "border-slate-200 bg-white"
                }`}
              >
                {p.featured && (
                  <div className="mb-3 inline-block rounded-full bg-blue-600 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-white w-fit">
                    Populaarseim
                  </div>
                )}
                <div className="text-sm font-semibold text-slate-600 mb-1">
                  {p.tier}
                </div>
                <div className="mb-1">
                  <span className="text-4xl font-bold text-slate-900">
                    {p.price} €
                  </span>
                  <span className="text-slate-500">/kuus</span>
                </div>
                <div className="text-xs text-slate-500 mb-6">{p.audience}</div>
                <ul className="space-y-2 text-sm text-slate-700 mb-6 flex-1">
                  {p.features.map((feat) => (
                    <li key={feat} className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#waitlist"
                  className={`rounded-lg px-4 py-2.5 text-sm font-semibold text-center ${
                    p.featured
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  Liitu ootejärjekorraga
                </a>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-slate-500">
            Saadaval ka aastaarve (−20%). 14-päevane tasuta prooviperiood.
            Ootejärjekorda liitumiseks krediitkaart pole vajalik.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-2">
            Ajajoon
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Loendur jõustumiseni
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
              Asutajate ootejärjekord
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Fikseeri 49 €/kuus eluajaks
            </h2>
            <p className="text-slate-600">
              Esimesed 50 ettevõtet saavad 20-minutilise sisseelamiskõne otse
              asutajaga, tasuta ülemineku olemasolevalt protsessilt ning 49 €
              hinna kinnituse igavesti — ka pärast avalikku käivitamist.
            </p>
          </div>

          {status === "ok" ? (
            <div className="rounded-xl border-2 border-green-500 bg-green-50 p-8 text-center">
              <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-green-900 mb-2">
                Oled nimekirjas.
              </h3>
              <p className="text-sm text-green-800">
                Võtame ühendust 48 tunni jooksul, et leppida kokku sinu
                sisseelamiskõne. Vahepeal tee{" "}
                <Link href="/ai-act-ready" className="underline font-semibold">
                  tasuta 3-minutiline AI Act kontroll
                </Link>
                , et näha oma praegust riskiskoori.
              </p>
            </div>
          ) : (
            <form
              onSubmit={submit}
              className="rounded-xl border border-slate-200 bg-slate-50 p-6 md:p-8 space-y-4"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <Field
                  label="Tööalane e-post *"
                  value={email}
                  onChange={setEmail}
                  type="email"
                  required
                  placeholder="sina@ettevote.ee"
                />
                <Field
                  label="Ettevõte *"
                  value={company}
                  onChange={setCompany}
                  required
                  placeholder="Näide OÜ"
                />
                <Field
                  label="Sinu roll"
                  value={role}
                  onChange={setRole}
                  placeholder="Personalijuht / DPO / Juhataja"
                />
                <SelectField
                  label="Töötajaid"
                  value={employees}
                  onChange={setEmployees}
                  options={[
                    { v: "", l: "Vali…" },
                    { v: "1-10", l: "1–10" },
                    { v: "11-50", l: "11–50" },
                    { v: "51-200", l: "51–200" },
                    { v: "201-500", l: "201–500" },
                    { v: "501-1000", l: "501–1000" },
                    { v: "1000+", l: "1000+" },
                  ]}
                />
                <Field
                  label="ATS / värbamistööriist"
                  value={ats}
                  onChange={setAts}
                  placeholder="Workday, Teamtailor, ei ole…"
                />
                <Field
                  label="Riik"
                  value={country}
                  onChange={setCountry}
                  placeholder="Eesti"
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

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {status === "submitting"
                  ? "Saadan…"
                  : "Liitu asutajate ootejärjekorraga →"}
              </button>

              <p className="text-xs text-slate-500 text-center">
                Kasutame sinu andmeid ainult sisseelamise ettevalmistamiseks ja
                ühe uuenduse saatmiseks, kui käivitame avaliku versiooni.
                Uudiskirja ei saada.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Footer note */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="text-sm text-slate-600">
            HireCheck Compliance on ehitanud sama tiim, kes on HireChecki —
            avaliku Human-First Score platvormi — taga. See ei ole õigusnõu,
            kuid sama kontrollnimekiri, mille sinu DPO sinuga läbi käiks.
          </p>
          <div className="mt-4">
            <Link
              href="/for-employers"
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              In English →
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
    title: "AI-süsteemide register",
    body: "Logi kõik värbamises kasutatavad AI-tööriistad — tarnija, mudel, eesmärk, riskiklass. Automaatselt genereeritud ja eksporditav.",
  },
  {
    icon: Users,
    article: "Art. 26(2)",
    title: "Inimjärelevalve protokoll",
    body: "Dokumenteeri, kes iga AI otsuse üle vaatab, kuidas ja millise volitusega seda tühistada saab. Mall + kinnitusvoog.",
  },
  {
    icon: ClipboardCheck,
    article: "Art. 26(5–6)",
    title: "Otsuste auditilogi",
    body: "Iga AI-toega otsus logitud 6 kuud — tagasilükkamine, järjestus, eelvalik. Eksporditav regulaatorile.",
  },
  {
    icon: Shield,
    article: "Art. 27",
    title: "FRIA nõustaja",
    body: "Interaktiivne põhiõiguste mõju hindamine (Fundamental Rights Impact Assessment). Valmis 30 minutiga, mitte 30 tunniga konsultandiga.",
  },
  {
    icon: AlertTriangle,
    article: "Art. 26(11)",
    title: "Kandidaatide teavitamine",
    body: "Valmis tekstid karjäärilehele, avalduse vormile ja tagasilükkamise kirjadesse. Mitmekeelsed.",
  },
  {
    icon: Lock,
    article: "GDPR art. 22",
    title: "Diskrimineerimise jälgimine",
    body: "Hoiatused, kui tagasilükkamise mustrid viitavad diskrimineerimisele. Automaatne art. 22 vastusemall, kui kandidaat kaebab otsuse peale.",
  },
]

const PRICING = [
  {
    tier: "Starter",
    price: 49,
    audience: "< 50 töötajat · 1 AI-tööriist",
    featured: false,
    features: [
      "AI-süsteemide register",
      "Põhiline vastavuse kontrollnimekiri",
      "3 dokumendigeneraatorit",
      "Kuni 50 kandidaati kuus",
      "E-posti tugi",
    ],
  },
  {
    tier: "Business",
    price: 149,
    audience: "50–500 töötajat",
    featured: true,
    features: [
      "Kõik, mis Starteris",
      "Kõik dokumendigeneraatorid (FRIA, art. 27)",
      "Piiramatu kandidaatide arv",
      "5 kasutajat · rollid",
      "Otsuste auditilogi + eksport",
      "Prioriteetne tugi",
    ],
  },
  {
    tier: "Enterprise",
    price: 499,
    audience: "500+ töötajat",
    featured: false,
    features: [
      "Kõik, mis Businessis",
      "Piiramatu kasutajaid",
      "Kohandatud FRIA koos meie tiimiga",
      "SSO · auditilogid",
      "Määratud edukushaldaja",
      "SLA",
    ],
  },
]

const TIMELINE = [
  {
    date: "2. veebruar 2025 — jõus",
    event:
      "Keelatud praktikad juba keelatud: emotsiooni tuvastamine töökohal, sotsiaalne skoorimine, sihitu scraping.",
  },
  {
    date: "2. august 2026 — jõustamine",
    event:
      "Kõrge riski kohustused kehtivad. Iga värbamises kasutatav AI-süsteem peab vastama artiklite 26, 27 ja 29 nõuetele.",
  },
  {
    date: "2. august 2027 — täielik ulatus",
    event:
      "Ülejäänud kõrge riski süsteemide kohustused jõustatud. Trahvid kuni 35M € või 7% globaalsest käibest.",
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
