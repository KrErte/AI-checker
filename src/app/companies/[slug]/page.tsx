import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScoreBadge } from "@/components/score-badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Building2, FileText } from "lucide-react"
import { getCompanyBySlug, listReportsForCompany } from "@/lib/store"
import { computeScore } from "@/lib/score"

export const dynamic = "force-dynamic"

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

export default async function CompanyProfilePage({
  params,
}: {
  params: { slug: string }
}) {
  const company = await getCompanyBySlug(params.slug)

  if (!company) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Company Not Found</h1>
        <p className="text-slate-600 mb-6">
          This company doesn&apos;t have a profile yet.
        </p>
        <Button asChild>
          <Link href="/submit">Be the first to submit a report</Link>
        </Button>
      </div>
    )
  }

  const reports = await listReportsForCompany(company.id)
  const { score, reportCount } = computeScore(reports)

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Company header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
        <ScoreBadge score={score ?? 0} size="lg" />
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{company.name}</h1>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            <span className="flex items-center gap-1">
              <Building2 className="h-4 w-4" /> {company.name}
            </span>
            <span className="flex items-center gap-1">
              <FileText className="h-4 w-4" /> {reportCount} reports
            </span>
          </div>
        </div>
      </div>

      {/* Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Candidate Reports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {reports.length === 0 && (
            <p className="text-sm text-slate-500">
              No reports yet for this company.
            </p>
          )}
          {reports.map((report) => (
            <div
              key={report.id}
              className="border border-slate-100 rounded-lg p-4"
            >
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-medium">{report.job_title}</span>
                <span className="text-xs text-slate-500">{report.country}</span>
                <Badge variant={outcomeColors[report.outcome] ?? "secondary"}>
                  {outcomeLabels[report.outcome] ?? report.outcome}
                </Badge>
                <span className="text-xs text-slate-500 ml-auto">
                  {responseTimeLabels[report.response_time] ?? report.response_time}
                </span>
              </div>
              {report.comment && (
                <p className="text-sm text-slate-600">{report.comment}</p>
              )}
              <p className="text-xs text-slate-400 mt-2">
                {new Date(report.created_at).toLocaleDateString()}
              </p>
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
