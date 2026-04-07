import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScoreBadge } from "@/components/score-badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Building2, Shield, Bot, Users, Clock, FileText } from "lucide-react"

// Demo data
const DEMO_DATA: Record<string, {
  company: { name: string; slug: string; claimed: boolean; badge_status: string; uses_ai_screening: boolean; has_human_review: boolean; size: string; ats_system: string }
  score: number
  reports: Array<{ id: string; job_title: string; country: string; outcome: string; response_time: string; comment: string | null; created_at: string }>
}> = {
  wise: {
    company: { name: "Wise", slug: "wise", claimed: true, badge_status: "certified", uses_ai_screening: false, has_human_review: true, size: "1000+", ats_system: "Greenhouse" },
    score: 87,
    reports: [
      { id: "1", job_title: "Software Engineer", country: "Estonia", outcome: "interview", response_time: "within_week", comment: "Great experience, got a detailed response from the hiring manager.", created_at: "2026-03-15" },
      { id: "2", job_title: "Product Designer", country: "UK", outcome: "human_response", response_time: "within_24h", comment: "Quick rejection but with personalized feedback.", created_at: "2026-03-10" },
      { id: "3", job_title: "Data Analyst", country: "Estonia", outcome: "interview", response_time: "within_week", comment: null, created_at: "2026-02-28" },
    ],
  },
  bolt: {
    company: { name: "Bolt", slug: "bolt", claimed: true, badge_status: "verified", uses_ai_screening: true, has_human_review: true, size: "1000+", ats_system: "Lever" },
    score: 61,
    reports: [
      { id: "4", job_title: "Backend Developer", country: "Estonia", outcome: "automated_rejection", response_time: "within_24h", comment: "Got an instant automated rejection. No human reviewed my CV.", created_at: "2026-03-20" },
      { id: "5", job_title: "Marketing Manager", country: "Germany", outcome: "human_response", response_time: "within_month", comment: "Took a while but got a personalized response.", created_at: "2026-03-01" },
    ],
  },
}

const outcomeLabels: Record<string, string> = {
  automated_rejection: "Automated Rejection",
  human_response: "Human Response",
  no_response: "No Response",
  interview: "Got an Interview",
}

const outcomeColors: Record<string, "destructive" | "success" | "warning" | "secondary"> = {
  automated_rejection: "destructive",
  human_response: "secondary",
  no_response: "warning",
  interview: "success",
}

const responseTimeLabels: Record<string, string> = {
  within_24h: "Within 24h",
  within_week: "Within a week",
  within_month: "Within a month",
  over_month: "Over a month",
  never: "Never",
}

export default function CompanyProfilePage({ params }: { params: { slug: string } }) {
  const data = DEMO_DATA[params.slug]

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Company Not Found</h1>
        <p className="text-slate-600 mb-6">This company doesn&apos;t have a profile yet.</p>
        <Button asChild>
          <Link href="/submit">Be the first to submit a report</Link>
        </Button>
      </div>
    )
  }

  const { company, score, reports } = data

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Company header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
        <ScoreBadge score={score} size="lg" />
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{company.name}</h1>
            {company.claimed && <Badge variant="success">Verified</Badge>}
            {company.badge_status === "certified" && <Badge>Certified Human-First</Badge>}
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            <span className="flex items-center gap-1"><Building2 className="h-4 w-4" /> {company.size} employees</span>
            <span className="flex items-center gap-1"><FileText className="h-4 w-4" /> {reports.length} reports</span>
            <span className="flex items-center gap-1"><Shield className="h-4 w-4" /> ATS: {company.ats_system}</span>
          </div>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Bot className={`h-8 w-8 ${company.uses_ai_screening ? "text-orange-500" : "text-green-500"}`} />
            <div>
              <p className="text-sm font-medium">AI Screening</p>
              <p className="text-xs text-slate-600">{company.uses_ai_screening ? "Uses AI screening" : "No AI screening"}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Users className={`h-8 w-8 ${company.has_human_review ? "text-green-500" : "text-red-500"}`} />
            <div>
              <p className="text-sm font-medium">Human Review</p>
              <p className="text-xs text-slate-600">{company.has_human_review ? "Has human review" : "No human review"}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Clock className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Avg Response</p>
              <p className="text-xs text-slate-600">Within a week</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Candidate Reports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="border border-slate-100 rounded-lg p-4">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-medium">{report.job_title}</span>
                <span className="text-xs text-slate-500">{report.country}</span>
                <Badge variant={outcomeColors[report.outcome]}>{outcomeLabels[report.outcome]}</Badge>
                <span className="text-xs text-slate-500 ml-auto">{responseTimeLabels[report.response_time]}</span>
              </div>
              {report.comment && <p className="text-sm text-slate-600">{report.comment}</p>}
              <p className="text-xs text-slate-400 mt-2">{report.created_at}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="mt-6 text-center">
        <Button asChild>
          <Link href="/submit">Submit a Report for {company.name}</Link>
        </Button>
      </div>
    </div>
  )
}
