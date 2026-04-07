"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Check } from "lucide-react"

export function EmailTemplate() {
  const [companyName, setCompanyName] = useState("")
  const [yourName, setYourName] = useState("")
  const [applicationDate, setApplicationDate] = useState("")
  const [position, setPosition] = useState("")
  const [copied, setCopied] = useState(false)

  const emailTemplate = `Subject: GDPR Data Access Request — Application for ${position || "[Position]"}

Dear ${companyName || "[Company Name]"} HR/Data Protection Officer,

My name is ${yourName || "[Your Name]"} and I applied for the position of ${position || "[Position]"} on ${applicationDate || "[Date]"}.

Under Article 15 of the General Data Protection Regulation (GDPR) and Article 22 regarding automated decision-making, I am writing to request the following information about my application:

1. Whether any automated decision-making or profiling was used in processing my application (Article 22(1))
2. If so, meaningful information about the logic involved, as well as the significance and envisaged consequences of such processing (Article 15(1)(h))
3. The categories of personal data processed during my application
4. The specific criteria used to evaluate my candidacy
5. Whether my application was reviewed by a human being

Additionally, under the EU AI Act (Regulation 2024/1689), if an AI system was used in the recruitment process, I request:
- Notification that an AI system was used (Article 50(1))
- Information about the AI system's purpose and functioning

I kindly request a response within 30 days as required by Article 12(3) of the GDPR.

Thank you for your attention to this matter.

Best regards,
${yourName || "[Your Name]"}`

  async function handleCopy() {
    await navigator.clipboard.writeText(emailTemplate)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Your Email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="yourName">Your Name</Label>
              <Input
                id="yourName"
                placeholder="John Doe"
                value={yourName}
                onChange={(e) => setYourName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                placeholder="Company Ltd"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position Applied For</Label>
              <Input
                id="position"
                placeholder="Software Engineer"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="applicationDate">Application Date</Label>
              <Input
                id="applicationDate"
                type="date"
                value={applicationDate}
                onChange={(e) => setApplicationDate(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Email Preview</CardTitle>
            <Button onClick={handleCopy} variant="outline" size="sm">
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy to Clipboard
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap text-sm text-slate-700 bg-slate-50 rounded-lg p-4 font-sans leading-relaxed">
            {emailTemplate}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
