import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { addLead } from "@/lib/leads"
import { rateLimit } from "@/lib/rate-limit"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const Schema = z.object({
  email: z.string().trim().email().max(254),
  source: z.string().trim().max(64).default("ai-act-ready"),
  score: z.number().min(0).max(100).optional(),
  risk: z.string().max(32).optional(),
  annex_iii: z.number().int().min(0).max(10).optional(),
  website: z.string().max(0).optional().default(""), // honeypot
})

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  const rl = rateLimit(`ai-act-lead:${ip}`, 10, 60 * 60 * 1000)
  if (!rl.ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 })
  }
  const parsed = Schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 })
  }
  if (parsed.data.website) {
    return NextResponse.json({ ok: true }) // honeypot silent success
  }

  try {
    await addLead(parsed.data.email, parsed.data.source, {
      score: parsed.data.score,
      risk: parsed.data.risk,
      annex_iii: parsed.data.annex_iii,
      ip,
    })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("ai-act-lead failed", e)
    return NextResponse.json({ error: "store_failed" }, { status: 500 })
  }
}
