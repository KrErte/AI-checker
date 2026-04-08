// EU AI Act readiness questionnaire + scoring engine for EU SaaS founders.
// Rule-based. Not legal advice. Source: EU AI Act final text (Reg 2024/1689),
// GDPR Art 6/13/14/22/35, EDPB opinions through Q1 2026.

export type AnswerValue = "yes" | "no" | "unsure"

export interface Question {
  id: string
  group: "ai_usage" | "data" | "decisions" | "docs" | "risk"
  text: string
  help?: string
  weight: number
  // If the "bad" answer is "yes" we flag on yes, else we flag on no.
  bad: "yes" | "no"
  // If this question flags, what gap/risk category does it raise?
  category: string
  // If yes AND annex_iii true, this triggers HIGH-RISK Annex III classification
  annex_iii?: boolean
}

export const QUESTIONS: Question[] = [
  // A. AI usage
  {
    id: "uses_ai",
    group: "ai_usage",
    text: "Does your SaaS use any AI or LLM features at all?",
    help: "Includes OpenAI/Anthropic API calls, recommender systems, search ranking, content moderation, auto-translation, AI chat.",
    weight: 0,
    bad: "no",
    category: "baseline",
  },
  {
    id: "ai_customer_facing",
    group: "ai_usage",
    text: "Is AI used in features that end-users directly interact with?",
    weight: 8,
    bad: "yes",
    category: "transparency_obligations",
  },
  {
    id: "ai_generates_content",
    group: "ai_usage",
    text: "Does your product generate text, images, audio or video with AI?",
    help: "If yes, Art. 50(2) AI Act requires machine-readable marking of synthetic output.",
    weight: 10,
    bad: "yes",
    category: "art_50_marking",
  },
  // B. Data
  {
    id: "processes_personal_data",
    group: "data",
    text: "Does any AI feature process personal data (emails, names, content by users)?",
    weight: 8,
    bad: "yes",
    category: "gdpr_ai_intersection",
  },
  {
    id: "vendor_dpa",
    group: "data",
    text: "Do you have DPAs with every AI vendor you use (OpenAI, Anthropic, etc.)?",
    weight: 10,
    bad: "no",
    category: "vendor_governance",
  },
  {
    id: "prompt_logging",
    group: "data",
    text: "Do you store user prompts or AI outputs that may contain personal data?",
    weight: 6,
    bad: "yes",
    category: "retention_policy",
  },
  // C. Decisions & automation
  {
    id: "ai_decides_users",
    group: "decisions",
    text: "Does AI make or materially influence decisions that affect individual users (pricing, access, moderation, visibility)?",
    help: "If yes, GDPR Art. 22 may apply — right to human review.",
    weight: 12,
    bad: "yes",
    category: "art_22_hitl",
  },
  {
    id: "human_in_the_loop",
    group: "decisions",
    text: "Is there a documented human-in-the-loop for AI decisions users can contest?",
    weight: 10,
    bad: "no",
    category: "art_22_hitl",
  },
  {
    id: "contest_process",
    group: "decisions",
    text: "Do users have a documented way to contest an AI decision and request human review?",
    weight: 8,
    bad: "no",
    category: "art_22_hitl",
  },
  // D. Documentation
  {
    id: "has_inventory",
    group: "docs",
    text: "Do you maintain an inventory of AI systems you build, host, or integrate?",
    weight: 12,
    bad: "no",
    category: "doc_inventory",
  },
  {
    id: "has_disclosure",
    group: "docs",
    text: "Does your privacy policy explicitly disclose AI processing under GDPR Art. 13/14?",
    weight: 10,
    bad: "no",
    category: "doc_disclosure",
  },
  {
    id: "has_dpia",
    group: "docs",
    text: "Have you done a DPIA (Art. 35 GDPR) for your AI processing?",
    weight: 12,
    bad: "no",
    category: "doc_dpia",
  },
  // E. Annex III high-risk
  {
    id: "hr_hiring",
    group: "risk",
    text: "Do you use AI in recruitment, hiring, or candidate screening — your own or for customers?",
    help: "Annex III §4 — HIGH-RISK under AI Act.",
    weight: 20,
    bad: "yes",
    category: "annex_iii_hr",
    annex_iii: true,
  },
  {
    id: "hr_credit",
    group: "risk",
    text: "Do you use AI for credit scoring, insurance underwriting, or financial eligibility?",
    help: "Annex III §5 — HIGH-RISK.",
    weight: 20,
    bad: "yes",
    category: "annex_iii_credit",
    annex_iii: true,
  },
  {
    id: "hr_biometrics",
    group: "risk",
    text: "Do you use biometric identification, emotion recognition, or behavioural analysis?",
    help: "Annex III §1 — HIGH-RISK (some uses prohibited entirely).",
    weight: 20,
    bad: "yes",
    category: "annex_iii_biometrics",
    annex_iii: true,
  },
]

