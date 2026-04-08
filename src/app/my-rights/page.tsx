import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EmailTemplate } from "@/components/email-template"
import { Scale, Shield, Bot, FileText } from "lucide-react"

export const metadata = {
  title: "Know Your Rights | HireCheck",
  description: "Understand your rights as a job candidate under GDPR and the EU AI Act.",
}

export default function MyRightsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">Know Your Rights</h1>
        <p className="text-slate-600 max-w-xl mx-auto">
          Under EU regulations, you have the right to know how your job application was processed.
        </p>
      </div>

      {/* Rights overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <CardTitle className="text-lg">GDPR Article 15</CardTitle>
                <Badge variant="secondary">Right of Access</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">
              You have the right to obtain from a company confirmation of whether your personal data is being processed, and access to that data including the purposes and categories of data.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Scale className="h-8 w-8 text-blue-600" />
              <div>
                <CardTitle className="text-lg">GDPR Article 22</CardTitle>
                <Badge variant="secondary">Automated Decisions</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">
              You have the right not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects or similarly significantly affects you.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Bot className="h-8 w-8 text-blue-600" />
              <div>
                <CardTitle className="text-lg">EU AI Act</CardTitle>
                <Badge variant="secondary">AI Transparency</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">
              AI systems used in employment and recruitment are classified as high-risk. Companies must ensure transparency, human oversight, and inform candidates when AI is used.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <CardTitle className="text-lg">What You Can Do</CardTitle>
                <Badge variant="secondary">Take Action</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">
              Send a data access request to any company you&apos;ve applied to. They are legally required to respond within 30 days. Use our template below to make it easy.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Email template generator */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Generate Your Email</h2>
        <EmailTemplate />
      </div>
    </div>
  )
}
