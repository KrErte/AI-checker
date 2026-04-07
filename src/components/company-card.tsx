import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScoreBadge } from "@/components/score-badge"
import { Building2, FileText } from "lucide-react"

interface CompanyCardProps {
  company: {
    name: string
    slug: string
    claimed: boolean
    badge_status: string
    uses_ai_screening: boolean
  }
  score: number
  reportCount: number
}

export function CompanyCard({ company, score, reportCount }: CompanyCardProps) {
  return (
    <Link href={`/companies/${company.slug}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="h-4 w-4 text-slate-400" />
                <h3 className="font-semibold text-lg">{company.name}</h3>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {company.claimed && (
                  <Badge variant="success">Verified</Badge>
                )}
                {company.badge_status === "certified" && (
                  <Badge variant="default">Certified Human-First</Badge>
                )}
                {company.uses_ai_screening && (
                  <Badge variant="warning">Uses AI Screening</Badge>
                )}
              </div>
              <div className="flex items-center gap-1 mt-3 text-sm text-slate-500">
                <FileText className="h-3.5 w-3.5" />
                <span>{reportCount} reports</span>
              </div>
            </div>
            <ScoreBadge score={score} size="sm" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
