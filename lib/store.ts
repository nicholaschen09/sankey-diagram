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
  updateLinkValue: (linkIndex: number, newValue: number) => void
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
      name: "Basic Flow",
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
    {
      name: "Energy Flow",
      nodes: [
        { name: "Solar" },
        { name: "Wind" },
        { name: "Grid" },
        { name: "Residential" },
        { name: "Commercial" },
        { name: "Industrial" }
      ],
      links: [
        { source: 0, target: 2, value: 50 },
        { source: 1, target: 2, value: 30 },
        { source: 2, target: 3, value: 35 },
        { source: 2, target: 4, value: 25 },
        { source: 2, target: 5, value: 20 }
      ]
    },
    {
      name: "Website Traffic",
      nodes: [
        { name: "Direct" },
        { name: "Search" },
        { name: "Social" },
        { name: "Landing Page" },
        { name: "Product Page" },
        { name: "Cart" },
        { name: "Checkout" },
        { name: "Purchase" }
      ],
      links: [
        { source: 0, target: 3, value: 1000 },
        { source: 1, target: 3, value: 2000 },
        { source: 2, target: 3, value: 500 },
        { source: 3, target: 4, value: 2500 },
        { source: 4, target: 5, value: 1000 },
        { source: 5, target: 6, value: 500 },
        { source: 6, target: 7, value: 300 }
      ]
    },
    {
      name: "Budget Allocation",
      nodes: [
        { name: "Income" },
        { name: "Savings" },
        { name: "Housing" },
        { name: "Food" },
        { name: "Transport" },
        { name: "Entertainment" }
      ],
      links: [
        { source: 0, target: 1, value: 2000 },
        { source: 0, target: 2, value: 1500 },
        { source: 0, target: 3, value: 800 },
        { source: 0, target: 4, value: 500 },
        { source: 0, target: 5, value: 400 }
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
  },
  updateLinkValue: (linkIndex: number, newValue: number) => {
    const { currentData, savedData } = get()
    const currentIndex = savedData.findIndex(d => d === currentData)

    if (currentIndex === -1 || linkIndex >= currentData.links.length) return

    const updatedLinks = [...currentData.links]
    updatedLinks[linkIndex] = { ...updatedLinks[linkIndex], value: newValue }

    const updatedData = { ...currentData, links: updatedLinks }
    const updatedSavedData = [...savedData]
    updatedSavedData[currentIndex] = updatedData

    set({ currentData: updatedData, savedData: updatedSavedData })
  }
}))
