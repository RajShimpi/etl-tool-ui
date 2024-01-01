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


const StepParameter = ({ stepId }) => {
    const [parameter, setparameter] = useState([]);
    useEffect(() => {
        axios.getWithCallback('step-type/parameter/get/', (data) => {setparameter (data[stepId].parameters); console.log(data) } )
       
    }, [])
    let defaultObj = {type:'',name:'', img: '', group:'',parametres:''};
    
const getItemData = (itemData  ) => {
  
    let dt= [
      {
        col: 12,
        callback: itemData.callback,
        groups: !!parameter
        ? parameter?.map((v) => {
            return {
              type: v.type.includes("text") ? "text" : v.type,
              id: v.type+v.id,
              label: v.description,
              name: v.name,
              control: v.type=="text" ? "input" : v.type,
              options: v.options,
              disabled: false,
             
              itemVal: itemData.values
                ? itemData.values[v.name]
                : "",
              multiple: v.type === "select-react" ? true : "",
            };
          })
        : [],
    },
    ];
    console.log(dt)
    return dt
  };

    return (
        <>
          <CommonModel
                formDataAction={getItemData}
                columns={config.STEP_PARAMETER}
                insertApi="step-type"
                updateApi="step-type/parameter/get:id"
                getApi="step-type/parameter/get"
                title="step-parameter"
                defaultObj={defaultObj}
                options={[]}
                tableTitle='step-parameter'            
            />
        </>
    );
};

export default StepParameter;