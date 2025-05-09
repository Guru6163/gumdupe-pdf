import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Extraction Not Found</h2>
      <p className="text-muted-foreground mt-2 max-w-md">
        The PDF extraction you're looking for doesn't exist or has expired.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Upload a New PDF</Link>
      </Button>
    </div>
  )
}
