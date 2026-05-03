import { createSignal, Accessor, Setter } from "solid-js";
import { Direction, IPanelNode, PanelConstraints, ResizeMode } from "../types";

export class PanelNode implements IPanelNode {
  id: string;
  size: Accessor<number>;
  setSize: Setter<number>;
  isCollapsed: Accessor<boolean>;
  setCollapsed: Setter<boolean>;
  constraints: PanelConstraints;

  constructor(id: string, initialSize: number, constraints: PanelConstraints = {}) {
    this.id = id;
    const [size, setSize] = createSignal(initialSize);
    const [collapsed, setCollapsed] = createSignal(false);
    this.size = size;
    this.setSize = setSize;
    this.isCollapsed = collapsed;
    this.setCollapsed = setCollapsed;
    this.constraints = constraints;
  }
}

export interface ResizeContext {
  containerSize: number;
  direction: Direction;
  nodes: IPanelNode[];
  mode?: ResizeMode;
}

export function calculateResize(
  context: ResizeContext,
  index: number, // Index of the handle (between index and index + 1)
  delta: number // Delta in pixels
) {
  const { containerSize, nodes, mode = "sibling" } = context;
  if (containerSize <= 0) return;

  const deltaPercentage = (delta / containerSize) * 100;

  if (mode === "independent") {
    const activeNode = nodes[index];
    if (!activeNode) return;

    let newSize = activeNode.size() + deltaPercentage;
    const min = activeNode.constraints.minSize ?? 0;
    const max = activeNode.constraints.maxSize ?? 100;

    // Check if we can actually shrink the subsequent nodes enough
    const subsequentNodes = nodes.slice(index + 1);
    const sumSubsequent = subsequentNodes.reduce((acc, n) => acc + n.size(), 0);

    // We can't grow more than the space available in subsequent nodes
    // and we can't shrink below minSize. 
    // For simplicity, let's just cap newSize so remaining is >= 0
    if (newSize > activeNode.size() + sumSubsequent) {
      newSize = activeNode.size() + sumSubsequent;
    }
    if (newSize < min) newSize = min;
    if (newSize > max) newSize = max;

    const actualDelta = newSize - activeNode.size();
    if (actualDelta === 0) return;

    activeNode.setSize(newSize);

    // Distribute actualDelta among subsequent nodes
    if (sumSubsequent > 0) {
      const remainingAfter = sumSubsequent - actualDelta;
      const scale = remainingAfter / sumSubsequent;
      subsequentNodes.forEach(n => n.setSize(n.size() * scale));
    }
    return;
  }

  // Sibling mode (default)
  const prevNode = nodes[index];
  const nextNode = nodes[index + 1];

  if (!prevNode || !nextNode) return;

  let newPrevSize = prevNode.size() + deltaPercentage;
  let newNextSize = nextNode.size() - deltaPercentage;

  // Apply constraints
  const prevMin = prevNode.constraints.minSize ?? 0;
  const prevMax = prevNode.constraints.maxSize ?? 100;
  const nextMin = nextNode.constraints.minSize ?? 0;
  const nextMax = nextNode.constraints.maxSize ?? 100;

  if (newPrevSize < prevMin) {
    const diff = prevMin - newPrevSize;
    newPrevSize = prevMin;
    newNextSize -= diff;
  } else if (newPrevSize > prevMax) {
    const diff = newPrevSize - prevMax;
    newPrevSize = prevMax;
    newNextSize += diff;
  }

  if (newNextSize < nextMin) {
    const diff = nextMin - newNextSize;
    newNextSize = nextMin;
    newPrevSize -= diff;
  } else if (newNextSize > nextMax) {
    const diff = newNextSize - nextMax;
    newNextSize = nextMax;
    newPrevSize += diff;
  }

  // Final check to ensure we don't go out of bounds (shouldn't happen with math above but still)
  if (newPrevSize >= 0 && newNextSize >= 0) {
    prevNode.setSize(newPrevSize);
    nextNode.setSize(newNextSize);
  }
}
