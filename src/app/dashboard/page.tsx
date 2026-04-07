"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScoreBadge } from "@/components/score-badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Circle, MessageSquare } from "lucide-react"
import Link from "next/link"

const DEMO_REPORTS = [
  { id: "1", job_title: "Software Engineer", outcome: "interview", response_time: "within_week", comment: "Great experience overall.", created_at: "2026-03-15", hasResponse: true },
  { id: "2", job_title: "Product Designer", outcome: "human_response", response_time: "within_24h", comment: "Quick rejection but with feedback.", created_at: "2026-03-10", hasResponse: false },
  { id: "3", job_title: "Data Analyst", outcome: "automated_rejection", response_time: "within_24h", comment: "Instant automated rejection. Very disappointing.", created_at: "2026-03-05", hasResponse: false },
]

const COMPLIANCE_ITEMS = [
  { id: "1", label: "All applicants receive a response within 2 weeks", done: true },
  { id: "2", label: "Human reviews all applications before rejection", done: true },
  { id: "3", label: "AI screening tools are disclosed to candidates", done: false },
  { id: "4", label: "Candidates can request human review of automated decisions", done: false },
  { id: "5", label: "GDPR Article 22 compliance documentation", done: true },
  { id: "6", label: "EU AI Act transparency requirements met", done: false },
]

const outcomeLabels: Record<string, string> = {
  automated_rejection: "Automated Rejection",
  human_response: "Human Response",
  no_response: "No Response",
  interview: "Got an Interview",
}

export default function DashboardPage() {
  const [respondingTo, setRespondingTo] = useState<string | null>(null)
  const [responseText, setResponseText] = useState("")

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Company Dashboard</h1>
          <p className="text-slate-600">Wise — Manage your company profile</p>
        </div>
        <ScoreBadge score={87} />
      </div>

      <Tabs defaultValue="reports">
        <TabsList>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="audit">Audit</TabsTrigger>
        </TabsList>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {DEMO_REPORTS.map((report) => (
                <div key={report.id} className="border border-slate-100 rounded-lg p-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-medium">{report.job_title}</span>
                    <Badge variant={report.outcome === "interview" ? "success" : report.outcome === "automated_rejection" ? "destructive" : "secondary"}>
                      {outcomeLabels[report.outcome]}
                    </Badge>
                    {report.hasResponse && (
                      <Badge variant="outline"><MessageSquare className="h-3 w-3 mr-1" /> Responded</Badge>
                    )}
                    <span className="text-xs text-slate-500 ml-auto">{report.created_at}</span>
                  </div>
                  {report.comment && <p className="text-sm text-slate-600 mb-3">{report.comment}</p>}

                  {!report.hasResponse && respondingTo !== report.id && (
                    <Button size="sm" variant="outline" onClick={() => setRespondingTo(report.id)}>
                      Respond
                    </Button>
                  )}

                  {respondingTo === report.id && (
                    <div className="mt-3 space-y-2">
                      <Textarea
                        placeholder="Write your response..."
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => { setRespondingTo(null); setResponseText("") }}>
                          Submit Response
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => { setRespondingTo(null); setResponseText("") }}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {COMPLIANCE_ITEMS.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    {item.done ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <Circle className="h-5 w-5 text-slate-300 mt-0.5 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${item.done ? "text-slate-900" : "text-slate-500"}`}>{item.label}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-6">Complete all items to qualify for Human-First certification.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>AI Hiring Audit</CardTitle>
            </CardHeader>
            <CardContent className="text-center py-8">
              <p className="text-slate-600 mb-6">
                Get your hiring process audited and earn the &quot;Certified Human-First&quot; badge.
              </p>
              <Button asChild size="lg">
                <Link href="/audit">Start Audit Process</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
