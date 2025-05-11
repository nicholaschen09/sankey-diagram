"use client"

import { useDataStore } from "@/lib/store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function ValueEditor() {
    const { currentData, updateLinkValue, updateNodeName, updateDatasetName } = useDataStore()

    if (!currentData.nodes.length) return null

    return (
        <Card className="w-[300px]">
            <CardHeader>
                <div className="space-y-2">
                    <Label>Dataset Name</Label>
                    <Input
                        value={currentData.name || ""}
                        onChange={(e) => updateDatasetName(e.target.value)}
                        placeholder="Enter dataset name"
                    />
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <h3 className="font-medium">Node Names</h3>
                    {currentData.nodes.map((node, index) => (
                        <div key={index} className="space-y-2">
                            <Label>Node {index + 1}</Label>
                            <Input
                                value={node.name}
                                onChange={(e) => updateNodeName(index, e.target.value)}
                                placeholder="Enter node name"
                            />
                        </div>
                    ))}
                </div>

                <Separator />

                <div className="space-y-4">
                    <h3 className="font-medium">Connection Values</h3>
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
                </div>
            </CardContent>
        </Card>
    )
} 