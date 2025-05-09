'use client'
import { Uploader } from "@/components/uploader"
import { Heading } from "@/components/ui/heading"
import { DashboardNav } from "@/components/dashboard-nav"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Clock, BarChart3 } from "lucide-react"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  const [count,setCount] = useState<number>(0)
  interface RecentData {
    timestamp?: string;
  }

  const [recent, setRecent] = useState<RecentData>({})

  useEffect(()=>{
    const data = JSON.parse(window.localStorage.getItem('pdf_extractions') || '[]')

    setCount(data?.length)
    setRecent(data[data.length - 1] || {})

    console.log(recent)
  },[])
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardNav />
        <main className="flex-1 p-6 md:p-10">
          <div className="space-y-6">
            <Heading title="Dashboard" description="Extract and manage your PDF data" />

            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Extractions</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{count}</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                 <div className="text-2xl font-bold">
  {recent.timestamp ? new Date(recent.timestamp).toLocaleDateString() : "N/A"}
</div>

                  <p className="text-xs text-muted-foreground">Last extraction performed</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Usage</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12/25</div>
                  <p className="text-xs text-muted-foreground">Extractions used this month</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Extract PDF Data</CardTitle>
                <CardDescription>Upload a PDF to extract structured data using AI</CardDescription>
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