export interface ReadinessResult {
  score: number // 0-100
  risk: "low" | "medium" | "high" | "high_annex_iii"
  gaps: Gap[]
  annex_iii_flags: string[]
  summary: string
  deadline_days: number
}

export interface Gap {
  id: string
  title: string
  description: string
  severity: "low" | "medium" | "high"
  fix: string
}

const GAP_META: Record<string, Omit<Gap, "id"> & { condition: (a: Record<string, AnswerValue>) => boolean }> = {
  art_50_marking: {
    title: "Art. 50 — Synthetic content marking missing",
    description:
      "AI Act Art. 50(2) requires providers of generative AI to mark outputs as machine-generated in a detectable, machine-readable format.",
    severity: "high",
    fix: "Implement C2PA content credentials or an equivalent watermark; document in your AI systems inventory.",
    condition: (a) => a.ai_generates_content === "yes",
  },
  vendor_governance: {
    title: "Vendor governance gap",
    description:
      "You use AI vendors without comprehensive DPAs. Under GDPR Art. 28 and AI Act Art. 25, you remain responsible for vendor compliance.",
    severity: "high",
    fix: "Sign a DPA with every AI vendor. Add an annual vendor DDQ to your compliance calendar.",
    condition: (a) => a.vendor_dpa === "no" || a.vendor_dpa === "unsure",
  },
  art_22_hitl: {
    title: "Art. 22 — No human-in-the-loop for AI decisions",
    description:
      "GDPR Art. 22(3) requires the right to obtain human intervention for any decision based solely on automated processing with legal or similarly significant effects.",
    severity: "high",
    fix: "Document a human review workflow. Add a 'Contest this decision' link in user-facing AI features. Train at least one team member on the review SLA.",
    condition: (a) =>
      a.ai_decides_users === "yes" &&
      (a.human_in_the_loop !== "yes" || a.contest_process !== "yes"),
  },
  doc_inventory: {
    title: "No AI systems inventory",
    description:
      "AI Act Art. 12 and Annex IV require high-risk system providers to maintain technical documentation; even lower-risk deployers benefit from an inventory to map obligations.",
    severity: "medium",
    fix: "Use the 'AI Systems Inventory' template in the pack. Review quarterly.",
    condition: (a) => a.has_inventory === "no" || a.has_inventory === "unsure",
  },
  doc_disclosure: {
    title: "Privacy policy does not disclose AI processing",
    description:
      "GDPR Art. 13(2)(f) and 14(2)(g) require disclosure of automated decision-making and the logic involved.",
    severity: "high",
    fix: "Add the 'Privacy Policy Addendum' template to your privacy policy. Takes ~10 minutes.",
    condition: (a) => a.has_disclosure === "no" || a.has_disclosure === "unsure",
  },
  doc_dpia: {
    title: "No DPIA for AI processing",
    description:
      "GDPR Art. 35 requires a Data Protection Impact Assessment for high-risk processing, which includes most AI-on-personal-data use cases.",
    severity: "medium",
    fix: "Use the 'DPIA Starter' template. Complete the risk register. Review annually.",
    condition: (a) =>
      a.has_dpia === "no" &&
      (a.processes_personal_data === "yes" || a.ai_decides_users === "yes"),
  },
  retention_policy: {
    title: "No documented retention for prompts/outputs",
    description:
      "Storing prompts/outputs with personal data without a retention schedule violates GDPR Art. 5(1)(e) storage limitation.",
    severity: "medium",
    fix: "Define a retention period (30-90 days typical for prompts) and automate deletion.",
    condition: (a) => a.prompt_logging === "yes",
  },
  transparency_obligations: {
    title: "AI transparency duty unmet",
    description:
      "AI Act Art. 50(1) requires clear disclosure when users interact with AI systems such as chatbots.",
    severity: "medium",
    fix: "Add a visible 'You are interacting with AI' indicator wherever users can talk to an AI.",
    condition: (a) => a.ai_customer_facing === "yes",
  },
}

