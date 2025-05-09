'use client'

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Heading } from "@/components/ui/heading"
import { DataTable } from "@/components/data-table"
import { ExportOptions } from "@/components/export-options"

export default function ResultsPage() {
  const params = useParams()
  const id = params?.id as string

  const [data, setData] = useState<any>(null)

  useEffect(() => {
    if (!id) return
    // fetch or load data here
    const saved = localStorage.getItem("pdf_extractions")
    if (saved) {
      const history = JSON.parse(saved)
      const match = history.find((item: any) => item.id === id)
      setData(match)
    }
  }, [id])

  if (!data) {
    return <div className="p-10 text-muted-foreground">No data found.</div>
  }

  const { fileName, timestamp, summary, metadata, data: tableRows } = data
  const headers = tableRows.length > 0 ? Object.keys(tableRows[0]) : []



  return (
    <main className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Heading
            title="Extracted Data"
            description={`From ${fileName} • ${new Date(timestamp).toLocaleString()}`}
          />
          <ExportOptions data={tableRows} filename={fileName} />
        </div>

        {summary && (
          <div className="p-4 bg-muted rounded-lg">
            <h2 className="font-semibold mb-2">Document Summary</h2>
            <p className="text-sm text-muted-foreground">{summary}</p>
          </div>
        )}

        {metadata && Object.keys(metadata).length > 0 && (
          <div className="p-4 bg-muted rounded-lg">
            <h2 className="font-semibold mb-2">Document Metadata</h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {Object.entries(metadata).map(([key, value]) => (
                <div key={key} className="flex">
                  <dt className="font-medium mr-2">{key}:</dt>
                  <dd className="text-muted-foreground">{value as string}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <div className="rounded-md border">
        <DataTable
  headers={headers}
  rows={tableRows.map((row, index) => ({
    id: `${index}`,
    values: row
  }))}
/>


        </div>
      </div>
    </main>
  )
}
