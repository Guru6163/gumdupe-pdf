"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, FileUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function Uploader() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)

    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval)
          return prev
        }
        return prev + 5
      })
    }, 200)

    try {
      const formData = new FormData()
      formData.append("pdf", file)

      const response = await fetch("/api/extract", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to process PDF")
      }

      const { id } = await response.json()

      // Complete progress
      setUploadProgress(100)

      // Navigate to results page
      setTimeout(() => {
        router.push(`/results/${id}`)
      }, 500)
    } catch (error) {
      console.error("Error uploading file:", error)
      setUploadProgress(0)
    } finally {
      clearInterval(progressInterval)
      setIsUploading(false)
    }
  }

  return (
    <Card
      className={`p-10 border-2 border-dashed ${
        isDragging ? "border-primary bg-muted/50" : "border-muted-foreground/25"
      } rounded-lg text-center`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="p-3 bg-primary/10 rounded-full">
          <Upload className="h-10 w-10 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Drag & drop your PDF here</h3>
          <p className="text-sm text-muted-foreground">or click to browse files (max 10MB)</p>
        </div>
        <input type="file" id="file-upload" className="hidden" accept="application/pdf" onChange={handleFileChange} />
        <label htmlFor="file-upload">
          <Button variant="outline" className="cursor-pointer" as="span">
            Browse files
          </Button>
        </label>

        {file && (
          <div className="mt-4 w-full max-w-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <FileUp className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium truncate max-w-[200px]">{file.name}</span>
              </div>
              <span className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>

            {isUploading ? (
              <div className="space-y-2">
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-xs text-muted-foreground text-right">{uploadProgress}% uploaded</p>
              </div>
            ) : (
              <Button onClick={handleUpload} className="w-full mt-2">
                Process PDF
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
