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
  setCurrentData: (data: SankeyData) => void
}

export const useDataStore = create<DataStore>((set) => ({
  currentData: { nodes: [], links: [] },
  setCurrentData: (data) => set({ currentData: data }),
}))
