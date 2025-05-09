"use client"

import { useState } from "react"
import { Download, Copy, FileJson, FileSpreadsheet, Check } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface ExportOptionsProps {
  data: any
  filename: string
}

export function ExportOptions({ data, filename }: ExportOptionsProps) {
  const { toast } = useToast()
  const [isCopied, setIsCopied] = useState(false)

  // Convert data to CSV
  const convertToCSV = () => {
    const headers = data.tableHeaders.join(",")
    const rows = data.tableRows.map((row: any) => {
      return data.tableHeaders
        .map((header: string) => {
          // Escape commas and quotes in CSV
          const value = row.values[header] || ""
          return `"${value.replace(/"/g, '""')}"`
        })
        .join(",")
    })

    return [headers, ...rows].join("\n")
  }

  // Download as CSV
  const downloadCSV = () => {
    const csv = convertToCSV()
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")

    link.setAttribute("href", url)
    link.setAttribute("download", `${filename.replace(".pdf", "")}_data.csv`)
    link.style.visibility = "hidden"

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Download as JSON
  const downloadJSON = () => {
    const jsonData = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonData], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")

    link.setAttribute("href", url)
    link.setAttribute("download", `${filename.replace(".pdf", "")}_data.json`)
    link.style.visibility = "hidden"

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Copy JSON to clipboard
  const copyToClipboard = async () => {
    const jsonData = JSON.stringify(data, null, 2)

    try {
      await navigator.clipboard.writeText(jsonData)
      setIsCopied(true)

      toast({
        title: "Copied to clipboard",
        description: "The data has been copied as JSON",
      })

      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  // Export to Google Sheets
  const exportToGoogleSheets = () => {
    const csv = convertToCSV()
    const encodedCsv = encodeURIComponent(csv)
    const sheetTitle = filename.replace(".pdf", "")

    // Google Sheets URL for creating a new spreadsheet from CSV
    const googleSheetsUrl = `https://docs.google.com/spreadsheets/d/e/2PACX-1vQmWnGyFUDrwkAVQDQPGotS7FhZ_Bf-A9estFcDa3LP7QiCZuGz6oCFsU4Lo_pzMPKEXF00QPPGHYuW/pub?output=csv&gid=0`

    // Open in a new tab
    window.open(googleSheetsUrl, "_blank")

    toast({
      title: "Google Sheets Export",
      description: "Please import the CSV in Google Sheets",
    })
  }

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={downloadCSV}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Download as CSV
          </DropdownMenuItem>
          <DropdownMenuItem onClick={downloadJSON}>
            <FileJson className="mr-2 h-4 w-4" />
            Download as JSON
          </DropdownMenuItem>
          <DropdownMenuItem onClick={exportToGoogleSheets}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export to Google Sheets
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="outline" onClick={copyToClipboard}>
        {isCopied ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Copied
          </>
        ) : (
          <>
            <Copy className="mr-2 h-4 w-4" />
            Copy JSON
          </>
        )}
      </Button>
    </div>
  )
}
