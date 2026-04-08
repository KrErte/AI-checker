import { NextResponse } from "next/server"
import { getStats } from "@/lib/store"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  const stats = await getStats()
  return NextResponse.json(stats, {
    headers: {
      "Cache-Control": "public, max-age=30, s-maxage=30",
    },
  })
}
