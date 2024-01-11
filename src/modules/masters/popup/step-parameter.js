import React, { useState, useEffect } from 'react';
// import CommonFormWithList from '../components/common-form-with-list';
// import config from "../components/config/config.json"
// import { getProjectFields } from './project-data';
// import axios from '../services/axios';
import { getstepparameterFields } from './step-paramter-data';
import axios from '../../services/axios';
import CommonFormWithList from '../../components/common-form-with-list';
import config from "../../components/config/config.json"
import CommonModel from '../../components/common-modal';


const StepParameter = ({ node_Id, step_type_id, name }) => {
  console.log(node_Id, "name");
  const [parameter, setparameter] = useState([]);
  const [editName, setEditName] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.getWithCallback(`step-type/parameter/get/${step_type_id || 0}`, async (data) => {
          const options = {};
          await Promise.all(data.parameters.map(async (parameter) => {
            const resource = parameter?.resource;
            if (resource) {
              try {
                const resourceData = await axios.getWithCallback(`${resource}`);
                parameter.options = resourceData;
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
    axios.getWithCallback(`job-steps/${node_Id || 0}`, (data) => setEditName(data));
  }, []);
 console.log(editName);

  let defaultObj = { step_name:'',  type: '', name: '', img: '', group: '', parametres: '' };

  // console.log(parameter, "parameter");
  const getItemData = (itemData) => {
    let dt = [
      {
        col: 12,
        callback: itemData.callback,
        groups: [editName]
          ? [editName].map((v) => ({
              id: "inputparameterFileid",
              // label: v.step_name,
              name: "step_name"|| v.step_name,
              control: "input",
              isSubmit: itemData.isSubmit,
              itemVal: itemData.values ? itemData.values["step_name"] : v.step_name,
            }))
          : [],
      },
      {
        col: 12,
        callback: itemData.callback,
        groups: !!parameter
          ? parameter?.map((v) => ({
              type: v.type.includes("text") ? "text" : v.type,
              id: v.type + v.id,
              label: v.description,
              name: v.name,
              control: v.type === "text" ? "input" : v.type,
              options: v.options,
              disabled: false,
              itemVal: itemData.values ? itemData.values[v.name] : "",
              multiple: v.type === "select-react" ? true : "",
            }))
          : [],
      },
    ];
  
    return dt;
  };
  


  return (
    <>
      <CommonModel
        formDataAction={getItemData}
        columns={config.STEPTYPE}
        insertApi={`/job-steps/${node_Id || 0}/name-save` || "step-type"}
        getApi={`/job-steps/${node_Id || 0}/` || "step-type/parameter/get"}
        title={name}
        defaultObj={[defaultObj]}
        // options={[]}
        tableTitle='step-parameter'
      />

    </>
  );
};

export default StepParameter;