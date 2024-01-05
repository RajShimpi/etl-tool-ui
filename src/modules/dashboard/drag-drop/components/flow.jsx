import React, { useCallback, useEffect, useState, useRef } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  // useNodesState,
  // useEdgesState,
  ReactFlowProvider,
  updateEdge,
} from "reactflow";

// Components
// import Sidebar from "./sidebar/sidebar";
import Node from "./custom-node/message-node";
import { MarkerType } from "reactflow";
// Utils
import { isAllNodeisConnected } from "../utils";


// Styles
import "reactflow/dist/style.css";
import "./dnd.css";
import "./update-node.css";


import Modal from "../../../components/modal-popup";

import Job from "../../../masters/job";
import axios from "../../../services/axios";


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
  const [edge, setEdge] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  // const [currentId, setCurrentId] = useState(0);
  const [draggedNodeInfo, setDraggedNodeInfo] = useState(null);
  const [newNodes, setNewNodes] = useState(null);
  const [data, setData] = useState([]);
  const onInit = (reactFlowInstance) => setReactFlowInstance(reactFlowInstance);

  useEffect(() => {
    axios.getWithCallback("job-steps/", (data) => {

      const dataNodes = data.map((item) => ({
        id: "" + item.id,
        type: "node",
        data: {
          heading: item.step_name,
          img: `/assets/images/${item.stepType.img}.png`,
        },
        position: {
          x: item.params.position_X,
          y: item.params.position_Y,
        },
      }));

      const dataEdgesok = data.map((item) => ({
        id: `${item.id}_ok`, // Append '_ok' to distinguish it as an 'ok' edge
        source: `${item.id}`,
        target: `${item.ok_step}`,
        label: "ok",
        type: "step",
        sourceHandle: "ok",
        markerEnd: { type: MarkerType.ArrowClosed },
        style: { stroke: getlabelColor("ok") },
      }));
      
      const dataEdgeserror = data.map((item) => ({
        id: `${item.id}_error`, // Append '_error' to distinguish it as an 'error' edge
        source: `${item.id}`,
        target: `${item.error_step}`,
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
      
      
    });
    
  }, []);
console.log(edges,"egessssS");

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";

    // const [showNodeMaster, setShowNodeMaster] = useState(false);

    // ... (other state variables and functions)
  };

  const [allNodes, setAllNodes] = useState([]);
  
  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

    const type = event.dataTransfer.getData("application/reactflow");
    const img = event.dataTransfer.getData("img");
    const name = event.dataTransfer.getData("name");

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });


  const currentId = Math.max(...nodes.map(node => parseInt(node.id, 10)), 0);
  const nextId = currentId + 1;

  const newNode = {
    id: `${nextId}`,
    name,
    type,
    position,
    data: { heading: name, img: img },
  };
    
console.log(nextId,"new id")
    setNodes((es) => es.concat(newNode));
    setSelectedNode((newNode.a = name));
    // setNewNodes([newNode]);

    setAllNodes((prevNodes) => [...prevNodes, newNode]);
    // saveNodeToDatabase([...allNodes, newNode]);
  };

  console.log(allNodes,"new node darg");

  const saveNodeToDatabase = () => {
    const dataFromNodes = allNodes.map((item) => ({
      job_id: "1",
      step_type_id: 1,
      step_name: item.name,
      type: "node",
      params: {
        position_X: item.position.x,
        position_Y: item.position.y,
      },
    }));

    const connectedEdges = [edge].filter((edge) => edge.sourceHandle);
console.log(connectedEdges,"connntect edgegse");
    const dataFromEdges = connectedEdges.map((item) => ({
      ok_step: item.label === "ok" ? item.target : null,
      error_step: item.label === "error" ? item.target : null,
    }));
console.log(dataFromNodes,"datanodes");
console.log(dataFromEdges,"dataedges");

    const combinedData = { dataFromNodes, dataFromEdges }

    setAllNodes([combinedData])
    setAllNodes((prevNodesData) => [...prevNodesData, combinedData]);
    axios.postWithCallback("job-steps", );
    console.log("Data successfully posted to job-steps endpoint");
    console.log(allNodes, "combinedData");
  };

  const saveAllNodes = () => {
    allNodes.forEach((node) => {
      saveNodeToDatabase(node);
    });
    setAllNodes([]);
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

  };

  const saveNodePosition = (nodeId, newPosition) => {
    const data = {
      params: {
        position_X: newPosition.x,
        position_Y: newPosition.y,
      },
    };
    
      axios.putWithCallback(`job-steps/${nodeId}/update/`, data);

  };

  const onConnect = useCallback(
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
      setEdge(newEdge);
      console.log(edges,"onConnect edges data");
    },
    [setEdges, setEdge]
  );

  const [nodeName, setNodeName] = useState("Node 1");
  
  useEffect(() => {
    const node = nodes.filter((node) => {
     
      if (node.selected) return true;
   
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
      saveAllNodes();
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

  const onNodeDoubleClick = () => {
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
              attributionPosition="top-right"
              onNodeDoubleClick={onNodeDoubleClick}
              onEdgeDoubleClick={true}
              onNodeDragStop={onNodeDragStop}

            >
              <Background color="#aaa" gap={16} />
              {/* <Controls /> */}
            </ReactFlow>

            <Modal
              modalTitle={"Save/Update Parameter"}
              ref={modalRef}
              handleClose={handleCloseNodeMaster}
              show={showNodeMaster}
            >
              <Job />
            </Modal>
          </div>
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default OverviewFlow;
