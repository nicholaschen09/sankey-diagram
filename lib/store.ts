"use client"

import { create } from "zustand"

export type SankeyNode = {
  name: string
  color?: string
}

export type SankeyLink = {
  source: string | number
  target: string | number
  value: number
}

export type SankeyData = {
  nodes: SankeyNode[]
  links: SankeyLink[]
  name?: string
}

type DataStore = {
  currentData: SankeyData
  savedData: SankeyData[]
  setCurrentData: (data: SankeyData) => void
  addSavedData: (data: SankeyData) => void
  selectSavedData: (index: number) => void
}

export const useDataStore = create<DataStore>((set, get) => ({
  currentData: {
    nodes: [
      { name: "Source A" },
      { name: "Source B" },
      { name: "Intermediate" },
      { name: "Target D" },
      { name: "Target E" }
    ],
    links: [
      { source: 0, target: 2, value: 10 },
      { source: 1, target: 2, value: 5 },
      { source: 2, target: 3, value: 8 },
      { source: 2, target: 4, value: 7 }
    ]
  },
  savedData: [
    {
      nodes: [
        { name: "Source A" },
        { name: "Source B" },
        { name: "Intermediate" },
        { name: "Target D" },
        { name: "Target E" }
      ],
      links: [
        { source: 0, target: 2, value: 10 },
        { source: 1, target: 2, value: 5 },
        { source: 2, target: 3, value: 8 },
        { source: 2, target: 4, value: 7 }
      ]
    }
  ],
  setCurrentData: (data) => set({ currentData: data }),
  addSavedData: (data) => set((state) => ({
    savedData: [...state.savedData, data],
    currentData: data
  })),
  selectSavedData: (index) => {
    const data = get().savedData[index]
    if (data) set({ currentData: data })
  }
}))
