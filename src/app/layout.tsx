import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

const SITE_URL = "https://hirecheck.eu"
const TITLE = "HireSignal — Your CV was rejected by AI. Demand a human review."
const DESCRIPTION =
  "GDPR Article 22 gives you the right to a human review of any automated hiring decision. Generate your free letter, report bad hiring practices, and hold EU employers accountable before the AI Act lands in August 2026."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · HireSignal",
  },
  description: DESCRIPTION,
  keywords: [
    "GDPR Article 22",
    "AI hiring",
    "automated rejection",
    "EU AI Act",
    "hiring transparency",
    "HireSignal",
    "hirecheck",
    "Human-First Score",
    "recruiting AI",
    "CV rejected by AI",
  ],
  authors: [{ name: "HireSignal" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "HireSignal",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_EU",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
