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

  import Job from "../../../masters/job";
  import axios from "../../../services/axios";
  // import { Class, Key, Source } from "@mui/icons-material";
  // import { data } from "jquery";
  // import AddFile from "../../../masters/popup/add-file";
  // import Modal from "../../../components/modal-popup";
  // import { ClassNames } from "@emotion/react";
  // // import Job from "../../../masters/job";
  // import axios from "../../../services/axios";
  import { event, post } from "jquery";
  import StepParameter from "../../../masters/popup/step-parameter";
import { getstepparameterFields } from "../../../masters/popup/step-paramter-data";
import JobStepParameterMaster from "../../../masters/job-step-param-master";
import { useJobData } from "../../../../components/JobDataContext";
import DeleteIcon from "@mui/icons-material/Delete";
  // let id = 0;
  // const getId = () => `dndnode_${id++}`;

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
          <div className="delete">Delete</div>
        </button>
      </div>
    </>
  );
}

const OverviewFlow = () => {
  const [menu, setMenu] = useState(null);
  const [nodesActive, setNodesActive] = useState([])
  const [data, setData] = useState([]);
  const [showNodeMaster, setShowNodeMaster] = useState(false);
  const { jobDataId } = useJobData();
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
    const [step_type_id, setStep_type_Id] = useState();
    const [job_id, setJob_Id] = useState();
    const [nodeid, setNode_Id] = useState();
    const [editName,setName]=useState();
    const [doubleClickedNode, setDoubleClickedNode] = useState(null);
    const onInit = (reactFlowInstance) => setReactFlowInstance(reactFlowInstance);
    const handleParameterFields = useCallback((itemData, editName) => {
      console.log('Edit Name:', editName);
      const fields = getstepparameterFields(...itemData, editName);
    }, []); 

  useEffect(() => {
    // const jobDataId = localStorage.getItem("jobDataId");

    if (jobDataId) {
      axios.getWithCallback("job-steps", (data) => setData(data));

      axios.getWithCallback(`job-steps/${jobDataId}/job`, (data) => {
        // console.log("Data from job-steps API:", data);

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

        // console.log("dataNodes:", dataNodes);

        const dataEdgesok = data.map((item) => ({
          id: "ok-" + item.id,
          source: "" + item.id,
          target: "" + item.ok_step,
          label: "ok",
          type: "smoothstep",
          sourceHandle: "ok",
          markerEnd: { type: MarkerType.ArrowClosed },
          style: { stroke: getlabelColor("ok") },
        }));

        const dataEdgeserror = data.map((item) => ({
          id: "err-" + item.id,
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
    // console.log("activeNodes:",activeNodes);
    const dataFromNodes = allNodes.map((item) => ({
      id: parseInt(item.id),
      job_id: jobDataId,
      step_type_id: parseInt(item.step_type_id),
      step_name: item.data?.heading || item.name,
      type: item.type,
      params: {
        position_X: item.id === position.id ? position.position_X : item.position.x,
        position_Y: item.id === position.id ? position.position_Y : item.position.y,
      },
    }));

    // console.log("dataFromNodes:", dataFromNodes);

    const dataFromEdgesOk = edges
      .filter(
        (item) =>
          item.sourceHandle === "ok" &&
          item.ok_step !== null &&
          !isNaN(item.target)
      )
      .map((item) => ({
        id: parseInt(item.source.replace('ok-', '')),
        ok_step: parseInt(item.target),
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
        error_step: parseInt(item.target),
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
      node_active:item.node_active
    }));

    const combinedData = dataFromNodes.map((node) => ({
      ...node,
      ...dataFromEdgesOk.find((edgeOk) => edgeOk.id === node.id),
      ...dataFromEdgesError.find((edgeError) => edgeError.id === node.id),
      ...dataFromNodesActive.find((nodeActive) => nodeActive.id === node.id),
    }));

    // console.log("Updated Edges Ok:", updatedEdgesOk);
    // console.log("Updated Edges Error:", updatedEdgesError);
    // console.log("Combined Data:", combinedData);

    axios.postWithCallback("job-steps/data-save", combinedData);
    // axios.putWithCallback(`job-steps/node-active`, nodesActive);
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
console.log("newEdge:",newEdge);
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  // console.log("edges:", edges);

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
    // const [stepParameters, setStepParameters] = useState([]);

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
    setName(node.data.heading);
    setStep_type_Id(node.step_type_id)
    setJob_Id(node.job_id,"job_id");
    setNode_Id(parseInt(node.id));
  }
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
                onNodeClick={(event, node) => nodeId(node)}
              >
                <Background color="#aaa" gap={16} />
                {/* <Controls /> */}
              </ReactFlow>

              <Modal modalTitle={"Save/Update Parameter"} ref={modalRef} handleClose={handleCloseNodeMaster} show={showNodeMaster}>
              <StepParameter
                  step_type_id={step_type_id}
                  job_Id={job_id}
                  node_Id={nodeid}
                  name={editName}
                  handleParameterFields={(itemData) => handleParameterFields(itemData, editName)}
                />
              </Modal>
            </div>
          </ReactFlowProvider>
        </div>
      </>
    );
  };

  
  export default OverviewFlow;
