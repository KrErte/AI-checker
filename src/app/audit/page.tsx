"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Shield, Award, FileSearch } from "lucide-react"

const QUESTIONS = [
  { id: "q1", question: "Do you use any AI or automated tools in your screening process?", type: "select", options: ["Yes", "No", "Partially"] },
  { id: "q2", question: "Are candidates informed that AI tools are used?", type: "select", options: ["Yes, always", "Sometimes", "No"] },
  { id: "q3", question: "Is there a human review step before rejection?", type: "select", options: ["Always", "For some roles", "No"] },
  { id: "q4", question: "What is your average response time to applicants?", type: "select", options: ["Within 24 hours", "Within a week", "Within a month", "No standard"] },
  { id: "q5", question: "Describe your hiring process and how you ensure fairness:", type: "textarea" },
]

export default function AuditPage() {
  const [started, setStarted] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto text-center">
          <CardContent className="py-12">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Audit Submitted!</h2>
            <p className="text-slate-600 mb-4">
              Our team will review your responses and get back to you within 5 business days.
            </p>
            <p className="text-sm text-slate-500">
              You&apos;ll receive the results and your certification status via email.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!started) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">AI Hiring Audit</h1>
          <p className="text-slate-600 max-w-xl mx-auto">
            Get certified. Show candidates you put humans first.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <FileSearch className="h-10 w-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-1">1. Questionnaire</h3>
              <p className="text-sm text-slate-600">Answer questions about your hiring process</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Shield className="h-10 w-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-1">2. Review</h3>
              <p className="text-sm text-slate-600">Our team evaluates your practices</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Award className="h-10 w-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-1">3. Certification</h3>
              <p className="text-sm text-slate-600">Earn the Human-First badge</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button size="lg" onClick={() => setStarted(true)}>Start Audit Questionnaire</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Audit Questionnaire</CardTitle>
          <CardDescription>Answer honestly — this helps us provide accurate certification.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
            className="space-y-6"
          >
            {QUESTIONS.map((q) => (
              <div key={q.id} className="space-y-2">
                <Label>{q.question}</Label>
                {q.type === "select" && q.options ? (
                  <Select value={answers[q.id] || ""} onValueChange={(v) => setAnswers({ ...answers, [q.id]: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {q.options.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Textarea
                    value={answers[q.id] || ""}
                    onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                    rows={4}
                  />
                )}
              </div>
            ))}
            <Button type="submit" className="w-full" size="lg">Submit Audit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
