export type Outcome = 'automated_rejection' | 'human_response' | 'no_response' | 'interview'
export type ResponseTime = 'within_24h' | 'within_week' | 'within_month' | 'over_month' | 'never'
export type BadgeStatus = 'none' | 'pending' | 'verified' | 'certified'
export type AuditStatus = 'pending' | 'in_progress' | 'completed'

export interface Company {
  id: string
  name: string
  slug: string
  domain: string | null
  size: string | null
  ats_system: string | null
  uses_ai_screening: boolean
  has_human_review: boolean
  claimed: boolean
  claimed_by: string | null
  badge_status: BadgeStatus
  created_at: string
}

export interface Report {
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

export interface CompanyScore {
  company_id: string
  total_reports: number
  human_first_score: number
  human_response_rate: number
  interview_rate: number
  avg_response_speed: number
}

export interface Profile {
  id: string
  company_id: string | null
  email: string
  role: string
}

export interface AuditRequest {
  id: string
  company_id: string
  status: AuditStatus
  questionnaire_data: Record<string, unknown>
  result: string | null
  pdf_url: string | null
  created_at: string
}

export interface CompanyResponse {
  id: string
  report_id: string
  company_id: string
  response_text: string
  created_at: string
}
