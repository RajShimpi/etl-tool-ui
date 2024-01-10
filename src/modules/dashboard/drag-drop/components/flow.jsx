  import React, { useCallback, useEffect, useState, useRef } from "react";
  import ReactFlow, {
    addEdge,
    Background,
    // Controls,
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
    // const [newNodes, setNewNodes] = useState(null);
    const [position, setPosition] = useState([]);
    const [allNodes, setAllNodes] = useState([]);
    const onInit = (reactFlowInstance) => setReactFlowInstance(reactFlowInstance);

    useEffect(() => {
      axios.getWithCallback("job-steps/", (data) => {
        const dataNodes = data.map((item) => ({
          id: "" + item.id,
          step_type_id: "" + item.step_type_id,
          job_id: "" + item.job_id,
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
          id: "" + item.id,
          source: "" + item.id,
          target: "" + item.ok_step,
          label: "ok",
          type: "step",
          sourceHandle: "ok",
          markerEnd: { type: MarkerType.ArrowClosed },
          style: { stroke: getlabelColor("ok") },
        }));

        const dataEdgeserror = data.map((item) => ({
          id: "" + item.id,
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

        const combinedDataOk = dataNodes.map((node) => ({
          ...node,
          ...dataEdgesok.find((edgeOk) => edgeOk.id === node.id),
        }));

        const combinedData = combinedDataOk.map((node) => ({
          ...node,
          ...dataEdgeserror.find((edgeError) => edgeError.id === node.id),
        }));

        setAllNodes(combinedData);
        function getlabelColor(label) {
          return label === "ok" ? "green" : label === "error" ? "red" : "black";
        }
      });
      // eslint-disable-next-line
    }, []);

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
      const img = event.dataTransfer.getData("img");
      const name = event.dataTransfer.getData("name");
      const step_type_id = event.dataTransfer.getData("id");

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const currentId = nodes.length;
      const nextId = currentId + 1;

      const newNode = {
        id: `${nextId}`,
        step_type_id,
        name,
        type,
        position,
        data: { heading: name, img: img },
      };

      setNodes((es) => es.concat(newNode));
      setSelectedNode((newNode.a = name));

      setAllNodes((prevNodes) => [...prevNodes, newNode]);
    };

  const saveNodeToDatabase = () => {
    const dataFromNodes = allNodes.map((item) => ({
      id: parseInt(item.id),
      job_id: 1,
      step_type_id: parseInt(item.step_type_id),
      step_name: item.data?.heading || item.name,
      type: "node",
      params: {
        position_X:
          item.id === position.id ? position.position_X : item.position.x,
        position_Y:
          item.id === position.id ? position.position_Y : item.position.y,
      },
    }));

    const dataFromEdgesOk = edges.filter((item) => item.sourceHandle === "ok" && item.target !== null && !isNaN(item.target))
      .map((item) => ({
        id:  parseInt(item.source),
        ok_step: parseInt(item.target),
      }));

      const dataFromEdgesError = edges.filter((item) => item.sourceHandle === "error" && item.target !== null && !isNaN(item.target))
      .map((item) => ({
        id: parseInt(item.source),
        error_step: parseInt(item.target),
      }));
    

      const combinedData = dataFromNodes.map((node) => ({
        ...node,
        ...dataFromEdgesOk.find((edgeOk) => edgeOk.id === node.id),
      }));
      
      const combinedDatas = combinedData.map((node) => ({
        ...node,
      ...dataFromEdgesError.find((edgeError) => edgeError.id === node.id),
      }));
      

    // console.log("Updated Edges Ok:", dataFromEdgesOk);
    // console.log("Updated Edges Error:", dataFromEdgesError);
    // console.log("Combined Data:", combinedDatas);

    axios.postWithCallback("job-steps/data-save", combinedDatas);
  };


    const onNodeDragStop = (event, node) => {
      const updatedPosition = nodes.map((n) => {
        if (n.id === node.id) {
          return {
            ...n,
            position: { x: node.position.x, y: node.position.y },
          };
        }
        return n;
      });

      setNodes(updatedPosition);
      setPosition(updatedPosition);
      setDraggedNodeInfo({ id: node.id, position: node.position });

      const combinedDataposition = nodes.map((node) => ({
        ...node,
        ...position.find((id) => id.id === node.id),
      }));
      setAllNodes(combinedDataposition);
      // console.log(allNodes, "update");
    };

    const onConnect = useCallback(
      (params) => {
        const { sourceHandle, source, target } = params;
        // const sourceNodeId = parseInt(source);
        // const targetNodeId = parseInt(target);
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
        //   source: sourceNodeId,
        // target: targetNodeId,
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
        saveNodeToDatabase();
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
      // eslint-disable-next-line
    }, []);

    const onEdgeUpdateEnd = useCallback((_, edge) => {
      if (!edgeUpdateSuccessful.current) {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      }

      edgeUpdateSuccessful.current = true;
      // eslint-disable-next-line
    }, []);

    const onNodeDoubleClick = () => {
      setShowNodeMaster(true);
    };

    const handleCloseNodeMaster = () => {
      setShowNodeMaster(false);
    };

    // const nodeRef = useRef();
    // const closeModel = () => {
    //   setShowNodeMaster(false);
    // };

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
