import React, { useState, useEffect } from "react";
import "./MainComponent.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const ContextMenu = ({ item, popType, project_id, parent_id,id, onClose, callback, hideDeleteUpdate }) => {
  const [popupType, setPopupType] = useState(null);
  // const [popupPosition, setPopupPosition] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleContextMenuClick = (event) => {
    event.preventDefault();
  };

  const openPopup = (e,type) => {
    callback(item, type); 
    onClose(e, item);
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
  }, [popupType, isPopupOpen, onClose]);

  return (
    <div style={{zIndex:1}} className={`contextMenu ${popType === 'right' ? 'right' :''}`} onContextMenu={handleContextMenuClick}>
      {item.type !== "File" && <>
      <div className="menu-item" onClick={(e) => openPopup(e,"Add Folder", { top: e.clientY, left: e.clientX + 10 }, project_id, parent_id) }>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
          <FolderIcon style={{ fontSize: "20px", marginRight: "5px", marginTop: "5px" }}/>
          <div style={{ fontSize: "15px", fontWeight: "bold", marginTop: "5px" }}>Add Folder</div>
        </div>
      </div>
      <div className="menu-item" onClick={(e) => {openPopup(e,"Add Job", { top: e.clientY, left: e.clientX + 10 }, project_id, id)}}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", }}>
          <InsertDriveFileIcon style={{ fontSize: "20px", marginRight: "5px", marginTop: "5px" }} />
          <div style={{ fontSize: "15px", fontWeight: "bold", marginTop: "5px" }}>Add Job</div>
        </div>  
      </div>
      </>}
      {hideDeleteUpdate &&<>
      <div className="menu-item" onClick={(e) => {openPopup(e,"Add Propertie", { top: e.clientY, left: e.clientX + 10 }, project_id, id)}}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", }}>
          <img src="assets/images/addproperties.png" style={{ fontSize: "20px", marginRight: "5px", marginTop: "5px" }}/>
          <div  style={{ fontSize: "15px", fontWeight: "bold", marginTop: "5px" }}>Add Propertie</div>
        </div>  
      </div>
      </>
      }
      {!hideDeleteUpdate && <>
      <div className="menu-item" onClick={(e) => openPopup(e,"Edit", { top: e.clientY, left: e.clientX + 10 }, project_id, parent_id)}>
        <div style={{display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
          <EditIcon style={{ fontSize: "20px", marginRight: "5px", marginTop: "5px" }}/>
          <div style={{ fontSize: "15px", fontWeight: "bold", marginTop: "5px" }}>Edit</div>
        </div>
      </div>
      <div className="menu-item" onClick={(e) =>   openPopup(e,"Delete", { top: e.clientY, left: e.clientX + 10 }, project_id, parent_id) }> 
        <div style={{display: "flex", alignItems: "center", justifyContent: "flex-start", }} > 
          <DeleteIcon style={{ fontSize: "20px", marginRight: "5px", marginTop: "5px" }}/>
          <div style={{ fontSize: "15px", fontWeight: "bold", marginTop: "5px" }}>Delete</div>
        </div>
      </div>
      </>
      }
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