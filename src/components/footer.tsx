import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
                HS
              </div>
              <span className="font-bold text-xl">HireSignal</span>
            </div>
            <p className="text-sm text-slate-600">
              HireSignal makes hiring transparent. Built in Estonia, for the EU.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">For Candidates</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/submit" className="text-sm text-slate-600 hover:text-slate-900">Submit Report</Link>
              <Link href="/companies" className="text-sm text-slate-600 hover:text-slate-900">Browse Companies</Link>
              <Link href="/my-rights" className="text-sm text-slate-600 hover:text-slate-900">Know Your Rights</Link>
            </nav>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">For Companies</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/claim" className="text-sm text-slate-600 hover:text-slate-900">Claim Profile</Link>
              <Link href="/audit" className="text-sm text-slate-600 hover:text-slate-900">AI Hiring Audit</Link>
            </nav>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">&copy; 2026 HireSignal.eu. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="#" className="text-xs text-slate-500 hover:text-slate-900">Privacy Policy</Link>
            <Link href="#" className="text-xs text-slate-500 hover:text-slate-900">Terms of Service</Link>
            <Link href="#" className="text-xs text-slate-500 hover:text-slate-900">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
