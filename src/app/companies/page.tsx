"use client"
import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { CompanyCard } from "@/components/company-card"
import { Search } from "lucide-react"

// Demo data — in production this comes from Supabase
const DEMO_COMPANIES = [
  {
    name: "Wise",
    slug: "wise",
    claimed: true,
    badge_status: "certified",
    uses_ai_screening: false,
    score: 87,
    reportCount: 42,
  },
  {
    name: "Bolt",
    slug: "bolt",
    claimed: true,
    badge_status: "verified",
    uses_ai_screening: true,
    score: 61,
    reportCount: 38,
  },
  {
    name: "Pipedrive",
    slug: "pipedrive",
    claimed: false,
    badge_status: "none",
    uses_ai_screening: true,
    score: 45,
    reportCount: 23,
  },
  {
    name: "Veriff",
    slug: "veriff",
    claimed: true,
    badge_status: "verified",
    uses_ai_screening: false,
    score: 74,
    reportCount: 15,
  },
  {
    name: "Skeleton Technologies",
    slug: "skeleton-technologies",
    claimed: false,
    badge_status: "none",
    uses_ai_screening: false,
    score: 52,
    reportCount: 8,
  },
  {
    name: "Starship Technologies",
    slug: "starship-technologies",
    claimed: false,
    badge_status: "none",
    uses_ai_screening: true,
    score: 33,
    reportCount: 19,
  },
]

export default function CompaniesPage() {
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    if (!search) return DEMO_COMPANIES
    return DEMO_COMPANIES.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Company Ratings</h1>
        <p className="text-slate-600">See how companies treat their applicants.</p>
      </div>

      <div className="max-w-md mx-auto mb-8 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {filtered.map((company) => (
          <CompanyCard
            key={company.slug}
            company={company}
            score={company.score}
            reportCount={company.reportCount}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-slate-500 mt-8">No companies found matching your search.</p>
      )}
    </div>
  )
}
