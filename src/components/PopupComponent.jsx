import React from "react";
import Folder from "../modules/masters/popup/add-folder";
import AddFile from "../modules/masters/popup/add-file";
import Edit from "../modules/masters/popup/edit-file";
import Delete from "../modules/masters/popup/delete";

const PopupComponent = ({ onClose, actionType, project_id, id,parent_id }) => {
  let contentComponent;

  switch (actionType) {
    case "AddFolder":
      contentComponent = (
        <Folder project_id={project_id} parent_id={parent_id} />
      );
      break;
    case "Add":
      contentComponent = (
        <AddFile project_id={project_id} id={id} />
      );
      break;
    case "Edit":
      contentComponent = <Edit project_id={project_id} parent_id={parent_id} />;
      break;
    case "Delete":
      contentComponent = (
        <Delete project_id={project_id} parent_id={parent_id} />
      );
      break;
    default:
      contentComponent = null;
  }
  const hhh = () => {
    console.log( project_id);
    console.log(parent_id);
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <div style={{ flex: 1 }} onClick={hhh()}>
          {contentComponent}
        </div>
      </div>
    </div>
  );
};

export default PopupComponent;
