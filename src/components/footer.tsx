"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Footer() {
  const pathname = usePathname() || "/"
  const isEt = pathname === "/et" || pathname.startsWith("/et/")

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
              {isEt
                ? "Värbamise läbipaistvus EL-is. Loodud Eestis. Tasuta igavesti."
                : "Hiring transparency for the EU. Built in Estonia. Free forever."}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">
              {isEt ? "Kandidaatidele" : "For Candidates"}
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/cv-check" className="text-sm text-slate-600 hover:text-slate-900">
                {isEt ? "CV AI-kontroll" : "CV AI-Check"}
              </Link>
              <Link href="/human-review" className="text-sm text-slate-600 hover:text-slate-900">
                {isEt ? "Art. 22 kiri" : "Art. 22 Letter"}
              </Link>
              <Link href="/submit" className="text-sm text-slate-600 hover:text-slate-900">
                {isEt ? "Esita raport" : "Submit Report"}
              </Link>
              <Link href="/companies" className="text-sm text-slate-600 hover:text-slate-900">
                {isEt ? "Sirvi ettevõtteid" : "Browse Companies"}
              </Link>
              <Link href="/my-rights" className="text-sm text-slate-600 hover:text-slate-900">
                {isEt ? "Tunne oma õigusi" : "Know Your Rights"}
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">
              {isEt ? "Meist" : "About"}
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/about" className="text-sm text-slate-600 hover:text-slate-900">
                {isEt ? "Meie lugu" : "Our Story"}
              </Link>
              <Link href="/methodology" className="text-sm text-slate-600 hover:text-slate-900">
                {isEt ? "Metoodika" : "Methodology"}
              </Link>
              <Link href={isEt ? "/et/tooandjatele" : "/for-employers"} className="text-sm text-slate-600 hover:text-slate-900">
                {isEt ? "EL AI Act vastavuspakett" : "EU AI Act Compliance Pack"}
              </Link>
              <Link href="/claim" className="text-sm text-slate-600 hover:text-slate-900">
                {isEt ? "Halda profiili" : "Claim Profile"}
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">
              {isEt ? "Õiguslik" : "Legal"}
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/privacy" className="text-sm text-slate-600 hover:text-slate-900">
                {isEt ? "Privaatsuspoliitika" : "Privacy Policy"}
              </Link>
              <Link href="/terms" className="text-sm text-slate-600 hover:text-slate-900">
                {isEt ? "Kasutustingimused" : "Terms of Service"}
              </Link>
              <a href="mailto:contact@hirecheck.eu" className="text-sm text-slate-600 hover:text-slate-900">
                {isEt ? "Kontakt" : "Contact"}
              </a>
            </nav>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">&copy; 2026 HireCheck · hirecheck.eu</p>
          <p className="text-xs text-slate-500">
            {isEt
              ? "GDPR art. 22 · EL AI Act vastavus disaini järgi"
              : "GDPR Art. 22 · EU AI Act compliant by design"}
          </p>
        </div>
      </div>
    </footer>
  )
}
