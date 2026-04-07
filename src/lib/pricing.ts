/**
 * HireSignal pricing — single source of truth.
 *
 * Monetisation strategy:
 *  - Candidates stay free (drives the data flywheel) but can buy one-off
 *    GDPR Article 22 "Appeal Packs" for €9 — instant revenue without paywalling
 *    the public good.
 *  - Employers pay recurring fees to claim profiles, respond to reports,
 *    access analytics, and display a verified badge. This is the core ARR.
 *  - Researchers / journalists / ATS vendors pay for API + bulk data access.
 *
 * Prices are in EUR (ex. VAT). Stripe price IDs are read from env so the
 * same code runs in test and live mode.
 */

export type Audience = "candidate" | "employer" | "data"

export type Plan = {
  id: string
  audience: Audience
  name: string
  tagline: string
  price: number // EUR, monthly unless interval says otherwise
  interval: "month" | "year" | "one-time"
  cta: string
  highlight?: boolean
  features: string[]
  stripePriceEnv?: string // name of env var holding the Stripe price id
}

export const PLANS: Plan[] = [
  // ── Candidates ────────────────────────────────────────────────────────────
  {
    id: "candidate-free",
    audience: "candidate",
    name: "Free",
    tagline: "Submit reports, browse companies, know your rights.",
    price: 0,
    interval: "month",
    cta: "Get started",
    features: [
      "Unlimited anonymous reports",
      "Browse all company scores",
      "Read your GDPR rights guide",
      "1 Article 22 letter per month",
    ],
  },
  {
    id: "candidate-appeal-pack",
    audience: "candidate",
    name: "Appeal Pack",
    tagline: "One-off pack for when you need to fight a rejection.",
    price: 9,
    interval: "one-time",
    cta: "Buy Appeal Pack",
    highlight: true,
    stripePriceEnv: "STRIPE_PRICE_APPEAL_PACK",
    features: [
      "AI-drafted Article 22 human-review request",
      "Follow-up DSAR template (Art. 15)",
      "Complaint template for your national DPA",
      "PDF + editable .docx export",
      "Email tracking reminders",
    ],
  },

  // ── Employers ─────────────────────────────────────────────────────────────
  {
    id: "employer-free",
    audience: "employer",
    name: "Claimed",
    tagline: "Claim your company profile and respond to reports.",
    price: 0,
    interval: "month",
    cta: "Claim profile",
    features: [
      "Verify ownership of your profile",
      "Reply to 1 report per month",
      "Basic score breakdown",
      "Email alerts for new reports",
    ],
  },
  {
    id: "employer-pro",
    audience: "employer",
    name: "Pro",
    tagline: "For HR teams who actually care about candidate experience.",
    price: 49,
    interval: "month",
    cta: "Start 14-day trial",
    highlight: true,
    stripePriceEnv: "STRIPE_PRICE_EMPLOYER_PRO",
    features: [
      "Unlimited public responses",
      "Verified Employer badge",
      "Score trend analytics + benchmarks",
      "Weekly digest of new reports",
      "Export reports to CSV",
      "Up to 5 team seats",
    ],
  },
  {
    id: "employer-enterprise",
    audience: "employer",
    name: "Enterprise",
    tagline: "Compliance, ATS integration, and audit trails for large orgs.",
    price: 299,
    interval: "month",
    cta: "Talk to sales",
    stripePriceEnv: "STRIPE_PRICE_EMPLOYER_ENTERPRISE",
    features: [
      "Everything in Pro",
      "Unlimited seats + SSO (SAML)",
      "GDPR Article 22 audit log",
      "ATS webhooks (Greenhouse, Workday, Teamtailor)",
      "Quarterly compliance report (PDF)",
      "Dedicated CSM + 99.9% SLA",
    ],
  },

  // ── Data / API ────────────────────────────────────────────────────────────
  {
    id: "data-api",
    audience: "data",
    name: "Signal API",
    tagline: "Programmatic access to scores and aggregated trends.",
    price: 199,
    interval: "month",
    cta: "Request API key",
    stripePriceEnv: "STRIPE_PRICE_API",
    features: [
      "REST API: company scores, trends, sectors",
      "10k requests / month included",
      "Webhook on score changes",
      "Commercial redistribution license",
    ],
  },
]

export function plansFor(audience: Audience): Plan[] {
  return PLANS.filter((p) => p.audience === audience)
}

export function findPlan(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id)
}

export function formatPrice(plan: Plan): string {
  if (plan.price === 0) return "Free"
  const suffix =
    plan.interval === "one-time"
      ? ""
      : plan.interval === "year"
      ? " / year"
      : " / month"
  return `€${plan.price}${suffix}`
}
