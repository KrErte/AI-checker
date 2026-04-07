import { NextResponse } from "next/server"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"
import { rateLimit } from "@/lib/rate-limit"
import { slugify } from "@/lib/slug"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const ReportSchema = z.object({
  company_name: z.string().trim().min(2).max(120),
  job_title: z.string().trim().min(2).max(200),
  country: z.string().trim().min(2).max(80).default("Estonia"),
  outcome: z.enum([
    "automated_rejection",
    "human_response",
    "no_response",
    "interview",
  ]),
  response_time: z.enum([
    "within_24h",
    "within_week",
    "within_month",
    "over_month",
    "never",
  ]),
  rejection_email: z.boolean().default(false),
  comment: z.string().trim().max(2000).nullable().optional(),
})

function getClientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for")
  if (xff) return xff.split(",")[0].trim()
  return request.headers.get("x-real-ip") ?? "unknown"
}

export async function POST(request: Request) {
  // 1. Rate limit: 5 reports per IP per hour
  const ip = getClientIp(request)
  const rl = rateLimit(`reports:${ip}`, 5, 60 * 60 * 1000)
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many reports. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
        },
      }
    )
  }

  // 2. Validate input
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const parsed = ReportSchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    )
  }
  const data = parsed.data

  // 3. Persist via Supabase (find-or-create company, then insert report)
  try {
    const supabase = createClient()
    const slug = slugify(data.company_name)

    const { data: existing, error: selectError } = await supabase
      .from("companies")
      .select("id")
      .eq("slug", slug)
      .maybeSingle()

    if (selectError) throw selectError

    let companyId = existing?.id as string | undefined

    if (!companyId) {
      const { data: created, error: insertError } = await supabase
        .from("companies")
        .insert({ name: data.company_name, slug })
        .select("id")
        .single()
      if (insertError) throw insertError
      companyId = created.id
    }

    const { error: reportError } = await supabase.from("reports").insert({
      company_id: companyId,
      job_title: data.job_title,
      country: data.country,
      outcome: data.outcome,
      response_time: data.response_time,
      rejection_email: data.rejection_email,
      comment: data.comment ?? null,
    })
    if (reportError) throw reportError

    return NextResponse.json(
      { success: true, message: "Report submitted successfully" },
      {
        headers: {
          "X-RateLimit-Remaining": String(rl.remaining),
          "X-RateLimit-Reset": String(Math.ceil(rl.resetAt / 1000)),
        },
      }
    )
  } catch (err) {
    console.error("[/api/reports] persist failed:", err)
    return NextResponse.json(
      { error: "Failed to save report" },
      { status: 500 }
    )
  }
}
