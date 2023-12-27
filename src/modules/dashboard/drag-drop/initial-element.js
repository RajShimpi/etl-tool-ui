import { MarkerType } from "reactflow";
import Folder from "../../masters/popup/add-folder";
import Edit from "../../masters/popup/edit-file";
import Delete from "../../masters/popup/delete";

export const nodes = [
  {
    id: "1",
    type: "node",
    data: { heading: "Database Entity", content: "Click to edit text", img: require("../../../assets/Images/file1.png"), comp: <Folder /> },
    position: { x: 50, y: 200 },
  },
  {
    id: "2",
    type: "node",
    data: { heading: "Send Message", content: "click to edit text", img: require("../../../assets/Images/Files-PNG-Clipart.png"), comp: <Edit /> },
    position: { x: 300, y: 0 }
  },
  {
    id: "3",
    type: "node",
    data: { heading: "Send Message", content: "click to edit text", img: require("../../../assets/Images/file3.png"), comp: <Delete /> },
    position: { x: 500, y: 100 },
  },
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
    },
    style: { stroke: getlabelColor("ok") }
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    type: "step",
    label: "error",
    markerEnd: {
      type: MarkerType.ArrowClosed
    },
    style: { stroke: getlabelColor("error") }
  },
  {
    id: "e2-3",
    source: "2",
    type: "step",
    target: "3",
    label: "ok",
    markerEnd: {
      type: MarkerType.ArrowClosed
    },
    style: { stroke: getlabelColor("ok") }
  }
];
function getlabelColor(label) {
  return label === "ok" ? "green" : label === "error" ? "red" : "black";
}
