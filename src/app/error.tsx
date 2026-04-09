"use client"

import { Button } from "@/components/ui/button"

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl font-bold mb-3">Something went wrong</h1>
      <p className="text-slate-600 mb-8 max-w-md mx-auto">
        An unexpected error occurred. Please try again.
      </p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}
