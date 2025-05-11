# Sankey Diagram Editor

This project is a web-based Sankey diagram editor built with Next.js, React, Zustand, and Recharts. It allows you to visualize, edit, and manage multiple Sankey datasets interactively.

## Features
- View and switch between multiple sample Sankey datasets
- Input custom data in JSON or CSV format
- Edit dataset names, node names, and connection values in real time
- All changes are instantly reflected in the diagram
- Responsive and user-friendly UI

## Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- npm

### Installation
```bash
npm install
```

### Running the App
```bash
npm run dev
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
- **Switch Datasets:** Use the dropdown to select a sample or custom dataset.
- **Edit Dataset Name:** Change the dataset name in the right panel; the title updates instantly.
- **Edit Node Names:** Change any node name in the right panel; the diagram updates live.
- **Edit Connection Values:** Change any value in the right panel; the diagram updates live.
- **Input Custom Data:** Click "Input Custom Data" to add your own dataset in JSON or CSV format.

## Data Format
### JSON Example
```json
{
  "nodes": [
    { "name": "Source" },
    { "name": "Target" }
  ],
  "links": [
    { "source": "Source", "target": "Target", "value": 10 }
  ]
}
```
- `source` and `target` can be node names or indices.

### CSV Example
```
source,target,value
A,B,10
B,C,5
```

## Tech Stack
- Next.js
- React
- Zustand (state management)
- Recharts (Sankey diagram)
- Tailwind CSS (styling)

## License
MIT 