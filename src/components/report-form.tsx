"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export function ReportForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [companyName, setCompanyName] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [country, setCountry] = useState("Estonia")
  const [outcome, setOutcome] = useState("")
  const [responseTime, setResponseTime] = useState("")
  const [rejectionEmail, setRejectionEmail] = useState(false)
  const [comment, setComment] = useState("")
  const [website, setWebsite] = useState("") // honeypot

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_name: companyName,
          job_title: jobTitle,
          country,
          outcome,
          response_time: responseTime,
          rejection_email: rejectionEmail,
          comment: comment || null,
          website, // honeypot
        }),
      })

      if (res.ok) {
        setSubmitted(true)
      }
    } catch (error) {
      console.error("Failed to submit report:", error)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-12 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Thank you!</h2>
          <p className="text-slate-600">Your report has been submitted and will help make hiring more transparent.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Report a Hiring Experience</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot field — hidden from users, bots will fill it */}
          <div
            style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
            aria-hidden="true"
          >
            <label htmlFor="website">Website (leave blank)</label>
            <input
              id="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company *</Label>
            <Input
              id="company"
              placeholder="e.g. Bolt, Wise, Pipedrive..."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title *</Label>
              <Input
                id="jobTitle"
                placeholder="e.g. Software Engineer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                placeholder="e.g. Estonia"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>What happened? *</Label>
            <Select value={outcome} onValueChange={setOutcome} required>
              <SelectTrigger>
                <SelectValue placeholder="Select outcome..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="automated_rejection">Automated Rejection</SelectItem>
                <SelectItem value="human_response">Human Response</SelectItem>
                <SelectItem value="no_response">No Response (Ghosted)</SelectItem>
                <SelectItem value="interview">Got an Interview</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Response Time *</Label>
            <Select value={responseTime} onValueChange={setResponseTime} required>
              <SelectTrigger>
                <SelectValue placeholder="How long did it take?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="within_24h">Within 24 hours</SelectItem>
                <SelectItem value="within_week">Within a week</SelectItem>
                <SelectItem value="within_month">Within a month</SelectItem>
                <SelectItem value="over_month">Over a month</SelectItem>
                <SelectItem value="never">Never heard back</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="rejectionEmail"
              checked={rejectionEmail}
              onChange={(e) => setRejectionEmail(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300"
            />
            <Label htmlFor="rejectionEmail">I received a rejection email</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Additional Comments (optional)</Label>
            <Textarea
              id="comment"
              placeholder="Share your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading || !outcome || !responseTime}>
            {loading ? "Submitting..." : "Submit Report"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
