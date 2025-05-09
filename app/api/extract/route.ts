import { type NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const pdfFile = formData.get("pdf") as File;

    if (!pdfFile || pdfFile.type !== "application/pdf") {
      return NextResponse.json({ error: "Please upload a valid PDF file" }, { status: 400 });
    }

    // Convert the PDF file into an ArrayBuffer
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdfData = await pdfParse(Buffer.from(arrayBuffer));

    // Use OpenAI to extract structured data from the PDF text
    const result = await openai.chat.completions.create({
      model: "gpt-4",  // You can choose any OpenAI model, such as GPT-4
      messages: [
        {
          role: "system",
          content:
            "You are a document parser. Extract any table or tabular data you find in the document and return it in structured JSON format with two keys: Headers: an array of column names Rows: an array of arrays, where each sub-array represents one row of data",
        },
        {
          role: "user",
          content: pdfData.text,  // Pass the extracted text from the PDF
        },
      ],
    });

    // Extracted data from OpenAI
    const extractedData = result.choices[0].message.content;

    if (typeof extractedData === "string") {
      console.log(JSON.parse(extractedData))
      return NextResponse.json({ data: JSON.parse(extractedData) })
    }

    return NextResponse.json({ data: extractedData });

  } catch (error) {
    console.error("Error processing PDF:", error);
    return NextResponse.json({ error: "Failed to process PDF" }, { status: 500 });
  }
}
