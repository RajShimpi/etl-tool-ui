import React, { useEffect, useState } from "react";
import Folder from "../modules/masters/popup/add-folder";
import AddFile from "../modules/masters/popup/add-file";
import Edit from "../modules/masters/popup/edit-file";
import Delete from "../modules/masters/popup/delete";
import axios from "../modules/services/axios";
import FormCommon from "../modules/components/form-common";
import { getCommonFields } from "../modules/masters/popup/common-data";
import auth from "../modules/user/auth";

const PopupComponent = ({ onClose, actionType, project_id, id }) => {
  let contentComponent;

  switch (actionType) {
    case "AddFolder":
      contentComponent = (
        <Folder project_id={project_id} id={id} type="Folder" onClose={onClose} />
      );
      break;
    case "AddFile":
      contentComponent = (
        <AddFile project_id={project_id} id={id} type="File" onClose={onClose} />
      );
      break;
    case "Edit":
      contentComponent = (
        <Edit project_id={project_id} parent_id={id} onClose={onClose} />
      );
      break;
    case "Delete":
      contentComponent = (
        <Delete project_id={project_id} parent_id={id} onClose={onClose} />
      );
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

export const AddUpdateDeleteFileAndFolder = (props) => {
  const [data, setData] = useState("");

  useEffect(() => {
    if (props.item?.file_name)
      setData({ file_name: props.type == "Edit" ? props.item?.file_name : "" });
  }, [props.type, props.item?.file_name]);

  const setValues = (e, name) => {
    if (!e) return;
    switch (name) {
      case "input":
        setData({ [e.target.name]: e.target.value });
        break;
    }
  };

  // const clientid = auth.getStorageData("client_id");
  const onsubmit = (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      e.stopPropagation();
      e.target.classList.add("was-validated");
      //props.validationCallback(true);
    } else {
      let item = {
        id: props.item.id,
        file_name: data.file_name,
        project_id: props.item.project_id,
        type: props.type.includes("Folder") ? "Folder" : "File",
        parent_id: props.item.id === 0 ? null : props.item.id,
        clientid: parseInt(auth.getStorageData("client_id")),
      };

      switch (props.type) {
        case "AddFolder":
          axios.postWithCallback("project-files", item, (resp) => {
            props.onClose(e, true);
          });
          break;
        case "AddFile":
          axios.postWithCallback("project-files", item, (resp) => {
            props.onClose(e, true);
          });
          break;
        case "Edit":
          axios.putWithCallback(
            `project-files/${item.id}`,
            { ...item, id: props.item?.id },
            (resp) => {
              props.onClose(e, true);
            }
          );
          break;
        case "Delete":
          axios.deleteWithCallback(
            "project-files/" + props.item?.id,
            item,
            (resp) => {
              props.onClose(e, true);
            }
          );
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="row ">
      <div className="col-xl-12 ">
        <div className="card">
          <form onSubmit={(e) => onsubmit(e)} className="needs-validation" noValidate >
            <div className="accordion" id={"common-form-" + props.title}>
              <div className="accordion-item" style={{ margin: "0px" }}>
                <h2 className="accordion-header" id="headingOne">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" >
                    {props.title}
                  </button>
                </h2>
              </div>
              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent={"common-form-" + props.title}>
                <div className="accordion-body text-muted">
                  <div className="card-body">
                    {props.type == "Delete" ? (
                      <p style={{ whiteSpace: "pre-wrap" }}>
                        Are you sure you want delete this folder undelaying
                        files also will be deleted?
                      </p>
                    ) : (
                      <FormCommon
                        data={getCommonFields({
                          isSubmit: false,
                          update: props.update,
                          callback: setValues,
                          values: data,
                          type: props.type.includes("Folder") ? "Folder" : "File",
                          options: !!props.options ? props.options : [],
                          data: !!props.data ? props.data : [],
                          message: props.message,
                        })}
                      />
                    )}
                  </div>
                  <div className=" col-md-12 d-flex justify-content-end">
                    <button type="submit"
                      className={
                        props.update
                          ? "btn mx-2 btn-update w-xs waves-effect waves-light"
                          : "btn mx-1 btn-add w-xs waves-effect waves-light"
                      }>
                      {props.type}
                    </button>
                    <button type="button" onClick={(e) => props.onClose(e)} className="btn btn-warning w-xs waves-effect waves-light">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
