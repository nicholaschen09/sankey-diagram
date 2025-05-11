"use client"

import { useDataStore } from "@/lib/store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ValueEditor() {
    const { currentData, updateLinkValue } = useDataStore()

    if (!currentData.nodes.length) return null

    return (
        <Card className="w-[300px]">
            <CardHeader>
                <CardTitle>Edit Values</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {currentData.links.map((link, index) => {
                    const sourceNode = currentData.nodes[typeof link.source === 'number' ? link.source : 0]
                    const targetNode = currentData.nodes[typeof link.target === 'number' ? link.target : 0]

                    return (
                        <div key={index} className="space-y-2">
                            <Label>
                                {sourceNode.name} → {targetNode.name}
                            </Label>
                            <Input
                                type="number"
                                min="0"
                                value={link.value}
                                onChange={(e) => {
                                    const newValue = parseFloat(e.target.value)
                                    if (!isNaN(newValue) && newValue >= 0) {
                                        updateLinkValue(index, newValue)
                                    }
                                }}
                            />
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    )
} 