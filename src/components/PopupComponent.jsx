import React, { useState } from "react";
import Folder from "../modules/masters/popup/add-folder";
import AddFile from "../modules/masters/popup/add-file";
import Edit from "../modules/masters/popup/edit-file";
import Delete from "../modules/masters/popup/delete";
import { getFolderFields } from '../modules/masters/popup/add-folder-data';
import axios from "../modules/services/axios";
import FormCommon from "../modules/components/form-common";

const PopupComponent = ({ onClose, actionType, project_id, id, popType }) => {
  let contentComponent;

  switch (actionType) {
    case "AddFolder":
      contentComponent = (<Folder project_id={project_id} id={id} onClose={onClose} />);
      break;
    case "Add":
      contentComponent = (<AddFile project_id={project_id} id={id} onClose={onClose} />);
      break;
    case "Edit":
      contentComponent = (<Edit project_id={project_id} parent_id={id} onClose={onClose} /> );
      break;
    case "Delete":
      contentComponent = (<Delete project_id={project_id} parent_id={id} onClose={onClose} /> );
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

const AddUpdateDeleteFileAndFolder = (props) => {
  const [data, setData] = useState("");
  
    const setValues = (e, name) => {
      if (!e) return;
      switch (name) {
        case "file_name":
            setData(e.target.value);
          break;
          }
  }


  const onSubmit = (e) => {
      
  }

    return (<div className="row">
    <div className="col-xl-12">
      <div className="card">
        <form
          onSubmit={(e) => onsubmit(e)}
          className="needs-validation"
          noValidate
        >
          <div className="accordion" id={"common-form-" + props.title}>
            <div className="accordion-item" style={{ margin: "0px" }}>
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  {props.title}
                </button>
              </h2>
            </div>
            <div  id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent={"common-form-" + props.title} >
              <div className="accordion-body text-muted">
                <div className="card-body">
                  <FormCommon
                    data={getFolderFields({
                      isSubmit: false,
                      update: props.update,
                      callback: setValues,
                      values: data,
                      options: !!props.options ? props.options : [],
                      data: !!props.data ? props.data : [],
                      message: props.message,
                    })}
                  />
                </div>
                <div className=" col-md-12 d-flex justify-content-end">
                    <button type="submit" className={  props.update? "btn mx-2 btn-update w-xs waves-effect waves-light": "btn mx-1 btn-add w-xs waves-effect waves-light" }>
                      {props.type}
                      </button>
                </div>
                </div>
                </div>
                </div>
                </form>
                </div>
                </div>
                </div>) 
}