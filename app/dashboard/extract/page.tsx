import { Uploader } from "@/components/uploader"
import { Heading } from "@/components/ui/heading"
import { DashboardNav } from "@/components/dashboard-nav"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ExtractPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardNav />
        <main className="flex-1 p-6 md:p-10">
          <div className="space-y-6">
            <Heading title="Extract PDF Data" description="Upload a PDF to extract structured data" />

            <Card className="border-2">
              <CardHeader>
                <CardTitle>PDF Data Extractor</CardTitle>
                <CardDescription>Upload your PDF document to extract tables, text, and structured data</CardDescription>
              </CardHeader>
              <CardContent>
                <Uploader />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
