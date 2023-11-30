import React from "react";
import Folder from "../modules/masters/popup/add-folder";
import AddFile from "../modules/masters/popup/add-file";
import Edit from "../modules/masters/popup/edit-file";
import Delete from "../modules/masters/popup/delete"; 

const PopupComponent = ({ onClose, actionType }) => {
  let contentComponent;

  switch (actionType) {
    case "AddFolder":
      contentComponent = <Folder />;
      break;
    case "Add":
      contentComponent = <AddFile />;
      break;
    case "Edit":
      contentComponent = <Edit />;
      break;
    case "Delete":
      contentComponent = <Delete />;
      break;
    default:
      contentComponent = null;
  }

  return (
    <div className="popup">
      <div className="popup-content">
        <div style={{ flex: 1 }}>{contentComponent}</div>
      </div>
    </div>
  );
};

export default PopupComponent;
