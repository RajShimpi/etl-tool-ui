import React, { useState, memo } from "react";
import { Handle, Position } from "reactflow";
import { style } from "./message-node-styles";
import { Margin } from "@mui/icons-material";
import FormCommon from "../../../../components/form-common";
import { nodes } from "../../initial-element";
import Modal from "../../../../components/modal-popup";
import ProjectStructure from "../../../../../components/ProjectStrucure/ProjectStructure";
import Client from "../../../../masters/client";


// const GoogleFormPopup = ({ onClose, data }) => (
//   <>
//     <div className="popup">
//       <FormCommon props={{ data:"" }} />
      
//       <button style={{ marginLeft: "10px" }} onClick={onClose}>Close</button>
//     </div>
//   </>
// );


const Node = ({ data, isSelected, textRef, nodeName, setNodeName }) => {
  const [selected, setSelected] = useState(false);
  const [showNodeMaster, setShowNodeMaster] = useState(false);

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

  let customTitle = { ...style.title };
  customTitle.backgroundColor = "#08c9bd";

  return (
    <>
      <div style={{ textAlign: "center" }} className="text-updater-node">
      {showNodeMaster && (
        <Modal show={showNodeMaster} modalTitle={"Save/Update Parameter"} handleClose={handleCloseNodeMaster} maxWidth={'100%'}>
          <Client/>
        </Modal>
      )} 
          <div style={{ textAlign: "center" }}>
            {selected ? null : (
              <>
                <img 
                  src={data.img}
                  style={{ width: "70px", height: "70px" }}
                  // src={"https://www.picng.com/upload/cv/png_cv_87849.png"}
                  onClick={handleImageClick}
                />
                <div style={style.contentWrapper}>{data.heading}</div>
                {/* <div style={style.contentWrapper}>{data.content}</div> */}

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

        <Handle type="source" position={Position.Right} id="b" onDoubleClick={onNodeDoubleClick}/> 
        <Handle type="target" position={Position.Left} id="a" onDoubleClick={onNodeDoubleClick} />
      </div>
    </>
  );
};

export default memo(Node);
