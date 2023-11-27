import React, { useState, memo } from "react";
import { Handle, Position } from "reactflow";
import { style } from "./message-node-styles";
import { Margin } from "@mui/icons-material";
import FormCommon from "../../../../components/form-common";
import { nodes } from "../../initial-element";
import EditMessage from "../sidebar/edit-message";


const GoogleFormPopup = ({ onClose, data }) => (
  <>
    <div className="popup">

      <FormCommon props={{ data: "" }} />

      <button style={{ marginLeft: "10px" }} onClick={onClose}>Close</button>
    </div>
  </>
);


const Node = ({ data, isSelected, textRef, nodeName, setNodeName }) => {
  const [selected, setSelected] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleToggle = () => {
    setSelected(!selected);
  };

  const handleImageClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  let customTitle = { ...style.title };
  customTitle.backgroundColor = "#08c9bd";

  return (
    <>
      {isSelected &&
        <EditMessage
          textRef={textRef}
          nodeName={nodeName}
          setNodeName={setNodeName}
        />}
      <div style={{ textAlign: "center" }} className="text-updater-node">
        {showPopup ? (
          <>
            <GoogleFormPopup onClose={handleClosePopup} />
            <div style={style.contentWrapper}>{data.heading}</div>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            {selected ? null : (
              <>
                <img
                  style={{ width: "70px", height: "70px" }}
                  src={data.img}
                  // src={"https://www.picng.com/upload/cv/png_cv_87849.png"}
                  onClick={handleImageClick}
                />
                <div style={style.contentWrapper}>{data.heading}</div>
                {/* <div style={style.contentWrapper}>{data.content}</div> */}

              </>
            )}
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
    </>
  );
};

export default memo(Node);
