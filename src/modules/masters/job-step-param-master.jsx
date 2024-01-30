import axios from '../services/axios';
// import config from "../../components/config/config.json";
// import CommonModel from '../../components/common-modal';
import React, { useState, useEffect } from 'react';
import FormCommon from '../components/form-common';
import _ from 'lodash';


const JobStepParameterMaster = ({ node_Id, job_id, step_type_id, name, handleClose }) => {
    console.log(node_Id, "name");
    const [parameter, setparameter] = useState([]);
    const [editName, setEditName] = useState('');    
    const [controlData, setControlData] = useState([]);
    const [jobStepParamData, setJobStepParamData] = useState([]);
    const [update, setUpdate] = useState(false);
    const [data, setData] = useState(null);
    const [nameValue, setNameValue] = useState([]);
    const [isOtherParamVisible, setOtherParamVisible] = useState(false);
    
    const colSize = parameter.length <= 2 ? 6 : 4;

    useEffect(() => {
      setData((prevData) => ({ ...prevData, step_name: name }));
    }, [name]);

   

    useEffect(() => {
      const fetchData = async () => {
        try {
          await axios.getWithCallback(`step-type/parameter/get/${step_type_id || 0}`, async (data) => {
            const options = {};
            await Promise.all(data.parameters.map(async (parameter) => {
              const resource = parameter?.resource;
              if (resource && resource != "NA") {
                try {
                  const resourceData = await axios.get(`${resource}`);
                  parameter.options =  resourceData.data;
                } catch (error) {
                  console.error(`Error fetching resource ${resource}:`, error);
                }
              }
              
            }));
            
            setparameter(data.parameters);
          });
          // console.log(response);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
  
      fetchData();
    }, [step_type_id]);
  
    useEffect(() => {
      if(node_Id) {
      axios.getWithCallback(`job-steps/${node_Id || 0}`, (data) => setEditName(data));
      axios.getWithCallback(`job-step-parameters/${node_Id}`, (data) => {
          if(data?.length) {
            setUpdate(true);
            setJobStepParamData(data);
          data.forEach(x => {
              setData((prevData) => ({ ...prevData, [x.parameter_name]: x.value, [`${x.parameter_name}_id`]: x.value_id }))
          });
        } else {
        setUpdate(false);
        }
       });
      }
    }, [node_Id]);
   console.log(editName);
  
    let defaultObj = { step_name: "", type: '', name: '', img: '', group: '', parametres: '' };
    // console.log(parameter, "parameter");
    const getItemData = (itemData) => {
      if(!itemData)
        return;
      let dt = [
        {
          col: 12,
          callback: itemData.callback,
          groups: [editName]
            ? [editName].map((v) => ({
                id: "inputparameterFileid",
                label: "Step Name",
                name: "step_name",                
                control: "input",
                isSubmit: itemData.isSubmit,                
                itemVal: itemData.values ? itemData.values["step_name"] : '',
              }))
            : [],
        },
        {
          col: colSize,
          callback: itemData.callback,
          groups: !!parameter
            ? parameter?.filter(x=> x.name !== "other").map((v) => ({
                type: v.type.includes("text") ? "text" : v.type,
                id: v.type + v.id,
                label: v.description,
                name: v.name,
                control: v.type === "text" ? "input" : v.type,
                options: v.options,
                disabled: false,
                itemVal: itemData.values ? itemData.values[v.name] : "",
                multiple: v.type === "select-react" ? true : "",
                isGeneric: true
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
      console.log("de:",dt)
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
        message: ''
      });
    }, [editName, parameter])
    
      const setValues = (e, name) => {
        if (!e) return;
        switch (name) {
          case "input":
              setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value}));              
            break;
          case "select":
            setData((prevData) => ({ ...prevData, [e.label]: e.text, [`${e.label}_id`]: e.value }));   
            break;
          
            }
    }

    useEffect(() => {
      let param = parameter?.find(x => x.name == "other");
      if(!!param && jobStepParamData?.length) {
         let dt = jobStepParamData.filter(x => x.parameter_id === param.id);
         setNameValue(dt.map((x, index) => {
          return {
            id: index + 1,
            [`name_${index + 1}`]: x.parameter_name,
            [`value_${index + 1}`]: x.value,
          }
         }))
      }
    }, [jobStepParamData, parameter])

    const prepareData = () => {
      let columns = Object.getOwnPropertyNames(data);
      return columns.filter(x => x != 'step_name').map((col) => {
        var param = parameter.find(x => x.name === col);
        if(!param) {
          return null;
        }
        
        let item = jobStepParamData.find(x => x.parameter_name === col);
        if(item) {
          item.value = data[col];
          item.value_id = data[`${col}_id`] 
          return item;
        } else {

        return { job_id: job_id, 
          step_id: node_Id, 
          step_type_id: step_type_id, 
          parameter_id: param.id, 
          parameter_name: col,  
          value: data[col], 
          value_id: data[`${col}_id`]  };
        }
      }).filter(x => x !== null);
    }

    const prepareOtherParams = () => {
      var param = parameter.find(x => x.name === "other");
      
      return nameValue.map((x, index) => {
        var item = jobStepParamData.find(y => y.parameter_name === x[`name_${index + 1}`]);
        if(item) {
          item.parameter_name= x[`name_${index + 1}`];  
          item.value= x[`value_${index + 1}`]; 
          return item;
        } else {
        return { job_id: job_id, 
          step_id: node_Id, 
          step_type_id: step_type_id, 
          parameter_id: param.id, 
          parameter_name: x[`name_${index + 1}`],  
          value: x[`value_${index + 1}`], 
            };
          }
        }
      );
    }

    const onClick = (e) => {
      e.preventDefault();
      setNameValue((prevData) => ([ ...prevData, { id: prevData?.length ? prevData.length + 1 : 1 }]))
    }

    const onRemove = (e, id) => {
      e.preventDefault();
      setNameValue(nameValue.filter(x => x.id !== id));
    }

    const onChange = (e, obj) => {
       var item = nameValue.find(x => x.id === obj.id);
        item[e.target.name] = e.target.value;
        setNameValue((prevData) => ([...prevData]));
    }
  
  
    const onsubmit = (e) => {
      e.preventDefault();
      if (!e.target.checkValidity()) {
        e.stopPropagation();
        e.target.classList.add("was-validated");
        //props.validationCallback(true);
      } else {
        axios.putWithCallback(`job-steps/${node_Id}/name-save`, { step_name: data["step_name"]  }, (data) => {
          
        })
        var dt = prepareOtherParams();
        var dt1 = prepareData();
        axios.postWithCallback("job-step-parameters", _.concat(dt1, dt), (data) => {
          setUpdate(false);
          handleClose();
        })
        // let item = { id:props.item.id, file_name: data.file_name, project_id: props.item.project_id, type: props.type.includes("Folder") ? 'Folder' : 'File', parent_id: props.item?.id };
        
      }
    }
  
      return (<div className="row">
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
                    {name}
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
                 
                   <FormCommon
                      data={controlData}                    
                    />
                  
                  </div>
                 {!!parameter.filter(x => x.name === "other")?.length &&  <div style={{ padding: "0px 0px 20px 20px" }}>
                    <button type="button" className='btn btn-primary' onClick={(e) => onClick(e)}>
                        <i className='fa fa-plus' />
                        Additional Parameter
                    </button>
                  </div>}
                  <div>
                  {!!nameValue?.length && <table className="table table-striped table-bordered dt-responsive">
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
                          <td><input type="text" name={`name_${x.id}`} value={x[`name_${x.id}`]} onChange={(e) => {onChange(e, x)}} /></td>
                          <td><input type="text" name={`value_${x.id}`} value={x[`value_${x.id}`]} onChange={(e) => {onChange(e, x)}} /></td>
                          
                          <td>
                      
                            <button type="button" className='btn' onClick={(e) => onRemove(e, x.id)}>
                                <i className='fa fa-trash' />                              
                            </button>
                          </td>
                        </tr>
                        ))}
                        </tbody>
                    </table>}
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
                        {update
                            ? "Update" : "Add"}
                        </button>
                        <button
                        type="button"
                        onClick={(e) =>  { setUpdate(false); handleClose();}}
                        className="btn btn-warning w-xs waves-effect waves-light"
                          
                        
                        >
                        Close
                        </button>
                  </div>
                  </div></div></div></form></div></div></div>) 
  }

  export default JobStepParameterMaster;
  