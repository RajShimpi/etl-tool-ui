import { MarkerType } from "reactflow";

// import { style } from "./message-node-styles";

export const nodes = [
  {
    id: "1",
    type: "node",
    data: { heading: "Database Entity", content: "Click to edit text",img:"https://www.nicepng.com/png/full/139-1394852_download-for-free-at-icons8-view-document-icon.png" },
    position: { x: 50, y: 200 },
    // img: {img:"https://www.picng.com/upload/cv/png_cv_87849.png"}
  },
  {
    id: "2",
    type: "node",
    data: { heading: "Send Message", content: "click to edit text",img:"https://www.pngall.com/wp-content/uploads/2018/05/Files-PNG-Clipart.png" },
    position: { x: 300, y: 100 }
  },
  {
    id: "3",
    type: "node",
    data: { heading: "Send Message", content: "click to edit text",img:"https://icones.pro/wp-content/uploads/2021/06/icone-fichier-document-rouge.png" },
    position: { x: 500, y: 100 }
  }
];

export const edges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "step",
    label: "ok",
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    type: "step",
    label: "error",
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  },
  {
    id: "e2-3",
    source: "2",
    type: "step",
    target: "3",
    label: "ok",
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  }
 
];
