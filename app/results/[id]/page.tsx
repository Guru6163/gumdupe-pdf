import { notFound } from "next/navigation"
import { kv } from "@vercel/kv"
import { Heading } from "@/components/ui/heading"
import { DataTable } from "@/components/data-table"
import { ExportOptions } from "@/components/export-options"

interface ResultsPageProps {
  params: {
    id: string
  }
}

export default async function ResultsPage({ params }: ResultsPageProps) {
  const { id } = params

  
  const { filename, timestamp, data } = extraction as any

  return (
    <main className="container mx-auto mx-auto py-10 px-4 max-w-6xl">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Heading
            title={data.title || "Extracted Data"}
            description={`From ${filename} • ${new Date(timestamp).toLocaleString()}`}
          />
          <ExportOptions data={data} filename={filename} />
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h2 className="font-semibold mb-2">Document Summary</h2>
            <p className="text-sm text-muted-foreground">{data.summary}</p>
          </div>

          {data.metadata && Object.keys(data.metadata).length > 0 && (
            <div className="p-4 bg-muted rounded-lg">
              <h2 className="font-semibold mb-2">Document Metadata</h2>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                {Object.entries(data.metadata).map(([key, value]) => (
                  <div key={key} className="flex">
                    <dt className="font-medium mr-2">{key}:</dt>
                    <dd className="text-muted-foreground">{value as string}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="rounded-md border">
            <DataTable headers={data.tableHeaders} rows={data.tableRows} />
          </div>
        </div>
      </div>
    </main>
  )
}
