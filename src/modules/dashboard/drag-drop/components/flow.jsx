import React, { useCallback, useEffect, useState, useRef } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  // useNodesState,
  // useEdgesState,
  ReactFlowProvider,
  updateEdge,
  useNodeId,
} from "reactflow";

// Components
// import Sidebar from "./sidebar/sidebar";
import Node from "./custom-node/message-node";
import { MarkerType } from "reactflow";
// Utils
import { isAllNodeisConnected } from "../utils";
// import {
//   // nodes as initialNodes,
//   // edges as initialEdges,
// } from "../initial-element";

// Styles
import "reactflow/dist/style.css";
import "./dnd.css";
import "./update-node.css";

// import { Class, Key, Source } from "@mui/icons-material";
// import { data } from "jquery";
// import AddFile from "../../../masters/popup/add-file";
import Modal from "../../../components/modal-popup";
// import { ClassNames } from "@emotion/react";
import Job from "../../../masters/job";
import axios from "../../../services/axios";
import { event, post } from "jquery";
import StepParameter from "../../../masters/popup/step-parameter";

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = { node: Node };

const OverviewFlow = () => {
  const [showNodeMaster, setShowNodeMaster] = useState(false);

  const reactFlowWrapper = useRef(null);
  const edgeUpdateSuccessful = useRef(true);
  const textRef = useRef(null);
  const modalRef = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  // const [node, setNode] = useState([]);
  const [nodes, setNodes, onNodesChange] = useState([]);
  const [edges, setEdges, onEdgesChange] = useState([]);
  // const [edge, setEdge] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [id, setId] = useState();
  const [name,setName]=useState()
  const [draggedNodeInfo, setDraggedNodeInfo] = useState(null);

  const [stepId, setStepId] = useState({ parameter: {} });


  const onInit = (reactFlowInstance) => setReactFlowInstance(reactFlowInstance);
  useEffect(() => {
    axios.getWithCallback("job-steps/", (data) => {
      // console.log(data, "job-step Data");

      const dataNodes = data.map((item) => ({
        id: "" + item.id,
        type: "node",
        data: {
          heading: item.step_name,
          img: `/assets/images/${item.stepType.img}.png`,
          stepType: item.stepType, // Include stepType in the data object
        },
        position: {
          x: item.params.position_X,
          y: item.params.position_Y,
        },
        step_type_id: item.step_type_id
      }));

      // const ids= data.map((ids)=>({
      //   step_type_id:ids.step_type_id
      // }))

      const dataEdgesok = data.map((item) => ({
        id: `e${item.id}-${item.ok_step}`,
        source: "" + item.id,
        target: "" + item.ok_step,
        label: "ok",
        type: "step",
        sourceHandle: "ok",
        markerEnd: { type: MarkerType.ArrowClosed },
        style: { stroke: getlabelColor("ok") },
      }));

      const dataEdgeserror = data.map((item) => ({
        id: `e${item.id}-${item.error_step}`,
        source: "" + item.id,
        target: "" + item.error_step,
        label: "error",
        type: "step",
        sourceHandle: "error",
        markerEnd: { type: MarkerType.ArrowClosed },
        style: { stroke: getlabelColor("error") },
      }));

      setNodes(dataNodes);
      setEdges([...dataEdgesok, ...dataEdgeserror]);

      function getlabelColor(label) {
        return label === "ok" ? "green" : label === "error" ? "red" : "black";
      }
      // const ids = data.map((item) => ({
      //   step_type_id:item.step_type_id
      // }));
      // setId(ids)
      // console.log(ids,"ddddd");


    });
  }, []);
  // console.log(id.step_type_id,"ddddd");

  // console.log(nodes,"nodes");
  // console.log(edges, "edges");

  // useEffect(() => {
  //   axios.getWithCallback('edges/',(data)=>{
  //       const formattedData = data.map((item) => ({
  //         // id: `e${item.source_ok}-${item.target}`,
  //         source_ok: item.source_ok,
  //         source_error: item.source_error,
  //         target: item.target,
  //         type: item.type,
  //         label: item.label,
  //       }));

  //       console.log(formattedData);
  //       setEdge(formattedData);
  //     })
  // }, []);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";

    // const [showNodeMaster, setShowNodeMaster] = useState(false);

    // ... (other state variables and functions)
  };

  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

    const type = event.dataTransfer.getData("application/reactflow");
    // const label = event.dataTransfer.getData("content");
    const img = event.dataTransfer.getData("img");
    const name = event.dataTransfer.getData("name");
    console.log(reactFlowInstance, "reactIns");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    // console.log(type)
    // console.log(label)
    // console.log(name)

    const newNode = {
      id: getId(),
      name,
      type,
      position,
      data: { heading: name, img: img },
    };

    setNodes((es) => es.concat(newNode));
    setSelectedNode((newNode.a = name));
  };
  const onNodeDragStop = (event, node) => {
    const updatedNodes = nodes.map((n) => {
      if (n.id === node.id) {
        return {
          ...n,
          position: { x: node.position.x, y: node.position.y },
        };
      }
      return n;
    });

    setNodes(updatedNodes);
    setDraggedNodeInfo({ id: node.id, position: node.position });
    // console.log(node.position);
    // saveNodePosition(node.id, node.position);
  };

  const saveNodePosition = (nodeId, newPosition) => {
    const data = {
      params: {
        position_X: newPosition.x,
        position_Y: newPosition.y,
      }
    };

    axios.putWithCallback(`job-steps/${nodeId}/update/`, data)
      .then((response) => {
        // console.log("Node position updated successfully:", response.data);
      })
      .catch((error) => {
        // console.error("Error updating node position:", error);
      });
  }; const onConnect = useCallback(
    (params) => {
      const { sourceHandle } = params;

      let label;
      let color;

      if (sourceHandle === "ok") {
        label = "ok";
        color = "green";
      } else {
        label = "error";
        color = "red";
      }

      const newEdge = {
        ...params,
        label,
        type: params.type || "step",
        arrowHeadType: "arrowclosed",
        style: {
          stroke: color,
          backgroundColor: color,
          color: "red",
          fontSize: "12px",
          padding: "4px",
          borderRadius: "4px",
        },
      };

      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const [nodeName, setNodeName] = useState("Node 1");
  // console.log(nodes,"llll")

  useEffect(() => {
    const node = nodes.filter((node) => {
      // console.log(nodes,"nodes Data inside useEffect Filter")
      if (node.selected) return true;
      // console.log(node,"inside node useEffect Filter")
      return false;
    });
    if (node[0]) {
      setSelectedNode(node[0]);
      setIsSelected(true);
    } else {
      setSelectedNode("");
      setIsSelected(false);
    }
  }, [nodes]);

  useEffect(() => {
    setNodeName(selectedNode?.data?.heading || selectedNode);
  }, [selectedNode]);

  useEffect(() => {
    textRef?.current?.focus();
  }, [selectedNode]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode?.id) {
          node.data = {
            ...node.data,
            content: nodeName || " ",
          };
        }
        return node;
      })
    );
  }, [nodeName, setNodes]);

  const saveHandler = () => {
    if (isAllNodeisConnected(nodes, edges)) {
      alert("Congrats its correct");

      nodes.forEach((node) => {
        saveNodePosition(node.id, node.position);
      });
    } else {
      alert("Please connect source nodes (Cannot Save Flow)");
    }
  };

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
    edgeUpdateSuccessful.current = true;
  }, []);

  const onNodeDoubleClick = (event) => {
    // console.log(event);
    setShowNodeMaster(true);
    
  };
  const handleCloseNodeMaster = () => {
    setShowNodeMaster(false);
  };
  const nodeRef = useRef();
  const closeModel = () => {
    setShowNodeMaster(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleCloseNodeMaster();
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event) => handleClickOutside(event);

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [handleCloseNodeMaster, modalRef]);



  const [stepParameters, setStepParameters] = useState([]);

  // useEffect(() => {
  //   const fetchStepData = async () => {
  //     const newStepParameters = [];

  //     for (const node of nodes) {
  //       try {
  //         const response = await axios.get(`step-type-parameter/step-type/${node.step_type_id}`);
  //         // console.log('Received data for node:', node.id, response.data);


  //         newStepParameters.push(response.data.parameter.id);
  //       } catch (error) {
  //         // console.error('Error fetching data:', error);

  //       }
  //     }

  //     // setStepParameters(node.step_type_id);
  //   };

  //   fetchStepData();
  // }, [nodes]);


