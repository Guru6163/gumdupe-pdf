import { Heading } from "@/components/ui/heading"
import { DashboardNav } from "@/components/dashboard-nav"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, Download, Trash2 } from "lucide-react"
import Link from "next/link"

// Mock data for extraction history
const extractionHistory = [
  {
    id: "ext_001",
    filename: "invoice-may-2025.pdf",
    date: "2025-05-08T14:30:00Z",
    status: "Completed",
  },
  {
    id: "ext_002",
    filename: "financial-report-q1.pdf",
    date: "2025-05-07T10:15:00Z",
    status: "Completed",
  },
  {
    id: "ext_003",
    filename: "customer-data.pdf",
    date: "2025-05-05T16:45:00Z",
    status: "Completed",
  },
  {
    id: "ext_004",
    filename: "inventory-list.pdf",
    date: "2025-05-03T09:20:00Z",
    status: "Completed",
  },
]

export default function HistoryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardNav />
        <main className="flex-1 p-6 md:p-10">
          <div className="space-y-6">
            <Heading title="Extraction History" description="View and manage your previous extractions" />

            <Card>
              <CardHeader>
                <CardTitle>Recent Extractions</CardTitle>
                <CardDescription>A list of all your PDF extractions from the past 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Filename</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {extractionHistory.map((extraction) => (
                      <TableRow key={extraction.id}>
                        <TableCell className="font-medium">{extraction.filename}</TableCell>
                        <TableCell>{new Date(extraction.date).toLocaleString()}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            {extraction.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/results/${extraction.id}`}>
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Export
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
