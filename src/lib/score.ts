// Human-First Score algorithm.
//
// Score starts at 100 and moves based on outcome + response time signals
// observed across all reports for a company. The intent is NOT to punish
// companies harshly, but to surface the clear signals:
//   - Automated rejection without human review       → bad
//   - Never heard back (ghosting)                    → bad
//   - Personal human response                        → good
//   - Interview                                       → good
//
// With no reports, score is `null` (unknown).
// The algorithm is intentionally simple so the methodology page can explain it.

import type { StoredReport } from "@/lib/store"

export interface ScoreBreakdown {
  score: number | null
  reportCount: number
  outcomes: {
    automated_rejection: number
    no_response: number
    human_response: number
    interview: number
  }
  avgResponseSignal: number // -1 (slow) .. +1 (fast)
}

const OUTCOME_DELTA: Record<string, number> = {
  automated_rejection: -18,
  no_response: -12,
  human_response: +6,
  interview: +12,
}

const RESPONSE_TIME_SIGNAL: Record<string, number> = {
  within_24h: 1,
  within_week: 0.5,
  within_month: -0.2,
  over_month: -0.6,
  never: -1,
}

export function computeScore(reports: StoredReport[]): ScoreBreakdown {
  const outcomes = {
    automated_rejection: 0,
    no_response: 0,
    human_response: 0,
    interview: 0,
  }

  if (reports.length === 0) {
    return { score: null, reportCount: 0, outcomes, avgResponseSignal: 0 }
  }

  let total = 100
  let signalSum = 0

  for (const r of reports) {
    const key = r.outcome as keyof typeof outcomes
    if (key in outcomes) outcomes[key] += 1
    total += OUTCOME_DELTA[r.outcome] ?? 0
    signalSum += RESPONSE_TIME_SIGNAL[r.response_time] ?? 0
  }

  const avgResponseSignal = signalSum / reports.length
  // Response-time nudge: up to ±10 points on top of outcome deltas.
  total += avgResponseSignal * 10

  // Clamp 0..100 and round.
  const score = Math.max(0, Math.min(100, Math.round(total)))

  return { score, reportCount: reports.length, outcomes, avgResponseSignal }
}
