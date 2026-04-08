import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
                HS
              </div>
              <span className="font-bold text-xl">HireCheck</span>
            </div>
            <p className="text-sm text-slate-600">
              Hiring transparency for the EU. Built in Estonia. Free forever.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">For Candidates</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/cv-check" className="text-sm text-slate-600 hover:text-slate-900">CV AI-Check</Link>
              <Link href="/human-review" className="text-sm text-slate-600 hover:text-slate-900">Art. 22 Letter</Link>
              <Link href="/submit" className="text-sm text-slate-600 hover:text-slate-900">Submit Report</Link>
              <Link href="/companies" className="text-sm text-slate-600 hover:text-slate-900">Browse Companies</Link>
              <Link href="/my-rights" className="text-sm text-slate-600 hover:text-slate-900">Know Your Rights</Link>
            </nav>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">About</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/about" className="text-sm text-slate-600 hover:text-slate-900">Our Story</Link>
              <Link href="/methodology" className="text-sm text-slate-600 hover:text-slate-900">Methodology</Link>
              <Link href="/for-employers" className="text-sm text-slate-600 hover:text-slate-900">EU AI Act Compliance Pack</Link>
              <Link href="/claim" className="text-sm text-slate-600 hover:text-slate-900">Claim Profile</Link>
            </nav>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">Legal</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/privacy" className="text-sm text-slate-600 hover:text-slate-900">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-slate-600 hover:text-slate-900">Terms of Service</Link>
              <a href="mailto:contact@hirecheck.eu" className="text-sm text-slate-600 hover:text-slate-900">Contact</a>
            </nav>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">&copy; 2026 HireCheck · hirecheck.eu</p>
          <p className="text-xs text-slate-500">GDPR Art. 22 · EU AI Act compliant by design</p>
        </div>
      </div>
    </footer>
  )
}
