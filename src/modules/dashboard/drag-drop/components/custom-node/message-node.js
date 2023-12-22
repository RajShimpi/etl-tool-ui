import React, { useState, memo, useRef, useEffect } from "react";
import { Handle, Position } from "reactflow";
import { style } from "./message-node-styles";
import Modal from "../../../../components/modal-popup";
import AddFile from '../../../../masters/popup/add-file'
const Node = ({ data,item, isSelected, textRef, nodeName, setNodeName }) => {
  const [selected, setSelected] = useState(false);
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
      <div style={{ textAlign: "center" }} className="text-updater-node">
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
              <img
                src={data.img }
                style={{ width: "70px", height: "70px" }}
                onClick={handleImageClick}
              />      
              <div style={style.contentWrapper}>{data.headin}</div>
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
            <div style={style.contentWrapper}>{data.content}</div>
          </div>    
        )}
       
            <Handle type="source" style={{marginTop:'-30px', backgroundColor:"green", border:"green"}} position={Position.Right} id="ok" onDoubleClick={onNodeDoubleClick} />
            <Handle type="source" style={{backgroundColor:"red", border:"red"}} position={Position.Right} id="error" onDoubleClick={onNodeDoubleClick} />
            <Handle type="target" position={Position.Left} id="target" onDoubleClick={onNodeDoubleClick} />
      
      </div>
    </div>
  );
};

export default memo(Node);