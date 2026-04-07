import { ReportForm } from "@/components/report-form"

export const metadata = {
  title: "Submit a Report | HireSignal",
  description: "Report your hiring experience anonymously and help make recruitment transparent.",
}

export default function SubmitPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Submit a Report</h1>
        <p className="text-slate-600">Your report is anonymous and helps other candidates.</p>
      </div>
      <ReportForm />
    </div>
  )
}
