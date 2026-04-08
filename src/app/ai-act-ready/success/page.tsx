import Link from "next/link"
import { COMPLIANCE_TEMPLATES } from "@/lib/ai-act-check"

export const metadata = {
  title: "AI Act Ready — your templates",
  description: "Download your EU AI Act compliance templates.",
}

export default function SuccessPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-green-600">
        Payment confirmed
      </p>
      <h1 className="mb-4 text-4xl font-bold">Your AI Act Ready bundle</h1>
      <p className="mb-8 text-gray-700">
        All 8 templates below. Right-click → Save As, or open and copy into your
        own docs. Updates through 2 August 2026 — bookmark this page.
      </p>

      <div className="mb-12 space-y-3">
        {COMPLIANCE_TEMPLATES.map((t, i) => (
          <a
            key={t.file}
            href={`/compliance-templates/${t.file}`}
            target="_blank"
            rel="noopener"
            className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 hover:border-black hover:bg-gray-50"
          >
            <div>
              <div className="text-xs text-gray-500">Template {i + 1} of 8</div>
              <div className="font-semibold">{t.title}</div>
              <div className="text-sm text-gray-600">{t.summary}</div>
            </div>
            <span className="ml-4 text-sm font-medium underline">Download</span>
          </a>
        ))}
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-sm text-gray-700">
        <h3 className="mb-2 font-semibold">How to use these</h3>
        <ol className="list-inside list-decimal space-y-1">
          <li>Start with template 01 (AI Systems Inventory). Fill it in completely.</li>
          <li>Use templates 02-04 to update your public-facing copy.</li>
          <li>Run template 06 against every AI vendor before signing or renewing.</li>
          <li>Have your DPO sign template 07 before processing high-risk data.</li>
          <li>Set up template 08 in your audit log system.</li>
        </ol>
        <p className="mt-4">
          Questions? Email{" "}
          <a href="mailto:hello@hirecheck.eu" className="underline">
            hello@hirecheck.eu
          </a>
          .
        </p>
      </div>

      <div className="mt-12 text-sm">
        <Link href="/ai-act-ready" className="underline">
          ← Back to the readiness check
        </Link>
      </div>
    </main>
  )
}
