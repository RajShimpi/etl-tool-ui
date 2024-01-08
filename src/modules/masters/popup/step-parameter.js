import React, { useState, useEffect } from 'react';
// import CommonFormWithList from '../components/common-form-with-list';
// import config from "../components/config/config.json"
// import { getProjectFields } from './project-data';
// import axios from '../services/axios';
// import { getstepparameterFields } from './step-paramter-data';
import axios from '../../services/axios';
import CommonFormWithList from '../../components/common-form-with-list';
import config from "../../components/config/config.json"
import CommonModel from '../../components/common-modal';
import { getstepparameterFields } from './step-parameter-data';


const StepParameter = ({ stepId ,name}) => {
  // console.log(name,"name");
    const [parameter, setparameter] = useState([]);
      const [editName, setEditName] = useState('');
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.getWithCallback(`step-type/parameter/get/${stepId || 0}`, (data) => {
            const options = {};
             Promise.all(data.parameters.map(async (parameter) => {
              const resource = parameter?.resource;
              if (resource) {
                try {
                   axios.getWithCallback(`${resource}`, (data) => {
                    // console.log(resourceData);
                    parameter.options = data;
                  });
                } catch (error) {
                  console.error(`Error fetching resource ${resource}:`, error);
                }
              }
              // console.log(resource);
            }));
            setparameter(data.parameters);
          });
          // console.log(response);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData();
    }, [stepId]);
    
  
  // useEffect(() => {
  //   console.log(parameter, "parameter");
  // }, [parameter]);

    let defaultObj = {type: '', name: editName || '', img: '', group: '', parametres: '' };
    // console.log(parameter, "parameter");
    const getItemData = (itemData) => {
      let dt = [
        {
          col: 12,
          callback: itemData.callback,
          groups: !!parameter
            ? parameter?.map((v) => {
              return {
                type: v.type.includes("text") ? "text" : v.type,
                id: v.type + v.id,
                label: v.description,
                name: v.name,
                control: v.type === "text" ? "input" : v.type,
                options: v.options,
                disabled: false,
                itemVal: itemData.values ? itemData.values[v.name] : "",
                multiple: v.type === "select-react" ? true : "",
              };
            })
            : [],
        },
      ];
    
        const stepParameterFields = getstepparameterFields(itemData);
        dt[0].groups = dt[0].groups.concat(stepParameterFields[0].groups);
      
        dt[0].groups.forEach((group) => {
          group.name = editName; // Update the name field
        });
      
        // ...
      
        return dt;
      
      };
    

  // const renderList = () => {
  //   return parameter.map((item) => {
  //     if (item.type === 'select') {
  //       return (
  //         <div key={item.id}>   </div>
  //       );
  //     } else {
  //       return null; 
  //     }
  //   });
  // };

  // const [apiData, setApiData] = useState([]);
  // const [selectedItem, setSelectedItem] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`type-config/category?category=${config.CATEGORY.MATERIAL_TYPE}`);
  //       const data = await response.json();
  //       setApiData(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);




    return (
        <>
 {/* <input
  type="text"
  value={name}
  onChange={(e) => {
    setEditName(e.target.value);
    console.log('Updated editName:', e.target.value);
  }}

  
  placeholder="Edit Name"
/> */}
          <CommonModel
                formDataAction={getItemData}
                columns={config.STEP_PARAMETER}
                insertApi="step-type"
                updateApi="step-type/parameter/get:id"
                getApi="step-type/parameter/get"
                title= {name}
                defaultObj={defaultObj}
                options={[]}
                tableTitle='step-parameter'                        
            />           
        </>

    );
};

export default StepParameter;