import React, { useState, memo, useRef, useEffect } from "react";
import { Handle, Position } from "reactflow";
import { style } from "./message-node-styles";
import { Margin } from "@mui/icons-material";
import FormCommon from "../../../../components/form-common";
import { nodes } from "../../initial-element";
import Modal from "../../../../components/modal-popup";
import ProjectStructure from "../../../../../components/ProjectStrucure/ProjectStructure";
import Read from "../../../../masters/Read";

const Node = ({ data, isSelected, textRef, nodeName, setNodeName }) => {
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
      // Clicked outside the node, close the modal
      setShowNodeMaster(false);
    }
  };

  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  let customTitle = { ...style.title };
  customTitle.backgroundColor = "#08c9bd";

  return (
    <div ref={nodeRef}>
      <div style={{ textAlign: "center" }} className="text-updater-node">
        {showNodeMaster && (
          <Modal
            show={showNodeMaster}
            modalTitle={"Save/Update Parameter"}
            handleClose={handleCloseNodeMaster}
            maxWidth={"100%"}
          >
            <Read />
          </Modal>
        )}
        <div style={{ textAlign: "center" }}>
          {selected ? null : (
            <>
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
            <div style={style.contentWrapper}>{data.content}</div>
          </div>
        )}

        <Handle type="source" position={Position.Right} id="b" onDoubleClick={onNodeDoubleClick} />
        <Handle type="target" position={Position.Left} id="a" onDoubleClick={onNodeDoubleClick} />
      </div>
    </div>
  );
};

export default memo(Node);
