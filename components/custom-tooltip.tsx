"use client"

export function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const data = payload[0].payload

    return (
      <div className="bg-white p-3 shadow-md rounded-md border border-gray-200 max-w-xs">
        <p className="font-medium text-sm">{`${data.source?.name || "Source"} → ${data.target?.name || "Target"}`}</p>
        <p className="text-gray-700 text-sm mt-1">
          Value: <span className="font-semibold">{data.value.toLocaleString()}</span>
        </p>
      </div>
    )
  }

  return null
}
