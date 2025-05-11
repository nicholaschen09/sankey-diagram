"use client"

import { useState } from "react"
import { useDataStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { validateSankeyData } from "@/lib/validate-data"

export function DataInput() {
  const { addSavedData } = useDataStore()
  const [jsonInput, setJsonInput] = useState("")
  const [csvInput, setCsvInput] = useState("")
  const [error, setError] = useState("")
  const [open, setOpen] = useState(false)

  const handleJsonSubmit = () => {
    setError("")
    try {
      const data = JSON.parse(jsonInput)
      const validationResult = validateSankeyData(data)

      if (validationResult.valid) {
        addSavedData(data)
        setOpen(false)
      } else {
        setError(validationResult.error || "Invalid data format")
      }
    } catch (e) {
      setError("Invalid JSON format. Please check your input.")
    }
  }

  const handleCsvSubmit = () => {
    setError("")
    try {
      // Basic CSV parsing for source,target,value format
      const lines = csvInput.trim().split("\n")
      const nodes = new Set<string>()
      const links: any[] = []

      lines.forEach((line, index) => {
        if (index === 0 && line.toLowerCase().includes("source") && line.toLowerCase().includes("target")) {
          // Skip header row
          return
        }

        const parts = line.split(",").map((part) => part.trim())
        if (parts.length < 3) {
          throw new Error(`Line ${index + 1}: Each line must have source, target, and value`)
        }

        const [source, target, valueStr] = parts
        const value = Number(valueStr)

        if (isNaN(value)) {
          throw new Error(`Line ${index + 1}: Value must be a number`)
        }

        nodes.add(source)
        nodes.add(target)
        links.push({ source, target, value })
      })

      const data = {
        nodes: Array.from(nodes).map((name) => ({ name })),
        links,
      }

      addSavedData(data)
      setOpen(false)
    } catch (e: any) {
      setError(e.message || "Invalid CSV format. Please check your input.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Input Custom Data</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Input Custom Data</DialogTitle>
          <DialogDescription>Enter your Sankey diagram data in JSON or CSV format.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="json" className="mt-4">
          <TabsList>
            <TabsTrigger value="json">JSON</TabsTrigger>
            <TabsTrigger value="csv">CSV</TabsTrigger>
          </TabsList>

          <TabsContent value="json" className="space-y-4">
            <div className="space-y-2">
              <Textarea
                placeholder={`{
  "nodes": [
    { "name": "Node 1" },
    { "name": "Node 2" },
    { "name": "Node 3" }
  ],
  "links": [
    { "source": "Node 1", "target": "Node 2", "value": 100 },
    { "source": "Node 1", "target": "Node 3", "value": 50 }
  ]
}`}
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button onClick={handleJsonSubmit}>Apply JSON Data</Button>
          </TabsContent>

          <TabsContent value="csv" className="space-y-4">
            <div className="space-y-2">
              <Textarea
                placeholder={`source,target,value
Node 1,Node 2,100
Node 1,Node 3,50
Node 2,Node 3,25`}
                value={csvInput}
                onChange={(e) => setCsvInput(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button onClick={handleCsvSubmit}>Apply CSV Data</Button>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