//   console.log(stepParameters, "step parameter data");
// const nodeId= useNodeId();

const nodeId = (node)=>{
  setName(node.data.heading,"Node Id");
  setId(node.step_type_id)

}

// console.log(nodes[1]?.data?.heading, "id");

  return (
    <>
      <button onClick={saveHandler}>Save</button>
      <div className="dndflow">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={onInit}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onEdgeUpdate={onEdgeUpdate}
              onEdgeUpdateStart={onEdgeUpdateStart}
              onEdgeUpdateEnd={onEdgeUpdateEnd}
              attributionPosition="top  -right"
              onNodeDoubleClick={onNodeDoubleClick}
              onEdgeDoubleClick={true}
              onNodeDragStop={onNodeDragStop}
              onNodeClick={(event,node)=> nodeId(node)}
            >
              <Background color="#aaa" gap={16} />
              {/* <Controls /> */}
            </ReactFlow>

            <Modal modalTitle={"Save/Update Parameter"} ref={modalRef} handleClose={handleCloseNodeMaster} show={showNodeMaster}>
            <StepParameter
                stepId={id}
                name={name}
              />
            </Modal>

          </div>

          {/* 
          <Sidebar
            isSelected={isSelected}
            textRef={textRef}
            nodeName={nodeName}
            setNodeName={setNodeName}
          /> */}
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default OverviewFlow;

