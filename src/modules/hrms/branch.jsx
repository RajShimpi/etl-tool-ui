
import CommonFormWithList from "../components/common-form-with-list";
import { getBranchFields } from "./branch-data";
import config from "../components/config/config.json"
import { useEffect, useState } from "react";
import axios from "../services/axios";
//import baseApiCaller from "../services/baseApiCaller";
//import hrmsapis from "../services/hrmsapis";
export const Branch = (props) => {

    const [branches, setBranches] = useState([]);
    
    let defaultObj = { name:'', active: true };

    useEffect(() => {
        axios.getWithCallback("branch/", (data) => setBranches(data.map(x => { return { value: x.id, label: x.name  }})), null, "HRMS");
    }, [])
    // const processList = (list) => {
    //     return list.map(x =>  { return { ...x, templateId: x.id}});
    // }
    return (<CommonFormWithList 
    formDataAction={getBranchFields}
    columns={config.BRNACH_COLUMNS}
    insertApi="branch"
    updateApi="branch/:id"
    getApi="branch"
    title="Add/Update Branches"
    defaultObj={defaultObj}
    options={branches}
    //apiCaller={hrmsapis}
    apiCallerKey="HRMS"
    tableTitle='Branch Master'
    />)
}