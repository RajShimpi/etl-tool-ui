import React, { useState, useEffect } from "react";
import "./MainComponent.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PopupComponent from "./PopupComponent";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
const ContextMenu = ({ onToggleFolder, popType }) => {
  const [popupType, setPopupType] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const handleContextMenuClick = (event) => {
    event.preventDefault();
  };

  const openPopup = (type, position) => {
    setPopupType(type);
    setPopupPosition(position);
  };

  const closePopup = () => {
    setPopupType(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupType &&
        !event.target.closest(".contextMenu") &&
        !event.target.closest(".popup")
      ) {
        closePopup();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [popupType]);

  return (
    <div
      className={`contextMenu ${popType === "right" ? "right" : ""}`}
      onContextMenu={handleContextMenuClick}
    >
      <div
        className="menu-item"
        onClick={(e) =>
          openPopup("AddFolder", { top: e.clientY, left: e.clientX + 10 })
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
        onClick={(e) =>
          openPopup("Add", { top: e.clientY, left: e.clientX + 10 })
        }
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
          openPopup("Edit", { top: e.clientY, left: e.clientX + 10 })
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
          openPopup("Delete", { top: e.clientY, left: e.clientX + 10 })
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
      {popupType && (
        <PopupComponent
          onClose={closePopup}
          actionType={popupType}
          style={{
            top: popupPosition.top,
            left: popupPosition.left,
            marginLeft: "10px",
          }}
        />
      )}
    </div>
  );
};

export default ContextMenu;
