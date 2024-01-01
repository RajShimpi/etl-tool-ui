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
 
];


