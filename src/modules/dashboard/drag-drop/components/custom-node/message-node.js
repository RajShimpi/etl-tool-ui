import React, { useState, memo } from "react";
import { Handle, Position } from "reactflow";
import { style } from "./message-node-styles";
import { Margin } from "@mui/icons-material";
import FormCommon from "../../../../components/form-common";
import { nodes } from "../../initial-element";
import Modal from "../../../../components/modal-popup";

const Node = ({ data }) => {
  const [selected, setSelected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showNodeMaster, setShowNodeMaster] = useState(false);

  const handleToggle = () => {
    setSelected(!selected);
  };

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseNodeMaster = () => {
    setShowNodeMaster(false);
  };

  const handleClose = () => {
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
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <FormCommon props={{ data: "" }} />
              <button style={{ marginLeft: "10px" }} onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        )}

        {selected ? null : (
          <div style={{ textAlign: "center" }}>
            <img
              style={{ width: "70px", height: "70px" }}
              src={data.img}
              onClick={handleImageClick}
            />
            <div style={style.contentWrapper}>{data.heading}</div>
          </div>
        )}

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

        <Handle type="source" position={Position.Right} id="b" />
        <Handle type="target" position={Position.Left} id="a" />
      </div>

      {showNodeMaster && (
        <Modal show={showNodeMaster} modalTitle={"Save/Update Parameter"} handleClose={handleClose} maxWidth={'75%'}>
          <NodeMaster/>
        </Modal>
      )}
    </>
  );
};

export default memo(Node);
