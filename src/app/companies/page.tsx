import { listCompanies, listAllReports } from "@/lib/store"
import { computeScore } from "@/lib/score"
import { CompaniesList, type CompanyListItem } from "./companies-list"

export const dynamic = "force-dynamic"

export default async function CompaniesPage() {
  const [companies, allReports] = await Promise.all([
    listCompanies(),
    listAllReports(),
  ])

  // Group reports by company id once.
  const byCompany = new Map<string, typeof allReports>()
  for (const r of allReports) {
    const list = byCompany.get(r.company_id)
    if (list) list.push(r)
    else byCompany.set(r.company_id, [r])
  }

  const items: CompanyListItem[] = companies.map((c) => {
    const reports = byCompany.get(c.id) ?? []
    const { score, reportCount } = computeScore(reports)
    return {
      name: c.name,
      slug: c.slug,
      claimed: false,
      badge_status: "none",
      uses_ai_screening: false,
      score: score ?? 0,
      reportCount,
    }
  })

  // Sort: highest score first, unknown (0 reports) last.
  items.sort((a, b) => {
    if (a.reportCount === 0 && b.reportCount > 0) return 1
    if (b.reportCount === 0 && a.reportCount > 0) return -1
    return b.score - a.score
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Company Ratings</h1>
        <p className="text-slate-600">See how companies treat their applicants.</p>
      </div>

      <CompaniesList companies={items} />
    </div>
  )
}
