import React from "react";
import EditMessage from "../sidebar/edit-message";

export default ({ isSelected, textRef, nodeName, setNodeName }) => {
  const onDragStart = (event, nodeType, content,img) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("content", content);
    event.dataTransfer.setData("img", img);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
    <div className="row">
        <div className="col-md-12">
        {isSelected && 
            <EditMessage
            textRef={textRef}
            nodeName={nodeName}
            setNodeName={setNodeName}
            />}
            </div>
            <div className="col-md-12">
            <div
            className="dndnode input"
            onDragStart={(event,img) => onDragStart(event, "node", "Click to Edit message",img)}
            draggable
            >
            Add Node
            </div>
            
          </div>
          <div className="col-md-12">
            <div
            className="dndnode input"
            onDragStart={(event,img) => onDragStart(event, "node", "Click to Edit message",img)}
            draggable
            >
            Add Node
            </div>
            
          </div>
          </div>
    </aside>
    
       
    
  );
};
