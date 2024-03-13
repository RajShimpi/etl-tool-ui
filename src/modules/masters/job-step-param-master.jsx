import axios from "../services/axios";
import React, { useState, useEffect } from "react";
import FormCommon from "../components/form-common";
import _ from "lodash";

const JobStepParameterMaster = ({
  node_id,
  job_id,
  step_type_id,
  name,
  handleClose,
  nodes,
  setNodeNames,
}) => {
  const [parameter, setparameter] = useState([]);
  const [otherparameters, setotherParameters] = useState([]);
  const [editName, setEditName] = useState("");
  const [controlData, setControlData] = useState([]);
  const [jobStepParamData, setJobStepParamData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState(null);
  const [nameValue, setNameValue] = useState([]);
  const [step, setStep] = useState();
  const [nodeid, setNodeid] = useState();
  const [steptype, setSteptype] = useState();
  const [nodeName, setNodesName] = useState();
  // const [isOtherParamVisible, setOtherParamVisible] = useState(false);
  const colSize = parameter.length < 2 ? 12 : parameter.length < 3 ? 6 : parameter.length < 4 ? 4 : parameter.length < 5 ? 6 : 4;

  useEffect(() => {
    setStep(step_type_id);
    setNodeid(node_id)
  }, [name]);

  useEffect(() => {
    setNodesName(
      nodes.map((item) => ({
        id: item.id,
        step_name: item.data.heading,
        job_id: item.job_id,
      }))
    );
  }, []);

  useEffect(() => {
    if (nodeid != node_id) {
      setData([])
      setControlData([]);
      setotherParameters([]);
      setparameter([])
      setNameValue([])
      setJobStepParamData([])
    }
  }, [node_id, nodeid]);


  useEffect(() => {

    if (step_type_id) {
      axios.getWithCallback(
        `step-type/parameter/get/${step_type_id}`,
        async (data) => {
          const options = {};
          await Promise.all(
            data.stepTypeParameters.map(async (parameter) => {
              let resource = parameter.parameter?.resource;
              var fieldMapping = parameter.parameter?.params;
              if (resource && resource != "NA") {
                try {
                  const replacements = {}
                  replacements['${job_id}'] = job_id
                  resource = resource.replace(/\$\{\w+\}/g, function (all) {
                    return replacements[all] || all;
                  });
                  let resourceData = await axios.get(`${resource}`);
                  parameter.options = resourceData.data.map(x => ({
                    value: fieldMapping && fieldMapping.value_field ? x[fieldMapping.value_field] : x.id,
                    label: fieldMapping && fieldMapping.label_field ? x[fieldMapping.label_field] : x.Name
                  }));
                } catch (error) {
                  console.error(`Error fetching resource ${resource}:`, error);
                }
              }
            })
          );
          setparameter(data.stepTypeParameters);
        }
      );
    }
  }, [step_type_id, job_id]);

  useEffect(() => {
    if (node_id) {
      axios.getWithCallback(`job-step-parameters/${node_id}`, (data) => {
        if (data?.length) {
          setUpdate(true);
          setJobStepParamData(data !== null ? data : null);
          data.forEach((x) => {
            setData((prevData) => ({
              ...prevData,
              [x.parameter_name]: x.value,
              [`${x.parameter_name}_id`]: x.value_id,
            }));
          });
        } else {
          setData(null);
          setUpdate(false);
        }
      });
      if (node_id) {
        axios.getWithCallback(`job-steps/${node_id}`, (data) =>
          setEditName(data)
        );
      }
      if (step_type_id) {
        axios.getWithCallback(`step-type/${step_type_id}`, (data) =>
          setSteptype(data.name)
        );
      }

      axios.getWithCallback(`parameter/`, (data) => setotherParameters(data));
    }
  }, [node_id, step_type_id, nodeid]);

  let defaultObj = {
    step_name: "",
    type: "",
    name: "",
    img: "",
    group: "",
    parametres: "",
  };

  const getItemData = (itemData) => {
    if (!itemData) return;
    setControlData([])
    let dt = [
      {
        col: 12,
        callback: itemData.callback,
        groups: [editName]
          ? [editName].map((v) => ({
            id: "stepnameid",
            label: "Step Name",
            name: "step_name",
            control: "input",
            isRequired: true,
            isSubmit: itemData.isSubmit,
            itemVal: update ? (itemData.name ? itemData.values["step_name"] : name) : (itemData.name ? itemData.values["step_name"] : "")
          }))
          : [],
      },
      {
        col: colSize,
        callback: itemData.callback,
        groups: !!parameter
          ? parameter
            ?.filter((x) => x.name !== "other")
            .map((v) => {
              return {
                type: v.parameter.type.includes("text") ? "text" : v.parameter.type,
                id: v.parameter.type + v.parameter.id,
                label: v.parameter.description,
                name: v.parameter.name,
                control: v.parameter.type === "text" ? "input" : v.parameter.type,
                options: v.parameter.options || v.options,
                disabled: false,
                itemVal: itemData.values ? itemData.values[v.parameter.name] : '',
                multiple: v.parameter.type === "select-react" ? true : false,
                isGeneric: true,
              };
            })
          : null
      }

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
  }, [editName, parameter, data, update]);

  const setValues = (e, name) => {
    if (!e) return;
    switch (name) {
      case "input":
        setData((prevData) =>
        ({
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
    let param = otherparameters?.find((x) => x.name == "other");
    if (!!param && jobStepParamData?.length) {
      let dt = jobStepParamData.filter(
        (x) => x.parameter_id === param.id
      );
      setNameValue(
        dt.map((x, index) => {
          return {
            id: index + 1,
            [`name_${index + 1}`]: x.parameter_name,
            [`value_${index + 1}`]: x.value,
          };
        })
      );
    }
  }, [jobStepParamData, parameter]);

  const prepareData = () => {
    let columns = Object.getOwnPropertyNames(data);
    return columns
      .filter((x) => x != "step_name")
      .map((col) => {
        var param = parameter.find((x) => x.parameter.name === col);
        if (!param) {
          return null;
        }

        let item = jobStepParamData.find((x) => x.parameter_name === col);
        if (item) {
          item.value = data[col];
          item.value_id = data[`${col}_id`];
          return item;
        } else {
          return {
            job_id: parseInt(job_id),
            step_id: node_id,
            step_type_id: parseInt(step_type_id),
            parameter_id: parseInt(param.parameter_id),
            parameter_name: col,
            value: data[col],
            value_id: data[`${col}_id`],
          };
        }
      })
      .filter((x) => x !== null);
  };

  const prepareOtherParams = () => {
    var param = otherparameters.find((x) => x.name === "other");
    return nameValue.map((x, index) => {
      var item = jobStepParamData.find(
        (y) => y.parameter_name === x[`name_${index + 1}`]
      );
      if (item) {
        item.parameter_name = x[`name_${index + 1}`];
        item.value = x[`value_${index + 1}`];
        return item;
      } else {
        return {
          job_id: parseInt(job_id),
          step_id: node_id,
          step_type_id: parseInt(step_type_id),
          parameter_id: parseInt(param.id),
          parameter_name: x[`name_${index + 1}`],
          value: x[`value_${index + 1}`],
        };
      }
    });
  };

  const onClick = (e) => {
    e.preventDefault();

    setNameValue((prevData) => [
      ...prevData,
      { id: prevData?.length ? prevData.length + 1 : 1 },
    ]);
  };

  const onRemove = (e, id) => {
    e.preventDefault();
    setNameValue(nameValue.filter((x) => x.id !== id));
  };

  const onChange = (e, obj) => {
    // setNameValue([])
    var item = nameValue.find((x) => x.id === obj.id);
    item[e.target.name] = e.target.value;
    setNameValue((prevData) => [...prevData]);
  };
  

  const onsubmit = (e) => {
    e.preventDefault();
    
    if (!e.target.checkValidity()) {
        e.stopPropagation();
        e.target.classList.add("was-validated");
        //props.validationCallback(true);
    } else {
        const step = nodeName.filter((item) => parseInt(item.id) !== node_id);
        const isStepNameUnique = step.every((node) => node.step_name !== data.step_name);
  
        if (!isStepNameUnique) {
            return alert("Step name must be unique.");
        }
  
        axios.putWithCallback(`job-steps/${node_id}/name-save`, { step_name: data.step_name }, (data) => {
            handleClose(data); 
            setNodeNames(data);
            // setUpdate(true); 
        });
  
        var dt = prepareOtherParams();
        var dt1 = prepareData();
        if ((dt !== null && dt.length > 0) || (dt1 !== null && dt1.length > 0)) { // Check if either dt or dt1 is not empty
            axios.postWithCallback("job-step-parameters", _.concat(dt1, dt), (data) => {
              setUpdate(true);
                handleClose();
            });
        }
    }
};

     

  return (
    <div className="row" style={{ height: "300px" }}>
      <div className="col-xl-12">
        <div className="card">
          <form
            onSubmit={(e) => onsubmit(e)}
            className="needs-validation"
            noValidate
          >
            <div className="accordion" id={"common-form-" + name}>
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
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>{name}</div>
                      <div>{steptype}</div>
                    </div>
                  </button>
                </h2>
              </div>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent={"common-form-" + name}
              >
                <div className="accordion-body text-muted">
                  <div className="card-body">
                    <FormCommon data={controlData} />
                  </div>
                  {!!otherparameters.filter((x) => x.name === "other")?.length && (
                    <div style={{ padding: "0px 0px 20px 20px" }}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => onClick(e)}
                      >
                        <i className="fa fa-plus" />
                        Additional Parameter
                      </button>
                    </div>
                  )}
                  <div style={{maxHeight:"190px" ,overflowY:"scroll" , scrollbarWidth: "thin" }}>
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
                                  name={`name_${x.id}`}
                                  value={x[`name_${x.id}`]}
                                  onChange={(e) => {
                                    onChange(e, x);
                                  }}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  name={`value_${x.id}`}
                                  value={x[`value_${x.id}`]}
                                  onChange={(e) => {
                                    onChange(e, x);
                                  }}
                                />
                              </td>

                              <td>
                                <button
                                  type="button"
                                  className="btn"
                                  onClick={(e) => onRemove(e, x.id)}
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
                        setUpdate(false);
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

export default JobStepParameterMaster;
