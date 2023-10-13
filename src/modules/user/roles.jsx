
import CommonFormWithList from "../components/common-form-with-list";
import { getRoleFields } from "./roles-data";
import config from "../config/config.json"
import { useEffect, useState } from "react";
import axios from "../services/axios";
//import baseApiCaller from "../services/baseApiCaller";
//import hrmsapis from "../services/hrmsapis";
export const Roles = (props) => {

    // const [roles, setRoles] = useState([]);
    
    let defaultObj = { RoleName:'',RoleDisplayName:'', active: true };

    useEffect(() => {
        // axios.getWithCallback("user-roles/", (data) => setRoles(data.map(x => { return { value: x.id, label: x.name  }})));
    }, [])
    // const processList = (list) => {
    //     return list.map(x =>  { return { ...x, templateId: x.id}});
    // }
    return (<CommonFormWithList 
    formDataAction={getRoleFields}
    columns={config.ROLE_COLUMNS}
    insertApi="user-roles"
    updateApi="user-roles/:id"
    getApi="user-roles"
    title="Add/Update Roles"
    defaultObj={defaultObj}
    tableTitle='Role Master'
    // options={roles}
    />)
}