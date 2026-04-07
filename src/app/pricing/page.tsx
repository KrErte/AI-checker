import Link from "next/link"
import { Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { plansFor, formatPrice, type Plan } from "@/lib/pricing"

export const metadata = {
  title: "Pricing — HireSignal",
  description:
    "Free for candidates. Paid plans for employers who want to claim profiles, respond to reports, and prove they hire fairly.",
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <Card
      className={
        plan.highlight
          ? "relative border-blue-600 border-2 shadow-lg"
          : "relative"
      }
    >
      {plan.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white flex items-center gap-1">
          <Sparkles className="h-3 w-3" /> Most popular
        </div>
      )}
      <CardContent className="pt-8 pb-6 flex flex-col h-full">
        <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
        <p className="text-sm text-slate-600 mt-1 mb-4 min-h-[40px]">
          {plan.tagline}
        </p>
        <div className="mb-6">
          <span className="text-4xl font-bold text-slate-900">
            {formatPrice(plan)}
          </span>
          {plan.interval === "one-time" && plan.price > 0 && (
            <span className="text-sm text-slate-500 ml-1">one-time</span>
          )}
        </div>
        <ul className="space-y-2 mb-6 flex-1">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
              <Check className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <Button
          asChild
          className={
            plan.highlight
              ? "w-full bg-blue-600 hover:bg-blue-700"
              : "w-full"
          }
          variant={plan.highlight ? "default" : "outline"}
        >
          <Link href={`/api/checkout?plan=${plan.id}`}>{plan.cta}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default function PricingPage() {
  const candidate = plansFor("candidate")
  const employer = plansFor("employer")
  const data = plansFor("data")

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Pricing that funds the fight
          </h1>
          <p className="text-lg text-slate-600">
            Candidates use HireSignal for free, forever. Employers and data
            customers pay so we can keep building. No dark patterns, no scraping
            your CV, cancel any time.
          </p>
        </div>

        <Tabs defaultValue="employer" className="max-w-6xl mx-auto">
          <TabsList className="mx-auto mb-10 grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="candidate">Candidates</TabsTrigger>
            <TabsTrigger value="employer">Employers</TabsTrigger>
            <TabsTrigger value="data">Data / API</TabsTrigger>
          </TabsList>

          <TabsContent value="candidate">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {candidate.map((p) => (
                <PlanCard key={p.id} plan={p} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="employer">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {employer.map((p) => (
                <PlanCard key={p.id} plan={p} />
              ))}
            </div>
            <p className="text-center text-xs text-slate-500 mt-6">
              All prices in EUR, exclusive of VAT. 14-day free trial on Pro.
              Cancel any time from your dashboard.
            </p>
          </TabsContent>

          <TabsContent value="data">
            <div className="grid grid-cols-1 max-w-md mx-auto gap-6">
              {data.map((p) => (
                <PlanCard key={p.id} plan={p} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mt-20">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Frequently asked
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Why charge employers but not candidates?",
                a: "Candidates are the source of truth — paywalling them would kill the data quality. Employers benefit from a verified profile and the analytics, so they fund the platform.",
              },
              {
                q: "Do paying employers get to hide bad reports?",
                a: "Never. Paid employers can publicly respond to reports, but they cannot delete or hide them. That would defeat the entire purpose of HireSignal.",
              },
              {
                q: "How do you handle GDPR / VAT?",
                a: "We're EU-based and VAT-registered. Invoices are issued automatically via Stripe. All data stays inside the EU (Supabase eu-central-1).",
              },
              {
                q: "Can I cancel?",
                a: "Yes, any time. You keep access until the end of the billing period.",
              },
            ].map(({ q, a }) => (
              <Card key={q}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-slate-900 mb-1">{q}</h3>
                  <p className="text-sm text-slate-600">{a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
