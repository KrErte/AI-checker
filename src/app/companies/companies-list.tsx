"use client"
import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { CompanyCard } from "@/components/company-card"
import { Search } from "lucide-react"

export interface CompanyListItem {
  name: string
  slug: string
  claimed: boolean
  badge_status: string
  uses_ai_screening: boolean
  score: number
  reportCount: number
}

export function CompaniesList({ companies }: { companies: CompanyListItem[] }) {
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    if (!search) return companies
    const q = search.toLowerCase()
    return companies.filter((c) => c.name.toLowerCase().includes(q))
  }, [search, companies])

  return (
    <>
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
        <p className="text-center text-slate-500 mt-8">
          {companies.length === 0
            ? "No companies yet. Be the first to submit a report."
            : "No companies found matching your search."}
        </p>
      )}
    </>
  )
}
