"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname() || "/"
  const isEt = pathname === "/et" || pathname.startsWith("/et/")

  const navLinks = isEt
    ? [
        { href: "/et", label: "Avaleht" },
        { href: "/companies", label: "Ettevõtted" },
        { href: "/submit", label: "Raporteeri" },
        { href: "/cv-check", label: "CV kontroll" },
        { href: "/human-review", label: "Art. 22 kiri" },
        { href: "/ai-act-ready", label: "AI Act kontroll" },
        { href: "/et/tooandjatele", label: "Tööandjatele", highlight: true },
      ]
    : [
        { href: "/", label: "Home" },
        { href: "/companies", label: "Companies" },
        { href: "/submit", label: "Submit Report" },
        { href: "/cv-check", label: "CV Check" },
        { href: "/human-review", label: "Art. 22 Letter" },
        { href: "/ai-act-ready", label: "AI Act Check" },
        { href: "/for-employers", label: "For Employers", highlight: true },
      ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href={isEt ? "/et" : "/"} className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
            HS
          </div>
          <span className="font-bold text-xl">HireCheck</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                link.highlight
                  ? "text-sm font-semibold rounded-md bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700 transition-colors"
                  : "text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              }
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-1 text-xs text-slate-500 border-l border-slate-200 pl-4">
            <Link
              href="/"
              className={`font-medium hover:text-slate-900 ${!isEt ? "text-slate-900 underline underline-offset-4" : ""}`}
              aria-current={!isEt ? "page" : undefined}
            >
              EN
            </Link>
            <span>·</span>
            <Link
              href="/et"
              className={`font-medium hover:text-slate-900 ${isEt ? "text-slate-900 underline underline-offset-4" : ""}`}
              aria-current={isEt ? "page" : undefined}
            >
              ET
            </Link>
          </div>
        </nav>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  link.highlight
                    ? "text-sm font-semibold text-blue-700"
                    : "text-sm font-medium text-slate-600 hover:text-slate-900"
                }
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
