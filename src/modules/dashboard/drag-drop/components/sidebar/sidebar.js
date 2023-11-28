import React from "react";
export default ({ isSelected, textRef, nodeName, setNodeName }) => {
  const onDragStart = (event, nodeType, content, img) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("content", content);
    event.dataTransfer.setData("img", img);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div className="row">
        <div className="col-md-12">
          {/* {isSelected &&
          {/* {isSelected &&
            <EditMessage
              textRef={textRef}
              nodeName={nodeName}
              setNodeName={setNodeName}
            />} */}
        </div>
        <div className="col-md-12">
          <div
            className="dndnode input "
            style={{margin:'5px'}}
            onDragStart={(event) =>
              onDragStart(event, "node", "Click to Edit message", require("../../../../../assets/Images/Files.png"))
            }
            draggable
          >
            <NoteAddIcon />
          </div>
        </div>
      </div>
      <div className="col-md-12">
        <div
          style={{margin:'5px'}}
          className="dndnode input m-10"
          onDragStart={(event) =>
            onDragStart(event, "node", "Click to Edit message", require("../../../../../assets/Images/file1.png"))
          }
          draggable
        >
          <img src={require('../../../../../assets/Images/file1.png')} style={{height:"20px"}} alt="File Icon" />
        </div>
      </div>
      <div className="col-md-12">
        <div
          style={{margin:'5px'}}
          className="dndnode input m-10"
          onDragStart={(event) =>
            onDragStart(event, "node", "Click to Edit message", require("../../../../../assets/Images/Folders.png"))
          }
          draggable
        >
          <img src={require('../../../../../assets/Images/Folders.png')} style={{height:"20px"}} alt="File Icon" />
        </div>
      </div>
      <div className="col-md-12">
        <div
          style={{margin:'5px'}}
          className="dndnode input m-10"
          onDragStart={(event) =>
            onDragStart(event, "node", "Click to Edit message", require("../../../../../assets/Images/Files-PNG-Clipart.png"))
          }
          draggable
        >
          <img src={require('../../../../../assets/Images/Files-PNG-Clipart.png')} style={{height:"20px"}} alt="File Icon" />
        </div>
      </div>
    </aside>
  );
};