export function scoreAnswers(answers: Record<string, AnswerValue>): ReadinessResult {
  const gaps: Gap[] = []
  for (const [id, meta] of Object.entries(GAP_META)) {
    if (meta.condition(answers)) {
      gaps.push({ id, ...meta, title: meta.title, description: meta.description, severity: meta.severity, fix: meta.fix })
    }
  }

  // Annex III flags
  const annex_iii_flags: string[] = []
  if (answers.hr_hiring === "yes") annex_iii_flags.push("Hiring / recruitment (Annex III §4)")
  if (answers.hr_credit === "yes") annex_iii_flags.push("Credit scoring / insurance (Annex III §5)")
  if (answers.hr_biometrics === "yes") annex_iii_flags.push("Biometrics / emotion recognition (Annex III §1)")

  // Base score
  let score = 100
  for (const g of gaps) {
    score -= g.severity === "high" ? 18 : g.severity === "medium" ? 10 : 5
  }
  score -= annex_iii_flags.length * 15
  score = Math.max(0, Math.min(100, Math.round(score)))

  let risk: ReadinessResult["risk"]
  if (annex_iii_flags.length > 0 && score < 60) risk = "high_annex_iii"
  else if (score >= 75) risk = "low"
  else if (score >= 45) risk = "medium"
  else risk = "high"

  const DEADLINE = new Date("2026-08-02T00:00:00Z").getTime()
  const now = Date.now()
  const deadline_days = Math.max(0, Math.round((DEADLINE - now) / (24 * 3600 * 1000)))

  const summary = buildSummary(risk, gaps.length, annex_iii_flags.length, deadline_days)
  return { score, risk, gaps, annex_iii_flags, summary, deadline_days }
}

function buildSummary(
  risk: ReadinessResult["risk"],
  gapCount: number,
  annexIii: number,
  days: number,
): string {
  if (risk === "low")
    return `You're in decent shape. ${gapCount} minor gap${gapCount === 1 ? "" : "s"} to close before ${days} days from now.`
  if (risk === "medium")
    return `You have ${gapCount} compliance gap${gapCount === 1 ? "" : "s"}. ${days} days until the AI Act high-risk rules apply. Start closing now.`
  if (risk === "high")
    return `${gapCount} critical gaps and ${days} days left. This is a weekend of work to get to medium-risk — but don't leave it to July.`
  return `HIGH RISK. ${annexIii} Annex III classification${annexIii === 1 ? "" : "s"} + ${gapCount} open gaps. You are subject to the strictest tier of the AI Act. You need documented compliance before ${days} days pass — fines up to €35M or 7% of global turnover.`
}

export const COMPLIANCE_TEMPLATES: { file: string; title: string; summary: string }[] = [
  { file: "01-ai-systems-inventory.md", title: "AI Systems Inventory", summary: "Catalogue of every AI system you build, deploy or integrate, with risk classification." },
  { file: "02-ai-disclosure-statement.md", title: "AI Disclosure Statement", summary: "Drop-in user-facing statement for your site footer or dedicated AI page." },
  { file: "03-privacy-policy-addendum.md", title: "Privacy Policy Addendum", summary: "GDPR Art. 13/14 compliant paragraphs to bolt onto your existing privacy policy." },
  { file: "04-candidate-hiring-ai-notice.md", title: "Candidate Hiring AI Notice", summary: "Required if you use any AI in recruitment. Covers Art. 22 and Annex III." },
  { file: "05-internal-ai-usage-policy.md", title: "Internal AI Usage Policy", summary: "Your team's rules for using ChatGPT / Copilot / Claude at work." },
  { file: "06-vendor-ai-ddq.md", title: "Vendor AI Due-Diligence Questionnaire", summary: "25 questions to send every AI vendor before signing." },
  { file: "07-dpia-starter.md", title: "DPIA Starter", summary: "Pre-filled Data Protection Impact Assessment template for AI processing." },
  { file: "08-audit-log-template.md", title: "Audit & Incident Log", summary: "Record-keeping template satisfying AI Act Art. 12 logging requirements." },
]
