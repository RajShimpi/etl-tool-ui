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
import {
  useJobData,
  useProjectid,
} from "../../../../components/JobDataContext";
import DeleteIcon from "@mui/icons-material/Delete";
import JobStepParameterMaster from "../../../masters/job-step-param-master";
import JobParameterMaster from "../../../masters/job-parameter";

const nodeTypes = {
  node: (node) => {
    return (
      <Node
        id={node.id}
        startStep={node.data.start_step}
        data={node.data}
        start_step={node.start_step ?? null}
      />
    );
  },
};

const ContextMenu = ({
  id,
  name,
  top,
  left,
  right,
  jobfileid,
  bottom,
  menu,
  setAsStartStepHandler,
  setAsStartStepNullHandler,
  textColor,
  setMenu,
  ...props
}) => {
  const { setNodes, setEdges } = useReactFlow();
  const [startStepChecked, setStartStepChecked] = useState(
    menu.startstep === id
  );

  useEffect(() => {
    setNodes([]);
    setEdges([]);
  }, [setNodes, setEdges, setStartStepChecked]);

  useEffect(() => {
    setStartStepChecked(menu.startstep === id);
  }, [menu, id]);

  const handleStartStepClick = () => {
    setAsStartStepHandler();
  };

  const handleStartStepNullClick = () => {
    setAsStartStepNullHandler();
  };

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
  }, [id, setNodes, setEdges, menu]);

  return (
    <>
      <div
        style={{
          top,
          left,
          right,
          bottom,
          marginTop: "-125px",
          marginLeft: "100px",
        }}
        className="context-menu"
      >
        <div className="d-flex" style={{ height: "50px" }}>
          <button className="setAsStartStepHandler">
            {menu.start_step !== null ? (
              <input
                type="checkbox"
                id="startstep"
                style={{
                  margin: "-6px",
                  height: "20px",
                  width: "15px",
                  cursor: "pointer",
                }}
                name="startstep"
                value="startstep"
                onClick={handleStartStepNullClick}
                checked
              />
            ) : (
              <input
                type="checkbox"
                id="startstep"
                style={{
                  margin: "-6px",
                  height: "20px",
                  width: "15px",
                  cursor: "pointer",
                }}
                name="startstep"
                value="startstep"
                onClick={handleStartStepClick}
              />
            )}
            <div
              style={{
                margin: "2px",
                marginLeft: "20px",
                fontSize: "18px",
                color: textColor?.textColor,
              }}
            >
              Start
            </div>
          </button>
        </div>
        <div {...props} style={{ height: "50px" }}>
          <button
            className="deleteNode"
            onClick={deleteNode}
            style={{ height: "50px" }}
          >
            <DeleteIcon
              className="display-3 m-2"
              style={{ color: textColor?.textColor }}
            />
            <div
              className="delete mt-2"
              style={{ fontSize: "18px", color: textColor?.textColor }}
            >
              Delete
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

let id = 0;

axios.getWithCallback("job-steps", (data) => {
  id = data.length;
});

const getId = () => {
  id++;
  return `${id}`;
};

const OverviewFlow = (textColor) => {
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
  const [node_id, setNode_Id] = useState();
  const [editName, setName] = useState();
  const [activeNodes, setActiveNodes] = useState([]);
  const [nodesActive, setNodesActive] = useState([]);
  const [openJobParams, setOpenJobParams] = useState(false);
  const onInit = (reactFlowInstance) => setReactFlowInstance(reactFlowInstance);
  const { jobDataId } = useJobData(null);
  const { setJobDataId } = useJobData(null);
  const { projectID } = useProjectid([]);
  const [startStep, setStartStep] = useState(null);

  const setAsStartStepHandler = useCallback(() => {
    const startstep = {
      start_step: parseInt(menu.id),
    };
    axios.putWithCallback(`job/${jobfileid.id}/startstep`, startstep);
  }, [menu, setMenu, jobfileid, startStep, setStartStep, nodes]);

  const setAsStartStepNullHandler = useCallback(() => {
    const startstep = {
      start_step: null,
    };
    axios.putWithCallback(`job/${jobfileid.id}/startstep`, startstep);
  }, [menu, setMenu, jobfileid, startStep, setStartStep, nodes]);

  useEffect(() => {
    setEdges([]);
    setNodes([]);
    setJobDataId(null);
    setStartStep(null);
    setMenu(null);
  }, [projectID, jobDataId, setStartStep, setMenu]);

  useEffect(() => {
    if (jobDataId) {
      axios.getWithCallback(`job-steps/${jobDataId.id}/job`, (data) => {
        setJobFileId(jobDataId);
        const dataNodes = data.map((item) => ({
          id: "" + item.id,
          step_type_id: "" + item.step_type_id,
          job_id: "" + item.job_id,
          type: "node",
          data: {
            heading: item.step_name,
            img: `/assets/images/${item.stepType.img}`,
            start_step:
              jobDataId.start_step == item.id ? jobDataId.start_step : null,
            id: item.id,
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
  }, [
    setNodes,
    setAllNodes,
    jobDataId,
    startStep,
    setStartStep,
    setAsStartStepNullHandler,
    setAsStartStepHandler,
  ]);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";

    // const [showNodeMaster, setShowNodeMaster] = useState(false);

    // ... (other state variables and functions)
  };

  const onDrop = (event) => {
    if (jobfileid) {
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

      const newNode = {
        id: getId(),
        step_type_id,
        name,
        type,
        job_id:jobfileid.id,
        node_active: true,
        position,
        data: { heading: name, img: img, start_step: null },
      };
console.log(newNode);
      setNodes((es) => es.concat(newNode));
      setData((prevData) => [...prevData, newNode]);
      setSelectedNode((newNode.a = name));
      setAllNodes((prevNodes) => [...prevNodes, newNode]);
    }
  };

  const saveNodeToDatabase = () => {
    const dataFromNodes = allNodes.map((item) => ({
      id: parseInt(item.id),
      job_id: jobfileid.id,
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
  }, [edges]);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const onNodeDoubleClick = () => {
    setShowNodeMaster(true);
  };

  const node_Id = (node) => {
    setName(node.data.heading);
    setStep_type_Id(node.step_type_id);
    setJob_Id(node.job_id);
    setNode_Id(parseInt(node.id));
  };

  const handleCloseNodeMaster = () => {
    setShowNodeMaster(false);
    setMenu(null);
  };

  const handleCloseJobParams = () => {
    setOpenJobParams(false);
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
    node_Id(node);
  };

  const onNodeContextMenu = useCallback(
    (event, node) => {
      event.preventDefault();
      const contextMenuWidth = 120;
      const contextMenuHeight = 50;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      const top = mouseY - reactFlowBounds.top - contextMenuHeight / 2;
      const left = mouseX - reactFlowBounds.left - contextMenuWidth / 2;

      setMenu({
        id: node.id,
        top: top < 0 ? 0 : top,
        left: left < 0 ? 0 : left,
        right: left < 0 ? -left : 0,
        bottom: top < 0 ? -top : 0,
        start_step: node.data.start_step,
      });

      setActiveNodes(node);
      setSelectedNode(node);
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

  const nodeActives = nodes.filter((item) => item.node_active === true);
const onEdgeClick=(data)=>{
  console.log(data);
}
  return (
    <>
      <button
        className="btn btn-primary"
        style={{ marginRight: "1px" }}
        onClick={saveHandler}
      >
        Save
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => {
          setOpenJobParams(true);
        }}
      >
        Job Params
      </button>
      <Modal
        modalTitle={"Save/Update Parameter"}
        ref={modalRef}
        handleClose={handleCloseJobParams}
        show={openJobParams}
        maxWidth="70%"
      >
        <JobParameterMaster
          handleClose={handleCloseJobParams}
          project_id={projectID}
          job_id={job_id}
        />
      </Modal>
      <div className="dndflow">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodeActives}
              edges={edges}
              startStep={startStep}
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
              onNodeDoubleClick={(event, node) => handleNodeClick(event, node)}
              onEdgeDoubleClick={true}
              onNodeDragStop={onNodeDragStop}
              onNodeContextMenu={onNodeContextMenu}
              onPaneClick={onPaneClick}
              onEdgeClick={(edge) => onEdgeClick(edge)}
            >
              <Background color="#aaa" gap={16} />
              {menu && (
                <ContextMenu
                  id={menu.id}
                  top={menu.top}
                  left={menu.left}
                  right={menu.right}
                  jobfileid={jobfileid}
                  bottom={menu.bottom}
                  onClick={deleteNode}
                  setAsStartStepHandler={setAsStartStepHandler}
                  setAsStartStepNullHandler={setAsStartStepNullHandler}
                  menu={menu}
                  setMenu={setMenu}
                  textColor={textColor}
                />
              )}
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
                job_id={job_id}
                node_id={node_id}
                handleClose={handleCloseNodeMaster}
                name={editName}
                nodes={nodeActives}
              />
            </Modal>
          </div>
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default OverviewFlow;
