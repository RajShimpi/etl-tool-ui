import React from "react";
import EditMessage from "../sidebar/edit-message";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import EditIcon from '@mui/icons-material/Edit';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
export default ({ isSelected, textRef, nodeName, setNodeName }) => {
  const onDragStart = (event, nodeType, content, img) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("content", content);
    event.dataTransfer.setData("img", img || require('../../../../../assets/file1.png'));
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
            onDragStart={(event) => onDragStart(event, "node", "Click to Edit message")}
            draggable
          >
            <NoteAddIcon />
          </div>
        </div>
      </div>
      <div className="col-md-12">
        <div
          className="dndnode input"
          onDragStart={(event) => onDragStart(event, "node", "Click to Edit message")}
          draggable
        >
          <TextSnippetIcon />
        </div>
      </div>
      <div className="col-md-12">
        <div
          className="dndnode input"
          onDragStart={(event, img) => onDragStart(event, "node", "Click to Edit message", img)}
          draggable
        >
          <ContentPasteIcon />
        </div>
      </div>
      <div className="col-md-12">
        <div
          className="dndnode input"
          onDragStart={(event, img) => onDragStart(event, "node", "Click to Edit message", img)}
          draggable
        >
          <EditIcon />
        </div>
      </div>
      <div className="col-md-12">
        <div
          className="dndnode input"
          onDragStart={(event, img) => onDragStart(event, "node", "Click to Edit message", img)}
          draggable
        >
          <AddToDriveIcon />
        </div>
      </div>
    </aside>
  );
};
