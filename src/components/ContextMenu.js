import React, { useState, useEffect } from "react";
import "./MainComponent.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PopupComponent from "./PopupComponent";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const ContextMenu = ({ item, onToggleFiles, popType, project_id, parent_id,id, onClose, callback }) => {
  const [popupType, setPopupType] = useState(null);
  const [popupPosition, setPopupPosition] = useState();

  const handleContextMenuClick = (event) => {
    event.preventDefault();
  };

  const openPopup = (e,type, position) => {
    // setPopupType(type);
    // setPopupPosition(position);
    callback(item, type); 
    onClose(e);
  };

  const closePopup = (e) => {
    setPopupType(null);
    onClose(e);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupType &&
        !event.target.closest('.contextMenu') &&
        !event.target.closest('.popup')
      ) {
        closePopup(event);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [popupType]);

  return (
    <div style={{zIndex:1}}
      className={`contextMenu ${popType === 'right' ? 'right' :''}`}
      onContextMenu={handleContextMenuClick}
    >
      <div
        className="menu-item"
        onClick={(e) =>
          openPopup(e,"AddFolder", { top: e.clientY, left: e.clientX + 10 }, project_id, parent_id)
        }
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <FolderIcon
            style={{ fontSize: "medium", marginRight: "5px", marginTop: "3px" }}
          />
          Add Folder
        </div>
      </div>
      <div
        className="menu-item"
        onClick={(e) => {
          openPopup(e,"Add", { top: e.clientY, left: e.clientX + 10 }, project_id, id);
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <InsertDriveFileIcon
            style={{ fontSize: "medium", marginRight: "5px", marginTop: "3px" }}
          />
          Add File
        </div>
      </div>
      <div
        className="menu-item"
        onClick={(e) =>
          openPopup(e,"Edit", { top: e.clientY, left: e.clientX + 10 }, project_id, parent_id)
        }
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <EditIcon
            style={{ fontSize: "medium", marginRight: "5px", marginTop: "3px" }}
          />
          Edit
        </div>
      </div>
      <div
        className="menu-item"
        onClick={(e) =>
          openPopup(e,"Delete", { top: e.clientY, left: e.clientX + 10 }, project_id, parent_id)
        }
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <DeleteIcon
            style={{ fontSize: "medium", marginRight: "5px", marginTop: "3px" }}
          />
          Delete
        </div>
      </div>
      {/* {popupType && (
        <PopupComponent
          onClose={closePopup}
          actionType={popupType}
          style={{
            top: popupPosition.top,
            left: popupPosition.left,
            marginLeft: "10px",
          }}
          project_id={project_id}
          parent_id={parent_id}
          id={id}
        />
      )} */}
    </div>
  );
};

export default ContextMenu;
