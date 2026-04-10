"use client"
import { useEffect } from "react"

export default function EtLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = "et"
    return () => {
      document.documentElement.lang = "en"
    }
  }, [])

  return <>{children}</>
}
