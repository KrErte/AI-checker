// Lightweight storage abstraction.
//
// If NEXT_PUBLIC_SUPABASE_URL is set to a real URL, reports and companies
// are persisted to Supabase. Otherwise we fall back to a JSON file store
// under DATA_DIR (default /app/data), which is expected to be a Docker
// volume in production. This lets the MVP launch without any external
// service configuration.

import fs from "fs/promises"
import path from "path"
import { randomUUID } from "crypto"
import { createClient } from "@/lib/supabase/server"
import type { Outcome, ResponseTime } from "@/lib/supabase/types"

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data")
const COMPANIES_FILE = path.join(DATA_DIR, "companies.json")
const REPORTS_FILE = path.join(DATA_DIR, "reports.json")

export interface StoredCompany {
  id: string
  name: string
  slug: string
  created_at: string
}

export interface StoredReport {
  id: string
  company_id: string
  job_title: string
  country: string
  outcome: Outcome
  response_time: ResponseTime
  rejection_email: boolean
  comment: string | null
  created_at: string
}

export interface NewReport {
  company_name: string
  job_title: string
  country: string
  outcome: Outcome
  response_time: ResponseTime
  rejection_email: boolean
  comment: string | null
}

export interface Stats {
  total_reports: number
  total_companies: number
  today_reports: number
}

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return false
  if (url.includes("your-supabase") || url.includes("placeholder")) return false
  if (key.includes("your-supabase") || key.includes("placeholder")) return false
  return /^https:\/\/.+\.supabase\.co/.test(url)
}

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true })
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(file, "utf-8")
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

async function writeJson<T>(file: string, data: T): Promise<void> {
  await ensureDataDir()
  const tmp = `${file}.tmp`
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf-8")
  await fs.rename(tmp, file)
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
}

// ----- file store implementation -----

async function fileInsertReport(r: NewReport): Promise<StoredReport> {
  const companies = await readJson<StoredCompany[]>(COMPANIES_FILE, [])
  const slug = slugify(r.company_name)
  let company = companies.find((c) => c.slug === slug)
  if (!company) {
    company = {
      id: randomUUID(),
      name: r.company_name,
      slug,
      created_at: new Date().toISOString(),
    }
    companies.push(company)
    await writeJson(COMPANIES_FILE, companies)
  }

  const reports = await readJson<StoredReport[]>(REPORTS_FILE, [])
  const report: StoredReport = {
    id: randomUUID(),
    company_id: company.id,
    job_title: r.job_title,
    country: r.country,
    outcome: r.outcome,
    response_time: r.response_time,
    rejection_email: r.rejection_email,
    comment: r.comment,
    created_at: new Date().toISOString(),
  }
  reports.push(report)
  await writeJson(REPORTS_FILE, reports)
  return report
}

async function fileListCompanies(): Promise<StoredCompany[]> {
  return readJson<StoredCompany[]>(COMPANIES_FILE, [])
}

async function fileGetCompanyBySlug(slug: string): Promise<StoredCompany | null> {
  const companies = await readJson<StoredCompany[]>(COMPANIES_FILE, [])
  return companies.find((c) => c.slug === slug) ?? null
}

async function fileListReportsForCompany(companyId: string): Promise<StoredReport[]> {
  const reports = await readJson<StoredReport[]>(REPORTS_FILE, [])
  return reports
    .filter((r) => r.company_id === companyId)
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
}

async function fileListAllReports(): Promise<StoredReport[]> {
  return readJson<StoredReport[]>(REPORTS_FILE, [])
}

async function fileStats(): Promise<Stats> {
  const [reports, companies] = await Promise.all([
    readJson<StoredReport[]>(REPORTS_FILE, []),
    readJson<StoredCompany[]>(COMPANIES_FILE, []),
  ])
  const since = Date.now() - 24 * 60 * 60 * 1000
  const today = reports.filter((r) => new Date(r.created_at).getTime() > since).length
  return {
    total_reports: reports.length,
    total_companies: companies.length,
    today_reports: today,
  }
}

