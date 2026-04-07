import { NextRequest, NextResponse } from "next/server"
import { findPlan } from "@/lib/pricing"

/**
 * Stripe Checkout entry point.
 *
 * Wiring this up to a live Stripe account is intentionally a one-file change:
 *  1. `npm i stripe`
 *  2. Set STRIPE_SECRET_KEY + the STRIPE_PRICE_* env vars referenced from
 *     `lib/pricing.ts`.
 *  3. Replace the placeholder block below with the commented-out Stripe call.
 *
 * Until then we redirect to /claim (employer plans) or /human-review (the
 * candidate appeal pack) so the flows still work end-to-end during dev.
 */
export async function GET(req: NextRequest) {
  const planId = req.nextUrl.searchParams.get("plan")
  if (!planId) {
    return NextResponse.json({ error: "missing plan" }, { status: 400 })
  }

  const plan = findPlan(planId)
  if (!plan) {
    return NextResponse.json({ error: "unknown plan" }, { status: 404 })
  }

  // Free plans don't need checkout — bounce straight to the relevant onboarding.
  if (plan.price === 0) {
    const target =
      plan.audience === "employer"
        ? "/claim"
        : plan.audience === "data"
        ? "/pricing"
        : "/submit"
    return NextResponse.redirect(new URL(target, req.url))
  }

  // TODO(stripe): replace with real Checkout Session once STRIPE_SECRET_KEY is set.
  //
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" })
  // const priceId = plan.stripePriceEnv ? process.env[plan.stripePriceEnv] : undefined
  // if (!priceId) return NextResponse.json({ error: "price not configured" }, { status: 500 })
  // const session = await stripe.checkout.sessions.create({
  //   mode: plan.interval === "one-time" ? "payment" : "subscription",
  //   line_items: [{ price: priceId, quantity: 1 }],
  //   success_url: `${req.nextUrl.origin}/dashboard?welcome=${plan.id}`,
  //   cancel_url: `${req.nextUrl.origin}/pricing`,
  //   automatic_tax: { enabled: true },
  // })
  // return NextResponse.redirect(session.url!, { status: 303 })

  // Dev fallback: route enterprise to a mailto, others to a placeholder page.
  if (plan.id === "employer-enterprise") {
    return NextResponse.redirect(
      new URL("mailto:sales@hiresignal.eu?subject=Enterprise%20plan", req.url)
    )
  }
  return NextResponse.redirect(
    new URL(`/pricing?pending=${plan.id}`, req.url)
  )
}
