// Simple in-memory rate limiter (per-process). For production with multiple
// instances, swap for Upstash Redis or Supabase-backed counter.

type Bucket = { count: number; resetAt: number }
const buckets = new Map<string, Bucket>()

export interface RateLimitResult {
  ok: boolean
  remaining: number
  resetAt: number
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now()
  const existing = buckets.get(key)

  if (!existing || existing.resetAt < now) {
    const resetAt = now + windowMs
    buckets.set(key, { count: 1, resetAt })
    return { ok: true, remaining: limit - 1, resetAt }
  }

  if (existing.count >= limit) {
    return { ok: false, remaining: 0, resetAt: existing.resetAt }
  }

  existing.count += 1
  return { ok: true, remaining: limit - existing.count, resetAt: existing.resetAt }
}

// Periodic cleanup so the map doesn't grow forever
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now()
    buckets.forEach((v, k) => {
      if (v.resetAt < now) buckets.delete(k)
    })
  }, 60_000).unref?.()
}
