"use client"
import { useEffect, useState } from "react"

interface Stats {
  total_reports: number
  total_companies: number
  today_reports: number
}

export function LiveCounter() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    let cancelled = false
    const load = () =>
      fetch("/api/stats", { cache: "no-store" })
        .then((r) => r.json())
        .then((s) => {
          if (!cancelled) setStats(s)
        })
        .catch(() => {})
    load()
    const id = setInterval(load, 30_000)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [])

  const total = stats?.total_reports ?? 0
  const today = stats?.today_reports ?? 0
  const companies = stats?.total_companies ?? 0

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
        </span>
        <span className="text-slate-600">
          <strong className="text-slate-900">{total.toLocaleString()}</strong>{" "}
          {total === 1 ? "report" : "reports"}
          {total === 0 && " · be the first"}
        </span>
      </div>
      {total > 0 && (
        <>
          <span className="text-slate-400">·</span>
          <span className="text-slate-600">
            <strong className="text-slate-900">{companies.toLocaleString()}</strong>{" "}
            {companies === 1 ? "company" : "companies"} on file
          </span>
          {today > 0 && (
            <>
              <span className="text-slate-400">·</span>
              <span className="text-slate-600">
                <strong className="text-slate-900">{today}</strong> in the last 24h
              </span>
            </>
          )}
        </>
      )}
    </div>
  )
}
