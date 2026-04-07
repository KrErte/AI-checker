import { Report } from './supabase/types'

export function calculateHumanFirstScore(reports: Report[]): number {
  if (reports.length === 0) return 0

  const total = reports.length

  // Human response rate (40% weight)
  const humanResponses = reports.filter(r => r.outcome === 'human_response' || r.outcome === 'interview').length
  const humanResponseRate = humanResponses / total

  // Interview rate (20% weight)
  const interviews = reports.filter(r => r.outcome === 'interview').length
  const interviewRate = interviews / total

  // Response speed (25% weight)
  const speedScores: Record<string, number> = {
    within_24h: 1,
    within_week: 0.75,
    within_month: 0.5,
    over_month: 0.25,
    never: 0,
  }
  const avgSpeed = reports.reduce((sum, r) => sum + (speedScores[r.response_time] || 0), 0) / total

  // No auto-rejection penalty (15% weight)
  const autoRejections = reports.filter(r => r.outcome === 'automated_rejection').length
  const noAutoRejectionRate = 1 - autoRejections / total

  const score = Math.round(
    (humanResponseRate * 40 + interviewRate * 20 + avgSpeed * 25 + noAutoRejectionRate * 15)
  )

  return Math.min(100, Math.max(0, score))
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent'
  if (score >= 60) return 'Good'
  if (score >= 40) return 'Needs Improvement'
  if (score >= 20) return 'Poor'
  return 'Very Poor'
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-lime-600'
  if (score >= 40) return 'text-yellow-600'
  if (score >= 20) return 'text-orange-600'
  return 'text-red-600'
}

export function getScoreBgColor(score: number): string {
  if (score >= 80) return 'bg-green-100'
  if (score >= 60) return 'bg-lime-100'
  if (score >= 40) return 'bg-yellow-100'
  if (score >= 20) return 'bg-orange-100'
  return 'bg-red-100'
}
