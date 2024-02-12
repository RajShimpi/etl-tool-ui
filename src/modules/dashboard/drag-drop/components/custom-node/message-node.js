import React, { useState, memo, useRef, useEffect, useCallback } from "react";
import { Handle, Position } from "reactflow";
import { style } from "./message-node-styles";
import Modal from "../../../../components/modal-popup";
import AddFile from '../../../../masters/popup/add-file'
import axios from "../../../../services/axios";
const Node = ({ data, id, start_step, item, isSelected, textRef, nodeName, setNodeName, ...props }) => {
  const [selected, setSelected] = useState(false);
  const [jobData, setJobData] = useState({});
  const [showNodeMaster, setShowNodeMaster] = useState(false);

  const nodeRef = useRef();

  const handleToggle = () => {
    setSelected(!selected);
  };

  const handleImageClick = () => {
    setShowNodeMaster(true);
  };

  const handleCloseNodeMaster = () => {
    setShowNodeMaster(false);
  };

  const onNodeDoubleClick = () => {
    setShowNodeMaster(true);
  };

  const handleClickOutside = (event) => {
    if (nodeRef.current && !nodeRef.current.contains(event.target)) {
      setShowNodeMaster(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  let customTitle = { ...style.title };
  customTitle.backgroundColor = "#08c9bd";
 
  return (
    <div ref={nodeRef}>
      <div style={{ textAlign: "center" }} className="text-updater-node" >
        {/* {showNodeMaster && (
          <Modal
            show={showNodeMaster}
            modalTitle={"Save/Update Parameter"}
            handleClose={handleCloseNodeMaster}
            maxWidth={"100%"} 
          >
            {data.comp? data.comp: <AddFile/>}
          </Modal>
        )} */}

        <div style={{ textAlign: "center" }}>
          {selected ? null : (
            <>
              {data.start_step == data.id ? <div><img src="/assets/images/flag.png" style={{zIndex: '10', position: "absolute", marginLeft: '-26px',marginTop: '1px'}} s></img></div> : ""}
              {/* {data.start_step == data.id ? <div><img src="/assets/images/start2.png" style={{paddingTop:'30px',zIndex:10}}  ></img></div> : ""} */}
              <img
                src={data.img}
                style={{ width: "70px", height: "70px" }}
                onClick={handleImageClick}
              />
              <div style={style.contentWrapper}>{data.heading}</div>
            </>
          )}
        </div>

        {selected && (
          <div
            className="Main"
            style={{ ...style.body, ...(selected ? style.selected : []) }}
            onClick={handleToggle}
          >
            <div style={customTitle}>{data.heading}</div>
            {/* <div style={style.contentWrapper}>{data.content}</div> */}
          </div>
        )}

        <Handle type="source" style={{ marginTop: '-30px',marginLeft:'-40px', backgroundColor: "green", border: "green" }} position={Position.Right} id="ok" onDoubleClick={onNodeDoubleClick} />
        <Handle type="source" style={{ backgroundColor: "red", border: "red" }} position={Position.Right} id="error" onDoubleClick={onNodeDoubleClick} />
        <Handle type="target" position={Position.Left} id="target" onDoubleClick={onNodeDoubleClick} />


      </div>
    </div>
  );
};

export default memo(Node);