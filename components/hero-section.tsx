import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100 via-background to-background"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-700">
              Introducing GumDupe
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Extract data from PDFs with <span className="text-purple-600">AI precision</span>
            </h1>
            <p className="text-muted-foreground md:text-xl">
              Transform unstructured PDF documents into structured, actionable data in seconds. No more manual data
              entry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Get started free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/#features">See how it works</Link>
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              No credit card required. Free plan includes 25 extractions per month.
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-lg border bg-background p-2 shadow-xl">
              <div className="rounded-md overflow-hidden border shadow-sm">
                <Image
                  src="/cta.png"
                  width={800}
                  height={600}
                  alt="GumDupe dashboard preview"
                  className="w-full object-cover"
                />
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-purple-200 blur-3xl opacity-30"></div>
            <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-pink-200 blur-3xl opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