// ----- supabase implementation -----

async function supabaseInsertReport(r: NewReport): Promise<StoredReport> {
  const supabase = createClient()
  const slug = slugify(r.company_name)

  const { data: existing, error: selErr } = await supabase
    .from("companies")
    .select("id")
    .eq("slug", slug)
    .maybeSingle()
  if (selErr) throw selErr

  let companyId = existing?.id as string | undefined
  if (!companyId) {
    const { data: created, error: insErr } = await supabase
      .from("companies")
      .insert({ name: r.company_name, slug })
      .select("id")
      .single()
    if (insErr) throw insErr
    companyId = created.id
  }

  const { data: inserted, error: repErr } = await supabase
    .from("reports")
    .insert({
      company_id: companyId,
      job_title: r.job_title,
      country: r.country,
      outcome: r.outcome,
      response_time: r.response_time,
      rejection_email: r.rejection_email,
      comment: r.comment,
    })
    .select("*")
    .single()
  if (repErr) throw repErr
  return inserted as StoredReport
}

async function supabaseListCompanies(): Promise<StoredCompany[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("companies")
    .select("id, name, slug, created_at")
    .order("created_at", { ascending: false })
    .limit(500)
  if (error) throw error
  return (data ?? []) as StoredCompany[]
}

async function supabaseGetCompanyBySlug(slug: string): Promise<StoredCompany | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("companies")
    .select("id, name, slug, created_at")
    .eq("slug", slug)
    .maybeSingle()
  if (error) throw error
  return (data ?? null) as StoredCompany | null
}

async function supabaseListReportsForCompany(companyId: string): Promise<StoredReport[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false })
    .limit(200)
  if (error) throw error
  return (data ?? []) as StoredReport[]
}

async function supabaseListAllReports(): Promise<StoredReport[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(2000)
  if (error) throw error
  return (data ?? []) as StoredReport[]
}

async function supabaseStats(): Promise<Stats> {
  const supabase = createClient()
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  const [reportsRes, companiesRes, todayRes] = await Promise.all([
    supabase.from("reports").select("id", { count: "exact", head: true }),
    supabase.from("companies").select("id", { count: "exact", head: true }),
    supabase
      .from("reports")
      .select("id", { count: "exact", head: true })
      .gte("created_at", since),
  ])
  return {
    total_reports: reportsRes.count ?? 0,
    total_companies: companiesRes.count ?? 0,
    today_reports: todayRes.count ?? 0,
  }
}

// ----- public api -----

export async function insertReport(r: NewReport): Promise<StoredReport> {
  if (isSupabaseConfigured()) return supabaseInsertReport(r)
  return fileInsertReport(r)
}

export async function getStats(): Promise<Stats> {
  try {
    if (isSupabaseConfigured()) return await supabaseStats()
    return await fileStats()
  } catch {
    return { total_reports: 0, total_companies: 0, today_reports: 0 }
  }
}

export async function listCompanies(): Promise<StoredCompany[]> {
  try {
    if (isSupabaseConfigured()) return await supabaseListCompanies()
    return await fileListCompanies()
  } catch {
    return []
  }
}

export async function getCompanyBySlug(slug: string): Promise<StoredCompany | null> {
  try {
    if (isSupabaseConfigured()) return await supabaseGetCompanyBySlug(slug)
    return await fileGetCompanyBySlug(slug)
  } catch {
    return null
  }
}

export async function listReportsForCompany(companyId: string): Promise<StoredReport[]> {
  try {
    if (isSupabaseConfigured()) return await supabaseListReportsForCompany(companyId)
    return await fileListReportsForCompany(companyId)
  } catch {
    return []
  }
}

export async function listAllReports(): Promise<StoredReport[]> {
  try {
    if (isSupabaseConfigured()) return await supabaseListAllReports()
    return await fileListAllReports()
  } catch {
    return []
  }
}

export function storeBackend(): "supabase" | "file" {
  return isSupabaseConfigured() ? "supabase" : "file"
}
