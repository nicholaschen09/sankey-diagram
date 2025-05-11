"use client"

import { useState } from "react"
import { useDataStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { sampleDatasets } from "@/lib/sample-data"

export function SampleDataSelector() {
  const { setCurrentData } = useDataStore()
  const [selectedDataset, setSelectedDataset] = useState<string>("")

  const handleSelectDataset = (value: string) => {
    setSelectedDataset(value)
    if (value && sampleDatasets[value]) {
      setCurrentData(sampleDatasets[value])
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="w-full sm:w-64">
        <Select value={selectedDataset} onValueChange={handleSelectDataset}>
          <SelectTrigger>
            <SelectValue placeholder="Select a sample dataset" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(sampleDatasets).map((key) => (
              <SelectItem key={key} value={key}>
                {sampleDatasets[key].name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (selectedDataset) {
              setCurrentData(sampleDatasets[selectedDataset])
            }
          }}
          disabled={!selectedDataset}
        >
          Load Sample
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSelectedDataset("")
            setCurrentData({ nodes: [], links: [] })
          }}
        >
          Clear
        </Button>
      </div>
    </div>
  )
}
