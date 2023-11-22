import { MarkerType } from "reactflow";

export const nodes = [
  {
    id: "1",
    type: "node",
    data: { heading: "Database Entity", content: "Click to edit text" },
    position: { x: 50, y: 200 }
  },
  {
    id: "2",
    type: "node",
    data: { heading: "Send Message", content: "click to edit text" },
    position: { x: 300, y: 100 }
  },
  {
    id: "3",
    type: "node",
    data: { heading: "Send Message", content: "click to edit text" },
    position: { x: 500, y: 100 }
  }
];

export const edges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    // label: "this is an edge label",
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    // label: "this is an edge label",
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    // label: "this is an edge label",
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  }
 
];
