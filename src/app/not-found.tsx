import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <FileQuestion className="h-16 w-16 text-slate-300 mx-auto mb-6" />
      <h1 className="text-3xl font-bold mb-3">Page not found</h1>
      <p className="text-slate-600 mb-8 max-w-md mx-auto">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild>
          <Link href="/">Go home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/human-review">Generate a GDPR letter</Link>
        </Button>
      </div>
    </div>
  )
}
