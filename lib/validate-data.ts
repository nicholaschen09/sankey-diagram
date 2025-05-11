export function validateSankeyData(data: any): { valid: boolean; error?: string } {
  // Check if data has nodes and links arrays
  if (!data.nodes || !Array.isArray(data.nodes)) {
    return { valid: false, error: "Data must contain a 'nodes' array" }
  }

  if (!data.links || !Array.isArray(data.links)) {
    return { valid: false, error: "Data must contain a 'links' array" }
  }

  // Check if nodes have required properties
  for (let i = 0; i < data.nodes.length; i++) {
    const node = data.nodes[i]
    if (!node.name && typeof node.name !== "string") {
      return { valid: false, error: `Node at index ${i} must have a 'name' property` }
    }
  }

  // Check if links have required properties
  for (let i = 0; i < data.links.length; i++) {
    const link = data.links[i]

    if (!link.source && link.source !== 0) {
      return { valid: false, error: `Link at index ${i} must have a 'source' property` }
    }

    if (!link.target && link.target !== 0) {
      return { valid: false, error: `Link at index ${i} must have a 'target' property` }
    }

    if (typeof link.value !== "number" || isNaN(link.value)) {
      return { valid: false, error: `Link at index ${i} must have a numeric 'value' property` }
    }
  }

  return { valid: true }
}
