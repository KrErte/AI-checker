import { NextResponse } from "next/server"
import { z } from "zod"
import { rateLimit } from "@/lib/rate-limit"
import { insertReport } from "@/lib/store"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const ReportSchema = z.object({
  // Honeypot: must be empty. Real users won't see/fill it.
  website: z.string().max(0).optional().default(""),
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

  // Honeypot: silently "succeed" for bots so they don't retry
  if (parsed.data.website) {
    return NextResponse.json({ success: true })
  }

  try {
    await insertReport({
      company_name: parsed.data.company_name,
      job_title: parsed.data.job_title,
      country: parsed.data.country,
      outcome: parsed.data.outcome,
      response_time: parsed.data.response_time,
      rejection_email: parsed.data.rejection_email,
      comment: parsed.data.comment ?? null,
    })
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
