import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, BarChart3, Shield, AlertTriangle, Eye, FileCheck } from "lucide-react"

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Is Your Job Application Going
            <br />
            <span className="text-blue-600">Into a Black Hole?</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            Report your hiring experience. Hold companies accountable.
            Make recruitment transparent across the EU.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
              <Link href="/submit">
                Submit a Report
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link href="/companies">Browse Companies</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">The Problem</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center border-red-100">
              <CardContent className="pt-6">
                <AlertTriangle className="h-10 w-10 text-red-500 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">68% Ghosted</h3>
                <p className="text-sm text-slate-600">Most applicants never hear back from companies they apply to.</p>
              </CardContent>
            </Card>
            <Card className="text-center border-orange-100">
              <CardContent className="pt-6">
                <Eye className="h-10 w-10 text-orange-500 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">AI Screening</h3>
                <p className="text-sm text-slate-600">Automated systems reject qualified candidates without human review.</p>
              </CardContent>
            </Card>
            <Card className="text-center border-yellow-100">
              <CardContent className="pt-6">
                <FileCheck className="h-10 w-10 text-yellow-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">No Transparency</h3>
                <p className="text-sm text-slate-600">Candidates have no way to know how their application was processed.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Submit a Report</h3>
              <p className="text-sm text-slate-600">Share your anonymous hiring experience with any company.</p>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Companies Get Rated</h3>
              <p className="text-sm text-slate-600">Each company receives a Human-First Score based on real candidate data.</p>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Better Hiring</h3>
              <p className="text-sm text-slate-600">Transparency drives companies to improve their recruitment practices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
            <div>
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-slate-900">EU-Wide</div>
              <p className="text-sm text-slate-600">Coverage across all EU member states</p>
            </div>
            <div>
              <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-slate-900">0-100</div>
              <p className="text-sm text-slate-600">Human-First Score for every company</p>
            </div>
            <div>
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-slate-900">GDPR</div>
              <p className="text-sm text-slate-600">Know your rights under EU law</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make Hiring Transparent?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Join the movement. Every report helps build a better job market for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8">
              <Link href="/submit">Submit a Report</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-blue-700 text-lg px-8">
              <Link href="/claim">Claim Your Company</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
