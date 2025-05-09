"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ArrowUpDown } from "lucide-react"

interface TableRowProps {
  id: string
  values: Record<string, string>
}

interface DataTableProps {
  headers: string[]
  rows: TableRowProps[]
}

export function DataTable({ headers, rows }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: "asc" | "desc"
  } | null>(null)

  // Filter rows based on search term
  const filteredRows = rows.filter((row) => {
    const values = Object.values(row.values || {})

    return values.some((value) => value.toLowerCase().includes(searchTerm.toLowerCase()))
  })

  // Sort rows based on sort config
  const sortedRows = [...filteredRows].sort((a, b) => {
    if (!sortConfig) return 0

    const aValue = a.values[sortConfig.key] || ""
    const bValue = b.values[sortConfig.key] || ""

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1
    }
    return 0
  })

  // Handle sorting
  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc"

    if (sortConfig && sortConfig.key === key) {
      direction = sortConfig.direction === "asc" ? "desc" : "asc"
    }

    setSortConfig({ key, direction })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search data..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="ml-auto text-sm text-muted-foreground">
          {filteredRows.length} {filteredRows.length === 1 ? "row" : "rows"}
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header) => (
                <TableHead key={header}>
                  <Button
                    variant="ghost"
                    className="p-0 font-medium flex items-center gap-1 hover:bg-transparent"
                    onClick={() => handleSort(header)}
                  >
                    {header}
                    {sortConfig?.key === header && <ArrowUpDown className="h-3 w-3" />}
                  </Button>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedRows.length > 0 ? (
              sortedRows.map((row) => (
                <TableRow key={row.id}>
                  {headers.map((header) => (
                    <TableCell key={`${row.id}-${header}`}>{row.values[header] || ""}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={headers.length} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
