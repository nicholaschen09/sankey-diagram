"use client"

import { useState, useEffect } from "react"
import { ResponsiveContainer, Sankey, Tooltip, Rectangle, Layer } from "recharts"
import { useDataStore } from "@/lib/store"
import { CustomTooltip } from "./custom-tooltip"
import { DataInput } from "./data-input"

export function SankeyDiagram() {
  const { currentData } = useDataStore()
  const [windowReady, setWindowReady] = useState(false)

  useEffect(() => {
    setWindowReady(true)
  }, [])

  if (!windowReady) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse text-gray-400">Loading diagram...</div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Diagram View</h2>
        <DataInput />
      </div>

      {currentData.nodes.length > 0 ? (
        <div className="flex-1 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <Sankey
              data={currentData}
              nodePadding={50}
              nodeWidth={10}
              linkCurvature={0.5}
              iterations={64}
              link={{ stroke: "#d1d5db" }}
              node={<CustomNode />}
            >
              <Tooltip content={<CustomTooltip />} />
              <Layer />
            </Sankey>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-400">No data available. Please select a sample dataset or input your own data.</div>
        </div>
      )}
    </div>
  )
}

function CustomNode(props: any) {
  const { x, y, width, height, index, payload, containerWidth } = props
  const isRight = x > containerWidth / 2

  return (
    <g>
      <Rectangle x={x} y={y} width={width} height={height} fill={payload.color || "#8884d8"} fillOpacity="0.9" />
      <text
        textAnchor={isRight ? "start" : "end"}
        x={isRight ? x + width + 6 : x - 6}
        y={y + height / 2}
        fontSize={12}
        fill="#333"
        dominantBaseline="middle"
      >
        {payload.name}
      </text>
    </g>
  )
}
