import React, { useCallback, useEffect, useState, useRef } from "react";
import ReactFlow, {
  addEdge,
  Background,
  ReactFlowProvider,
  updateEdge,
  useReactFlow,
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
import "../../../../components/MainComponent.css";
import Modal from "../../../components/modal-popup";

import axios from "../../../services/axios";
import { useJobData, useProject, useProjectId, useProjectid } from "../../../../components/JobDataContext";
import DeleteIcon from "@mui/icons-material/Delete";
import JobStepParameterMaster from "../../../masters/job-step-param-master";

const nodeTypes = { node: Node };

function ContextMenu({ id, name, top, left, right, bottom, ...props }) {
  const { setNodes, setEdges } = useReactFlow();

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
  }, [id, setNodes, setEdges]);

  return (
    <>
      <div
        style={{ top, left, right, bottom }}
        className="context-menu"
        {...props}
      >
        <button className="deleteNode" onClick={deleteNode}>
          <DeleteIcon className="display-3 m-2" />
          <div className="delete mt-2">Delete</div>
        </button>
      </div>
    </>
  );
}

const OverviewFlow = () => {
  const [showNodeMaster, setShowNodeMaster] = useState(false);
  const reactFlowWrapper = useRef(null);
  const edgeUpdateSuccessful = useRef(true);
  const modalRef = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useState([]);
  const [edges, setEdges, onEdgesChange] = useState([]);
  const [menu, setMenu] = useState(null);
  const ref = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [draggedNodeInfo, setDraggedNodeInfo] = useState(null);
  const [data, setData] = useState([]);
  const [position, setPosition] = useState([]);
  const [allNodes, setAllNodes] = useState([]);
  const [step_type_id, setStep_type_Id] = useState();
  const [job_id, setJob_Id] = useState();
  const [jobfileid, setJobFileId] = useState();
  const [nodeid, setNode_Id] = useState();
  const [editName, setName] = useState();
  const [activeNodes, setActiveNodes] = useState([]);
  const [nodesActive, setNodesActive] = useState([]);
  const onInit = (reactFlowInstance) => setReactFlowInstance(reactFlowInstance);
  const { jobDataId } = useJobData(null);
  const { setJobDataId } = useJobData(null);
 
  const {projectID}=useProjectid([])
  useEffect(() => {
    setEdges([]);
    setNodes([])
    setJobDataId(null)
  }, [projectID,jobDataId]);

  useEffect(() => {

    if (jobDataId) {
      axios.getWithCallback("job-steps", (data) => setData(data));

      axios.getWithCallback(`job-steps/${jobDataId}/job`, (data) => {
        setJobFileId(jobDataId)
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
          node_active: item.node_active,
        }));

        const dataEdgesok = data.map((item) => ({
          id: "" + item.id,
          source: "" + item.id,
          target: "" + item.ok_step,
          label: "ok",
          type: "smoothstep",
          sourceHandle: "ok",
          markerEnd: { type: MarkerType.ArrowClosed },
          style: { stroke: getlabelColor("ok") },
        }));

        const dataEdgeserror = data.map((item) => ({
          id: "" + item.id,
          source: "" + item.id,
          target: "" + item.error_step,
          label: "error",
          type: "smoothstep",
          sourceHandle: "error",
          markerEnd: { type: MarkerType.ArrowClosed },
          style: { stroke: getlabelColor("error") },
        }));

        setNodes(dataNodes);
        setEdges([...dataEdgesok, ...dataEdgeserror]);

        const combinedData = dataNodes.map((node) => ({
          ...node,
          ...dataEdgesok.find((edgeOk) => edgeOk.id === node.id),
          ...dataEdgeserror.find((edgeError) => edgeError.id === node.id),
        }));

        setAllNodes(combinedData);
        function getlabelColor(label) {
          return label === "ok" ? "green" : label === "error" ? "red" : "black";
        }
      });
    }
    // eslint-disable-next-line
  }, [setNodes, setAllNodes, jobDataId]);

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

    const currentId = Math.max(...data.map((node) => parseInt(node.id)), 0);
    const nextId = currentId + 1;

    const newNode = {
      id: `${nextId}`,
      step_type_id,
      name,
      type,
      node_active: true,
      position,
      data: { heading: name, img: img },
    };
    setNodes((es) => es.concat(newNode));
    setData((es) => es.concat(newNode));
    setSelectedNode((newNode.a = name));
    setAllNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const saveNodeToDatabase = () => {

    const dataFromNodes = allNodes.map((item) => ({
      id: parseInt(item.id),
      job_id: jobfileid,
      step_type_id: parseInt(item.step_type_id),
      step_name: item.data?.heading || item.name,
      type: item.type,
      params: {
        position_X:
          item.id === position.id ? position.position_X : item.position.x,
        position_Y:
          item.id === position.id ? position.position_Y : item.position.y,
      },
    }));

    const dataFromEdgesOk = edges
      .filter(
        (item) =>
          item.sourceHandle === "ok" &&
          item.ok_step !== null &&
          !isNaN(item.target)
      )
      .map((item) => ({
        id: parseInt(item.source),
        ok_step: parseInt(item.target) || null,
      }));

    const dataFromEdgesError = edges
      .filter(
        (item) =>
          item.sourceHandle === "error" &&
          item.error_step !== null &&
          !isNaN(item.target)
      )
      .map((item) => ({
        id: parseInt(item.source),
        error_step: parseInt(item.target) || null,
      }));

    const updatedEdgesOk = edges.filter(
      (item) => item.sourceHandle === "ok" && !isNaN(item.target)
    );

    const updatedEdgesError = edges.filter(
      (item) => item.sourceHandle === "error" && !isNaN(item.target)
    );

    allNodes.forEach((node) => {
      const id = parseInt(node.id);

      if (!updatedEdgesOk.some((edge) => parseInt(edge.source) === id)) {
        dataFromEdgesOk.push({ id, ok_step: null });
      }

      if (!updatedEdgesError.some((edge) => parseInt(edge.source) === id)) {
        dataFromEdgesError.push({ id, error_step: null });
      }
    });

    dataFromEdgesOk.forEach((edge) => {
      if (edge.ok_step === null) {
        const existingEdge = dataFromEdgesOk.find(
          (item) => item.id === edge.id && item.ok_step !== null
        );
        if (existingEdge) {
          edge.ok_step = existingEdge.ok_step;
        }
      }
    });

    dataFromEdgesError.forEach((edge) => {
      if (edge.error_step === null) {
        const existingEdge = dataFromEdgesError.find(
          (item) => item.id === edge.id && item.error_step !== null
        );
        if (existingEdge) {
          edge.error_step = existingEdge.error_step;
        }
      }
    });

    const dataFromNodesActive = nodesActive.map((item) => ({
      id: parseInt(item.id),
      node_active: item.node_active,
    }));

    const combinedData = dataFromNodes.map((node) => ({
      ...node,
      ...dataFromEdgesOk.find((edgeOk) => edgeOk.id === node.id),
      ...dataFromEdgesError.find((edgeError) => edgeError.id === node.id),
      ...dataFromNodesActive.find((nodeActive) => nodeActive.id === node.id),
    }));

    axios.postWithCallback("job-steps/data-save", combinedData);

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

  };

  const textRef = useRef(null);

  useEffect(() => {
    textRef?.current?.focus();
  }, [selectedNode]);

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
        type: "smoothstep",
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

  const nodeId = (node) => {
    setName(node.data.heading);
    setStep_type_Id(node.step_type_id);
    setJob_Id(node.job_id);
    setNode_Id(parseInt(node.id));
  };

  const handleCloseNodeMaster = () => {
    setShowNodeMaster(false);
    setMenu(null);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleCloseNodeMaster();
      setMenu(null);
    }
  };

  useEffect(() => {
    const handleDocumentClick = (event) => handleClickOutside(event);

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [handleCloseNodeMaster, modalRef]);

  const handleNodeClick = (event, node) => {
    onNodeDoubleClick();
    nodeId(node);
  };

  const onNodeContextMenu = useCallback(
    (event, node) => {
      event.preventDefault();
      const contextMenuWidth = 150;
      const contextMenuHeight = 40;

      const mouseX = event.clientX;
      const mouseY = event.clientY;

      const top = mouseY - contextMenuHeight / 2;
      const left = mouseX - contextMenuWidth / 2;

      setMenu({
        id: node.id,
        top: top < 0 ? 0 : top,
        left: left < 0 ? 0 : left,
        right: left < 0 ? -left : 0,
        bottom: top < 0 ? -top : 0,
      });

      setActiveNodes(node);
    },
    [setMenu]
  );

  const onPaneClick = useCallback(() => {
    if (menu) {
      setMenu(null);
    }
  }, [menu]);

  const deleteNode = useCallback(() => {
    if (menu && menu.id) {
      setNodesActive((prevDeletedNodes) => [
        ...prevDeletedNodes,
        { id: menu.id, node_active: false },
      ]);
      setNodes((nodes) => nodes.filter((node) => node.id !== menu.id));
      setEdges((edges) => edges.filter((edge) => edge.source !== menu.id));
      setMenu(null);

    }
  }, [menu, setNodes, setEdges, activeNodes]);

  const Node = nodes.filter((item) => item.node_active === true);

  return (
    <>
      <button onClick={saveHandler}>Save</button>
      <div className="dndflow">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={Node}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={onInit }
              onDrop={onDrop}
              onDragOver={onDragOver}
              onEdgeUpdate={onEdgeUpdate}
              onEdgeUpdateStart={onEdgeUpdateStart}
              onEdgeUpdateEnd={onEdgeUpdateEnd}
              attributionPosition="top-right"
              onNodeDoubleClick={(event, node) => handleNodeClick(event, node)}
              onEdgeDoubleClick={true}
              onNodeDragStop={onNodeDragStop}
              onNodeContextMenu={onNodeContextMenu}
              onPaneClick={onPaneClick}
            >
              <Background color="#aaa" gap={16} />
              {menu && (
                <ContextMenu
                  id={menu.id}
                  top={menu.top}
                  left={menu.left}
                  right={menu.right}
                  bottom={menu.bottom}
                  onClick={deleteNode}
                />
              )}
              <div className="reactflow-wrapper" ref={reactFlowWrapper} />
              <div ref={ref} />
            </ReactFlow>

            <Modal
              modalTitle={"Save/Update Parameter"}
              ref={modalRef}
              handleClose={handleCloseNodeMaster}
              show={showNodeMaster}
              maxWidth="70%"
            >
              <JobStepParameterMaster
                step_type_id={step_type_id}
                job_Id={job_id}
                node_Id={nodeid}
                name={editName}
              />
            </Modal>
          </div>
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default OverviewFlow;
