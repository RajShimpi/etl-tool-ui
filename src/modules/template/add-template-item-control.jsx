
// import CommonFormWithList from "../components/common-form-with-list";
// import { getTemplateItemControls } from "./template-data";
// import config from "../config/config.json"
// import { useEffect, useState } from "react";
// import axios from "../services/axios";
// export const AddTemplateItemControls = (props) => {

//     const [templateTypes, setTemplateTypes] = useState([]);
    
//     let defaultObj = { TemplateItemId: null, ControlName: '',   resourceName:'', active: true };
//     let controls = [{ value: "select", label:"select"}, { value: "text", label: "text"}];

//     useEffect(() => {
//         axios.getWithCallback("template/getall", (data) => setTemplateTypes(data.map(x => { return { value: x.id, label: x.TemplateContent  }})));
//     }, [])
//     // const processList = (list) => {
//     //     return list.map(x =>  { return { ...x, templateId: x.id}});
//     // }

//     return (<CommonFormWithList 
//     formDataAction={getTemplateItemControls}
//     columns={config.TEMPLATE_CONTROL_COLUMNS}
//     insertApi="template/save-template-item-control"
//     updateApi="template/update-template-item-control/:id"
//     getApi="template/get-all-controls"
//     title="Add/Update Template Items Controls"
//     defaultObj={defaultObj}    
//     options={[templateTypes, controls]}
    

//     />)
// }