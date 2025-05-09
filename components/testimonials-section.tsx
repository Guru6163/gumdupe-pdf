import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { QuoteIcon } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "GumDupe has saved our accounting team countless hours of manual data entry. We process hundreds of invoices weekly, and the accuracy is impressive.",
      author: "Sarah Johnson",
      title: "CFO, TechCorp Inc.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "As a research analyst, I need to extract data from PDFs constantly. GumDupe's table recognition feature is a game-changer for my workflow.",
      author: "Michael Chen",
      title: "Senior Analyst, Research Global",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "We integrated GumDupe into our document processing pipeline and reduced our processing time by 75%. The API is robust and reliable.",
      author: "Jessica Williams",
      title: "CTO, DocFlow Systems",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Trusted by Industry Leaders</h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            See how GumDupe is transforming document processing workflows across industries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <QuoteIcon className="h-8 w-8 text-purple-400 mb-4" />
                <p className="text-lg mb-6">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="mr-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.author}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
