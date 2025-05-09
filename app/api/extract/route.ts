import { type NextRequest, NextResponse } from "next/server"
import { generateObject } from "ai"
import { anthropic } from "@ai-sdk/anthropic"
import { z } from "zod"
import { v4 as uuidv4 } from "uuid"
import { kv } from "@vercel/kv"

// Define the schema for table data
const TableRowSchema = z.object({
  // This is a generic schema - adjust based on your specific needs
  id: z.string(),
  values: z.record(z.string(), z.string()),
})

const ExtractedDataSchema = z.object({
  title: z.string().describe("The title or document name extracted from the PDF"),
  summary: z.string().describe("A brief summary of what this document contains"),
  tableHeaders: z.array(z.string()).describe("The column headers for the extracted table data"),
  tableRows: z.array(TableRowSchema).describe("The rows of data extracted from the PDF"),
  documentType: z.string().describe("The type of document (invoice, report, etc.)"),
  metadata: z.record(z.string(), z.string()).optional().describe("Any additional metadata found in the document"),
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const pdfFile = formData.get("pdf") as File

    if (!pdfFile || pdfFile.type !== "application/pdf") {
      return NextResponse.json({ error: "Please upload a valid PDF file" }, { status: 400 })
    }

    // Generate a unique ID for this extraction
    const extractionId = uuidv4()

    // Process the PDF with Claude
    const result = await generateObject({
      model: anthropic("claude-3-5-sonnet-latest"),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Extract structured data from this PDF. 
              If the PDF contains tables, extract them as structured data.
              If there are multiple tables, focus on the most important one.
              Identify column headers and row data accurately.
              For each row, create a unique ID and organize values by their column headers.`,
            },
            {
              type: "file",
              data: await pdfFile.arrayBuffer(),
              mimeType: "application/pdf",
            },
          ],
        },
      ],
      schema: ExtractedDataSchema,
    })

    // Store the extracted data in KV store
    await kv.set(`extraction:${extractionId}`, {
      filename: pdfFile.name,
      timestamp: new Date().toISOString(),
      data: result.object,
    })

    return NextResponse.json({ id: extractionId })
  } catch (error) {
    console.error("PDF extraction error:", error)
    return NextResponse.json({ error: "Failed to process PDF" }, { status: 500 })
  }
}
