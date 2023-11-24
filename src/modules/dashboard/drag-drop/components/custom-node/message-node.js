import React, { useState, memo } from "react";
import { Handle, Position } from "reactflow";
import { style } from "./message-node-styles";
import { Margin } from "@mui/icons-material";

const GoogleFormPopup = ({ onClose, data }) => (
  <>
    <div className="popup" style={{ height: "100%", textAlign: "center", width: "230px", backgroundColor:"#8cbfc8"}}>
      {/* Replace 'your-google-form-url-here' with the actual URL of your Google Form */}
      <label>
        Node:
        <>
          <input
            type="node"
            name="node"
          />
          Node:
          <input
            type="node"
            name="node"
          />
          <label for="cars" style={{ marginTop: "10px" }}>select Option:</label>

          <select name="cars" id="cars">
            <option value="disable">Options</option>
            <option value="mercedes">Value</option>
            <option value="audi">Action</option>
          </select>
          <label for="cars" style={{ marginTop: "10px" }}>select Option:</label>

          <select name="cars" id="cars">
            <option value="disable">Options</option>
            <option value="mercedes">Value</option>
            <option value="audi">Action</option>
          </select>

        </>

      </label>
      <br></br>
      <button style={{ marginTop: "21px" }} type="submit" >Submit</button>

      <button style={{ marginLeft: "10px" }} onClick={onClose}>Close</button>

    </div>
  </>
);

const Node = ({ data }) => {
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
                  style={{ width: "100px", height: "100px" }}
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
