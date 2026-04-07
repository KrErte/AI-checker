"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle, Building2, BarChart3, MessageSquare, Shield } from "lucide-react"

export default function ClaimPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">Claim Your Company Profile</h1>
        <p className="text-slate-600 max-w-xl mx-auto">
          Verify your company email to manage your profile, respond to reports, and improve your Human-First Score.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Building2 className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-medium text-sm">Manage Profile</h3>
            <p className="text-xs text-slate-500 mt-1">Update your company info</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-medium text-sm">Respond to Reports</h3>
            <p className="text-xs text-slate-500 mt-1">Address candidate feedback</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-medium text-sm">Track Your Score</h3>
            <p className="text-xs text-slate-500 mt-1">Monitor and improve ratings</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Shield className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-medium text-sm">Get Certified</h3>
            <p className="text-xs text-slate-500 mt-1">Earn the Human-First badge</p>
          </CardContent>
        </Card>
      </div>

      {/* Claim form */}
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Verify Your Email</CardTitle>
          <CardDescription>Use your company email address (e.g. you@company.com)</CardDescription>
        </CardHeader>
        <CardContent>
          {sent ? (
            <div className="text-center py-4">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
              <p className="font-medium">Verification email sent!</p>
              <p className="text-sm text-slate-600 mt-1">Check your inbox at {email}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Send Verification Email</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
