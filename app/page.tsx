import { SankeyDiagram } from "@/components/sankey-diagram"
import { SampleDataSelector } from "@/components/sample-data-selector"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Sankey Diagram Visualizer</h1>
          <p className="text-gray-600 max-w-3xl">
            Visualize flows and transfers between nodes with interactive Sankey diagrams. Select a sample dataset or
            input your own data to create custom visualizations.
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <SampleDataSelector />
          <div className="mt-6 h-[600px]">
            <SankeyDiagram />
          </div>
        </div>
      </div>
    </main>
  )
}
