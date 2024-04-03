import axios from "../services/axios";
// import config from "../../components/config/config.json";
// import CommonModel from '../../components/common-modal';
import React, { useState, useEffect } from "react";
import FormCommon from "../components/form-common";
import _ from "lodash";
import auth from "../user/auth";

const JobParameterMaster = ({ job, project_id, handleClose,open }) => {
  const [parameter, setparameter] = useState([]);
  const [editName, setEditName] = useState("");
  const [controlData, setControlData] = useState([]);
  const [jobParamData, setJobParamData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState(null);
  const [nameValue, setNameValue] = useState([]);
  const [jobid, setJobid] = useState([]);

  // useEffect(() => {
  //   setData((prevData) => ({ ...prevData,  }));
  // }, [name]);
  
  useEffect(() => {
    if (jobid != job) {
      setData([])
      setControlData([]);
      setparameter([])
      setNameValue([])
    }
  }, [job]);
  useEffect(() => {
    if(job){
    setJobid(job)}
  }, [job]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.getWithCallback(`/parameter/context/job`, async (data) => {
          const options = {};
          await Promise.all(
            data.map(async (parameter) => {
              const resource = parameter?.resource;
              if (resource && resource !== "NA") {
                try {
                  const resourceData = await axios.get(`${resource}`);
                  parameter.options = resourceData.data;
                } catch (error) {
                  console.error(`Error fetching resource ${resource}:`, error);
                }
              }
            })
          );
          setparameter(data);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [jobid,open]);

  useEffect(() => {
    if (job) {
      axios.getWithCallback(`job-parameters/${job}`, (data) => {
        if (data?.length) {
          setUpdate(true);
          setJobParamData(data);
          data.forEach((x) => {
            setData((prevData) => ({
              ...prevData,
              [x.parameter_name]: x.value,
              [`${x.parameter_name}_id`]: x.value_id,
            }));
          });
        } else {
          setUpdate(false);
        }
      });
    }
  }, [jobid,open]);

  const getItemData = (itemData) => {
    if (!itemData) return;
    let dt = [
      {
        col: 4,
        callback: itemData.callback,
        groups: !!parameter
          ? parameter
              ?.filter((x) => x.name !== "other")
              .map((v) => ({
                type: v.type.includes("text") ? "text" : v.type,
                id: v.type + v.id,
                label: v.description,
                name: v.name,
                control: v.type === "text" ? "input" : v.type,
                options: v.options,
                disabled: false,
                itemVal: itemData.values ? itemData.values[v.name] : "",
                multiple: v.type === "select-react" ? true : "",

                isGeneric: true,
              }))
          : [],
      },
      // {
      //   col: 12,
      //   callback: itemData.callback,
      //   groups: !!parameter
      //     ? parameter?.map((v) => ({
      //         id: "inputparameterFileid",
      //         label: "edit Name",
      //         name: "parameter_name",
      //         options: itemData.options[0],
      //         control: "input",
      //         isSubmit: itemData.isSubmit,
      //         isRequired: !itemData?.values?.paramters,
      //         itemVal: itemData.values ? itemData.values["parameter_name"] : '',
      //       }))
      //     : [],
      // },
    ];
    setControlData(dt);
    return dt;
  };

  useEffect(() => {
    getItemData({
      isSubmit: false,
      update: update,
      callback: setValues,
      values: data,
      options: [],
      message: "",
    });
  }, [editName, parameter]);

  const setValues = (e, name) => {
    if (!e) return;
    switch (name) {
      case "input":
        setData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }));
        break;
      case "select":
        setData((prevData) => ({
          ...prevData,
          [e.label]: e.text,
          [`${e.label}_id`]: e.value,
        }));
        break;
    }
  };

  useEffect(() => {
    let param = parameter?.find((x) => x.name == "other");
    if (!param) {
      setNameValue([]);
    }
    if (!!param && jobParamData?.length) {
      let dt = jobParamData.filter((x) => x.parameter_id === param.id);
      let so = dt.map((x, index) => {
        return {
          sequence: x.sequence,
          [`name_${x.sequence}`]: x.parameter_name,
          [`value_${x.sequence}`]: x.value,
        };
      });
      setNameValue(so);
    }
  }, [jobParamData, parameter]);

  const prepareData = () => {
    let columns = Object.getOwnPropertyNames(data);
    var clientId = auth.getStorageData("client_id");
    return columns
      .map((col) => {
        var param = parameter.find((x) => x.name === col);
        if (!param) {
          return null;
        }

        let item = jobParamData.find((x) => x.parameter_name === col);
        if (item) {
          item.value = data[col];
          item.value_id = data[`${col}_id`];
          return item;
        } else {
          return {
            job_id: jobid,
            client_id: clientId,
            project_id: project_id,
            parameter_id: param.id,
            parameter_name: col,
            value: data[col],
            value_id: data[`${col}_id`],
          };
        }
      })
      .filter((x) => x !== null);
  };

  const prepareOtherParams = () => {
    var param = parameter.find((x) => x.name === "other");
    var clientId = auth.getStorageData("client_id");
    return nameValue.map((x, index) => {
      var item = jobParamData.find((y) => y.sequence === x.sequence);
      if (item) {
        item.parameter_name = x[`name_${x.sequence}`];
        item.value = x[`value_${x.sequence}`];
        return item;
      } else {
        return {
          job_id: jobid,
          parameter_id: param.id,
          parameter_name: x[`name_${x.sequence}`],
          value: x[`value_${x.sequence}`],
          sequence: x.sequence,
          client_id: clientId,
          project_id: project_id,
        };
      }
    });
  };

  const onClick = (e) => {
    e.preventDefault();
    let val = _.maxBy(nameValue, (x) => x.sequence);
    setNameValue((prevData) => [
      ...prevData,
      { sequence: val?.sequence ? val.sequence + 1 : 1 },
    ]);
  };

  const onRemove = (e, id) => {
    e.preventDefault();
    setNameValue(nameValue.filter((x) => x.sequence !== id));
  };

  const onChange = (e, obj) => {
    var item = nameValue.find((x) => x.sequence === obj.sequence);
    item[e.target.name] = e.target.value;
    setNameValue((prevData) => [...prevData]);
  };

  const onsubmit = (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      e.stopPropagation();
      e.target.classList.add("was-validated");
    } else {
      // axios.putWithCallback(`job-steps/${node_Id}/na`, { step_name: data["step_name"]  }, (data) => {
      // })
      var dt = prepareOtherParams();
      var dt1 = prepareData();
      axios.postWithCallback("job-parameters", _.concat(dt1, dt), (data) => {
        setUpdate(true);
        handleClose();
      });
      // let item = { id:props.item.sequence, file_name: data.file_name, project_id: props.item.project_id, type: props.type.includes("Folder") ? 'Folder' : 'File', parent_id: props.item?.sequence };
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
            <div className="accordion" id={"common-form-" + jobid}>
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
                    {"JobParameter"}
                  </button>
                </h2>
              </div>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent={"common-form-" + jobid}
              >
                <div className="accordion-body text-muted">
                  <div className="card-body">
                    <FormCommon data={controlData} />
                  </div>
                  {!!parameter.filter((x) => x.name === "other")?.length && (
                    <div style={{ padding: "0px 0px 20px 20px" }}>
                       <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => onClick(e)}
                        style={{ display: "flex" }}
                      >
                        <div style={{ fontSize: "16px" }}>
                          <i
                            className="fa fa-plus"
                            style={{ fontSize: "16px",  }}
                          />
                        </div>
                        <div style={{ fontSize: "14px", margin: "4px" }}>
                          Additional Parameter
                        </div>
                      </button>
                    </div>
                  )}
                  <div style={{ maxHeight: "190px", overflowY: "scroll", scrollbarWidth: "thin", }}>

                    {!!nameValue?.length && (
                      <table className="table table-striped table-bordered dt-responsive">
                        <thead
                          style={{
                            backgroundColor: "rgb(60, 141, 188)",
                            color: "white",
                          }}
                        >
                          <tr>
                            <th>Name</th>
                            <th>Value</th>
                            <th>Remove</th>
                          </tr>
                        </thead>
                        <tbody>
                          {nameValue.map((x, index) => (
                            <tr>
                              <td>
                                <input
                                  type="text"
                                  name={`name_${x.sequence}`}
                                  value={x[`name_${x.sequence}`]}
                                  onChange={(e) => {
                                    onChange(e, x);
                                  }}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  name={`value_${x.sequence}`}
                                  value={x[`value_${x.sequence}`]}
                                  onChange={(e) => {
                                    onChange(e, x);
                                  }}
                                />
                              </td>

                              <td>
                                <button
                                  type="button"
                                  className="btn"
                                  onClick={(e) => onRemove(e, x.sequence)}
                                >
                                  <i className="fa fa-trash" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                  <div className=" col-md-12 d-flex justify-content-end">
                    <button
                      type="submit"
                      className={
                        update
                          ? "btn mx-2 btn-update w-xs waves-effect waves-light"
                          : "btn mx-1 btn-add w-xs waves-effect waves-light"
                      }
                    >
                      {update ? "Update" : "Add"}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        handleClose();
                      }}
                      className="btn btn-warning w-xs waves-effect waves-light"
                    >
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

export default JobParameterMaster;
