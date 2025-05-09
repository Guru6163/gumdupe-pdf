import { FileText, Table, Download, Zap, Shield, BarChart3, FileSpreadsheet, Database } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: <FileText className="h-10 w-10 text-purple-600" />,
      title: "PDF Text Extraction",
      description: "Extract text from any PDF document with high accuracy, preserving the original formatting.",
    },
    {
      icon: <Table className="h-10 w-10 text-purple-600" />,
      title: "Table Recognition",
      description: "Automatically detect and extract tables from PDFs, converting them into structured data.",
    },
    {
      icon: <Download className="h-10 w-10 text-purple-600" />,
      title: "Multiple Export Formats",
      description: "Export your data in CSV, JSON, or directly to Google Sheets for immediate use.",
    },
    {
      icon: <Zap className="h-10 w-10 text-purple-600" />,
      title: "Lightning Fast",
      description: "Process documents in seconds, not minutes, with our optimized AI extraction engine.",
    },
    {
      icon: <Shield className="h-10 w-10 text-purple-600" />,
      title: "Secure Processing",
      description: "Your documents are processed securely and never stored longer than necessary.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-purple-600" />,
      title: "Data Analytics",
      description: "Analyze extracted data with built-in visualization tools to gain insights instantly.",
    },
    {
      icon: <FileSpreadsheet className="h-10 w-10 text-purple-600" />,
      title: "Template Matching",
      description: "Create templates for recurring document types to ensure consistent extraction results.",
    },
    {
      icon: <Database className="h-10 w-10 text-purple-600" />,
      title: "Batch Processing",
      description: "Process multiple documents at once to save time on large-scale extraction tasks.",
    },
  ]

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Powerful Features for PDF Data Extraction
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Extract, transform, and utilize data from any PDF document with our comprehensive toolkit
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
