"use client"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Download, Mail, Shield, CheckCircle2 } from "lucide-react"
import { generateLetter, type Lang } from "@/lib/article22"

export default function HumanReviewPage() {
  const [lang, setLang] = useState<Lang>("en")
  const [candidateName, setCandidateName] = useState("")
  const [candidateEmail, setCandidateEmail] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [position, setPosition] = useState("")
  const [appliedOn, setAppliedOn] = useState("")
  const [rejectedOn, setRejectedOn] = useState("")
  const [atsOrTool, setAtsOrTool] = useState("")
  const [copied, setCopied] = useState(false)

  const letter = useMemo(
    () =>
      generateLetter({
        lang,
        candidateName,
        candidateEmail,
        companyName,
        position,
        appliedOn,
        rejectedOn,
        atsOrTool: atsOrTool || undefined,
      }),
    [lang, candidateName, candidateEmail, companyName, position, appliedOn, rejectedOn, atsOrTool]
  )

  function handleCopy() {
    navigator.clipboard.writeText(`Subject: ${letter.subject}\n\n${letter.body}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDownload() {
    const blob = new Blob([`Subject: ${letter.subject}\n\n${letter.body}`], {
      type: "text/plain;charset=utf-8",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = letter.filename
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleMailto() {
    const url = `mailto:?subject=${encodeURIComponent(letter.subject)}&body=${encodeURIComponent(letter.body)}`
    window.location.href = url
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-10">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-700 mb-3">
          <Shield className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-bold mb-2">
          {lang === "et"
            ? "GDPR artikkel 22 — palu inimese ülevaatust"
            : "GDPR Article 22 — request a human review"}
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          {lang === "et"
            ? "Kui sind lükati tagasi automatiseeritud süsteemi (AI/ATS) poolt ilma sisulise inimese läbivaatuseta, on sul õigus nõuda inimese sekkumist. Genereeri tasuta GDPR-i kiri, mille saad otse ettevõttele saata."
            : "If you were rejected by an automated system (AI/ATS) without meaningful human review, you have the right to demand human intervention. Generate a free, legally-grounded GDPR letter you can send to the company."}
        </p>

        <Tabs value={lang} onValueChange={(v) => setLang(v as Lang)} className="mt-6 inline-flex">
          <TabsList>
            <TabsTrigger value="en">English</TabsTrigger>
            <TabsTrigger value="et">Eesti</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>{lang === "et" ? "Sinu andmed" : "Your details"}</CardTitle>
            <CardDescription>
              {lang === "et"
                ? "Andmed jäävad sinu brauserisse — me ei salvesta neid."
                : "Data stays in your browser — we don't store it."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="name">{lang === "et" ? "Sinu nimi" : "Your name"}</Label>
                <Input id="name" value={candidateName} onChange={(e) => setCandidateName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{lang === "et" ? "E-post" : "Email"}</Label>
                <Input id="email" type="email" value={candidateEmail} onChange={(e) => setCandidateEmail(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">{lang === "et" ? "Ettevõte" : "Company"}</Label>
              <Input id="company" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="e.g. Bolt" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">{lang === "et" ? "Positsioon" : "Position"}</Label>
              <Input id="position" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="e.g. Software Engineer" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="applied">{lang === "et" ? "Kandideerimise kuupäev" : "Applied on"}</Label>
                <Input id="applied" type="date" value={appliedOn} onChange={(e) => setAppliedOn(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rejected">{lang === "et" ? "Tagasilükkamise kuupäev" : "Rejected on"}</Label>
                <Input id="rejected" type="date" value={rejectedOn} onChange={(e) => setRejectedOn(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ats">
                {lang === "et" ? "ATS / AI tööriist (valikuline)" : "ATS / AI tool (optional)"}
              </Label>
              <Input
                id="ats"
                value={atsOrTool}
                onChange={(e) => setAtsOrTool(e.target.value)}
                placeholder="Workday, HireVue, Greenhouse..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Preview + actions */}
        <Card>
          <CardHeader>
            <CardTitle>{lang === "et" ? "Sinu kiri" : "Your letter"}</CardTitle>
            <CardDescription>{letter.subject}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea readOnly value={letter.body} rows={16} className="font-mono text-xs" />
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleCopy} variant="outline" size="sm">
                {copied ? <CheckCircle2 className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                {copied ? (lang === "et" ? "Kopeeritud" : "Copied") : (lang === "et" ? "Kopeeri" : "Copy")}
              </Button>
              <Button onClick={handleDownload} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                {lang === "et" ? "Lae alla .txt" : "Download .txt"}
              </Button>
              <Button onClick={handleMailto} size="sm">
                <Mail className="h-4 w-4 mr-1" />
                {lang === "et" ? "Ava e-postis" : "Open in email"}
              </Button>
            </div>
            <p className="text-xs text-slate-500">
              {lang === "et"
                ? "See tööriist ei asenda õigusabi. Kui ettevõte ei vasta 1 kuu jooksul, võid esitada kaebuse Andmekaitse Inspektsioonile (aki.ee)."
                : "This tool does not constitute legal advice. If the company doesn't respond within 1 month, you can file a complaint with your national data protection authority."}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
