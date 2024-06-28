import React, { useContext, useEffect, useState } from "react";
import $ from "jquery";
import DataTable from "./data-table";
import FormCommon from "./form-common";
import _ from "lodash";
import auth from "../user/auth";
import axios from "../services/axios";
import configContext from "../dashboard/config-context";
import { errorAlert } from "./config/alert";
import utils from "./utils";
import CommonTable from "./common-table";
import CustomButton from "./custom-button";
import { useData } from "../../components/JobDataContext";

const CommonFormWithList = (props) => {
  const contextData = useContext(configContext);
  const [update, setUpdate] = useState(false);
  const formDataAction = props.formDataAction;
  const columns = props.columns;
  const [data, setData] = useState({ ...props.defaultObj });
  const [dataTableData, setDataTableData] = useState({
    data: [],
    columns: [],
    filterColumnName: [],
  });
  const [otherData, setOtherData] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [buttonsTrue, setButtonTrue] = useState(true);
  const filterExcludes = [
    "createdbyName",
    "createdDate",
    "updatedbyName",
    "updatedDate",
    "active",
  ];

  const filterColumnName = _.filter(
    props.columns,
    (x) => !filterExcludes.includes(x)
  );
  const { setJobName, setJobProjectId } = useData([]);
  const [list, setList] = useState([]);
  const [keys, setKeys] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [resetparamsTable, setResetparamsTable] = useState(false);

  const setValues = (e, name) => {
    if (!e) return;
    switch (name) {
      case "gender":
      case "type":
        setData((prevState) => ({ ...prevState, [name]: e.value }));
        break;
      case "userRoles":
        if (data[name]?.length === e.length) return;
        setData((prevState) => ({
          ...prevState,
          [name]: e.map((x) => parseInt(x.value)),
        }));
        break;
      case "ControlName":
      case "userId":
      case "addLink":
      case "updateLink":
      case "listLink":
      case "widgetType":
        setData((prevState) => ({ ...prevState, [name]: e.value }));
        break;
      case "manager":
        setData((prevState) => ({ ...prevState, [name]: e.uniqueVal }));
        break;
      case "departmentId":
      case "branchId":
      case "experimentParameterId":
      case "finalParameterId":
      case "menuParentId":
      case "conclusionTypeId":
      case "client_id":
        setData((prevState) => ({ ...prevState, [name]: parseInt(e.value) }));
        break;
      case "role":
        setData((prevState) => ({
          ...prevState,
          [name]: e.label,
          [`${name}Id`]: e.value,
        }));
        break;
      case "whsId":
        setData((prevState) => ({ ...prevState, [name]: parseInt(e.value) }));
        break;
      case "client_id":
      case "parent_id":
      case "step_id":
      case "parameter_id":
      case "project_id":
      case "job_id":
      case "dashboard_id":
      case "question_id":
        setData((prevState) => ({ ...prevState, [name]: parseInt(e.value) }));
        break;
      case "TemplateItemId":
      case "TemplateId":
        data[name] = parseInt(e.value);
        break;
      case "padding":
        setData((prevState) => ({
          ...prevState,
          [name]: parseInt(e.target.value),
        }));
        break;
      case "params":
        setData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
        if (
          checkValidation(
            () => isJsonString(e.target.value),
            e.target.name,
            "Params should be in JSON format."
          )
        )
          return;
        break;
      case "input":
      case "type":
        setData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
        break;
      case "checkbox":
        setData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.checked,
        }));
        // data.active = e.target.checked;
        break;
      case "adlInstrumnetsTestsMap":
        if (data[name]?.length === e?.length) return;
        setData((prevState) => ({
          ...prevState,
          [name]: e?.map((x) => parseInt(x.value)),
        }));
        break;
      case "file":
        let imags = update && data[e.target.name] ? data[e.target.name] : [];
        for (var i = 0; i < e.target.files.length; i++) {
          let fileName = e.target.files[i].name;
          let type = e.target.files[i].type;
          let size = e.target.files[i].size;
          if (
            !checkValidation(
              () => size > parseInt(contextData?.config?.MAX_FILE_SIZE),
              e.target.name,
              "File Should not be greter then 2MB"
            )
          )
            return;
          const filereader = new FileReader();
          filereader.readAsDataURL(e.target.files[i]);
          filereader.onload = () => {
            imags.push({
              fileName: fileName,
              size: size,
              type: type,
              fileBase64String: filereader.result,
            });
            setData((prevState) => ({ ...prevState, [e.target.name]: imags }));
            //data[e.target.name] = imags;
          };
        }
        break;
      case "warehouse":
      case "binLocation":
        setData((prevState) => ({
          ...prevState,
          [name]: e.label,
          [`${name}Id`]: e.value,
        }));
        break;
      case "manager-user":
        setData((prevState) => ({ ...prevState, manager: e.value }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

  useEffect(()=>{
    if(data?.project_id){
      setJobProjectId(data?.project_id)
    }
  })

  useEffect(() => {
    setData((prevState) => ({
      ...prevState,
      journal_code: props.defaultObj?.journal_code,
    }));
  }, [props]);

  useEffect(() => {
    const forecRun = [
      {
        name: props.name,
        color: props.color,
        function: props.function,
        icon:props.icon,
        disabled: buttonsTrue,
      },
    ];
    setButtons(forecRun);
  }, [props, buttonsTrue]);
// console.log(props);
  const apiCall = () => {
    axios.getWithCallback(
      props.getApi,
      (resp) => {
        let listData;
        if (props.processListCallback) {
          listData = props.processListCallback(resp);
          setList(listData);
        } else {
          listData = resp;
          setList(listData);
        }
        let keies = utils.extractColumns(listData[0], columns);
        setKeys(keies);
      },
      null,
      props.apiCallerKey
    );
  };
  const checkValidation = (func, propName, msg) => {
    if (func()) {
      if (props.validationCallback) {
        props.validationCallback(propName, msg);
      } else {
        errorAlert(msg);
      }
      setData((prevState) => ({
        ...prevState,
        [propName]: data[propName] ?? "",
      }));
      return false;
    } else {
      props.validationCallback(propName, "");
    }
    return true;
  };

  const onReset = (e) => {
    setData({ ...props.defaultObj });
    setUpdate(true);
    setButtonTrue(true);
    setUpdate(false);
    setIsSubmit(false);
    if (props.validationCallback) {
      props.validationCallback(null);
    }
    let form = $(e.target).closest("form");
    form[0].classList.remove("was-validated");
    setResetparamsTable(true);
    setOtherData([]);
  };

  const editCallBack = (item) => {
    setButtonTrue(false);
    setJobName(item);
    setUpdate(true);
    if (props.getById) {
      axios.getWithCallback(props.getById.replace(":id", item.id), (data) => {
        setData(data);
        setOtherData(processTableParams(data));
      });
    } else {
      setData(item);
      setOtherData(processTableParams(item.otherParams));
    }
  };

  const deleteCallback = (item) => {
    if(props.deleteApi){
    axios.deleteWithCallback(
      props.deleteApi.replace(":id", item.id))}
  };

  const processTableParams = (data) => {
    let obj;
    return data?.map((x, index) => {
      props.otherParamColumns?.forEach((col) => {
        obj = { ...obj, [col.name]: x[col.dbPropName] };
      });
      return {
        ...x,
        ...obj,
      };
    });
  };

  const deleteImage = (e, item, index) => {
    let arr = [];
    data[item].splice(index, 1);
    data[item].forEach((x) => arr.push(x));
    setData((prevData) => ({ ...prevData }));
  };

  useEffect(() => {
    setDataTableData({
      data: list,
      columns: keys,
      filterColumnName: filterColumnName,
      editCallBack,
      deleteCallback,
      isEdit: true,
      isDelete: true,
      tableTitle: props.tableTitle ? props.tableTitle : "",
    });
  }, [list, keys]);
  const isFilePresent = () => {
    let dt = [];
    props.fileObjKey.forEach((x) => {
      if (!!data[x]) {
        dt.push(...data[x]);
      }
    });
    return !!dt?.length;
  };

  const isJsonString = (str) => {
    if (!str) return false;
    try {
      JSON.parse(str);
    } catch (e) {
      return true;
    }
    return false;
  };

  const otherCallback = (data) => {
    let sp = data.map((x) => {
      let obj;
      props.otherParamColumns.forEach((col) => {
        obj = { ...obj, [col.dbPropName]: x[col.name] };
      });
      return {
        ...x,
        ...obj,
      };
    });

    if (!_.isEqual(otherData, sp)) {
      setOtherData(sp);
    }
  };

  const onsubmit = (e) => {
    if (update) {
      data.lastChangedBy = auth.getStorageData("id");
    } else {
      data.createdBy = auth.getStorageData("id");
      data.lastChangedBy = auth.getStorageData("id");
    }
    e.preventDefault();
    if (!e.target.checkValidity()) {
      e.stopPropagation();
      e.target.classList.add("was-validated");
      //props.validationCallback(true);
    } else {
      if (props.jsonParam && data[props.jsonParam]) {
        if (props.jsonParam !== null) {
          data[props.jsonParam] = JSON.parse(data[props.jsonParam]);
        }
        // data[props.jsonParam] = JSON.parse(data[props.jsonParam])
      }
      if (update) {
        const hasUpdateApiCallback = !!props.updateApiCallback;
        const postData = hasUpdateApiCallback
          ? props.updateApiCallback(data)
          : data;
        axios.putWithCallback(
          props.updateApi.replace(":id", postData.id),
          { ...postData, otherParams: otherData },
          (resp) => {
            setUpdate(true);
            setUpdate(false);
            setData({ ...props.defaultObj });
            setIsSubmit(false);
            setResetparamsTable(true);
            setOtherData([]);
            setButtonTrue(true)
            apiCall();
            e.target.classList.remove("was-validated");
            if (!!props.validationCallback) props.validationCallback(null);
          },
          null,
          props.apiCallerKey
        );
      } else {
        axios.postWithCallback(
          props.insertApi,
          { ...data, otherParams: otherData },
          (resp) => {
            if (props.createDefaultObject) {
              props.createDefaultObject();
            }
            setData({ ...props.defaultObj });
            setUpdate(true);
            setUpdate(false);
            setIsSubmit(false);
            setResetparamsTable(true);
            setOtherData([]);
            setButtonTrue(true)
            apiCall();
            e.target.classList.remove("was-validated");
            if (!!props.validationCallback) props.validationCallback(null);
          },
          null,
          props.apiCallerKey
        );
      }
    }
  };

  return (
    <div className="row">
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
                    aria-expanded="false"
                    aria-controls="collapseOne"
                  >
                    {props.title}
                  </button>
                </h2>
              </div>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent={"common-form-" + props.title}
              >
                <div className="accordion-body text-muted">
                  <div className="card-body ">
                    <FormCommon
                      data={formDataAction({
                        isSubmit,
                        update: update,
                        callback: setValues,
                        values: data,
                        options: !!props.options ? props.options : [],
                        data: !!props.data ? props.data : [],
                        message: props.message,
                        isSuperAdmin: props.isSuperAdmin,
                      })}
                    />
                  </div>
                  {props.otherParamColumns && (
                    <CommonTable
                      btnName={props.btnName}
                      data={otherData}
                      columns={props.otherParamColumns}
                      callback={otherCallback}
                      marginTop={props?.marginTop}
                      resetparamsTable={resetparamsTable}
                    />
                  )}
                  {props.fileObjKey && isFilePresent() && (
                    <table className="table table-striped table-bordered dt-responsive">
                      <thead
                        style={{
                          backgroundColor: "rgb(60, 141, 188)",
                          color: "white",
                        }}
                      >
                        <tr>
                          <th>Document Type</th>
                          <th>Document Name</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.fileObjKey.map((item) => (
                          <React.Fragment key={"react" + item}>
                            {data[item] &&
                              Array.isArray(data[item]) &&
                              data[item].map((file, fileIndex) => (
                                <tr key={file.fileName + fileIndex + item}>
                                  <td key={"fileName" + fileIndex + item}>
                                    {item.charAt(0).toUpperCase() +
                                      item
                                        .slice(1)
                                        .replace(/([A-Z])/g, " $1")
                                        .trim()}
                                  </td>
                                  <td key={"fileLink" + fileIndex + item}>
                                    <a
                                      key={file.fileName + item + "anchor"}
                                      rel="noreferrer"
                                      target="_blank"
                                      href={file.fileBase64String}
                                      download={file.fileName}
                                    >
                                      {file.fileName}
                                    </a>
                                  </td>
                                  <td key={"deleteFile" + fileIndex + item}>
                                    <button
                                      key={"imgBtn" + fileIndex + item}
                                      type="button"
                                      className="btn btn-link"
                                      onClick={(e) =>
                                        deleteImage(e, item, fileIndex)
                                      }
                                    >
                                      <i className="fa fa-window-close"></i>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  )}
                  <div className=" col-md-12 d-flex justify-content-end">
                    {buttons && <CustomButton button={buttons} />}
                    <button
                      type="submit"
                      onClick={() => setIsSubmit(true)}
                      disabled={
                        props.disabledAdd && !update
                          ? true
                          : props.message
                          ? Object.keys(props.message).length === 0 ||
                            !props.message[Object.keys(props.message)[0]]
                            ? false
                            : true
                          : false
                      }
                      style={{ marginRight: "1%" }}
                      className={
                        update
                          ? "btn mx-2 btn-update w-xs waves-effect waves-light"
                          : "btn mx-1 btn-add w-xs waves-effect waves-light"
                      }
                    >
                      {update ? (
                        <i className="fa fa-edit"></i>
                      ) : (
                        <i className="fa fa-plus"></i>
                      )}
                      {update ? " Update" : " Add"}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => onReset(e)}
                      className="btn btn-warning w-xs waves-effect waves-light"
                    >
                      <i className="fa fa-undo"></i>
                      <span className="custom-ml-1">Reset</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="col-md-12 ">
        <DataTable {...dataTableData} />
      </div>
    </div>
  );
};

export default CommonFormWithList;
