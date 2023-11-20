import { useState, useEffect } from "react";
import CommonFormWithList from "../components/common-form-with-list";
import config from "../components/config/config.json"
import { getDashboardBuilderData } from "./dashboard-builder-data";
import { routeData } from "./route-data";
import axios from "../services/axios";
export const DashboardBuilder = (props) => {
    let defaultObj = { active: true, role: null };
    const [roles, setRoles] = useState([]);
    let linkData = routeData([]).map(x => { return { value: x.routeTo, label: x.header }});
    let widgetType = [{
        value:'list',label:'List',
    },
    {
        value:'table',label:'Table',
    }
];
    useEffect(() => {
        axios.getWithCallback('user-roles/', (data) => setRoles(data.map(x => { return { label: x.name, value: x.id } })))
    }, [])
    return (<CommonFormWithList
    formDataAction={getDashboardBuilderData}
    columns={config.DASHBOARD_MASTER_COLUMN}
    insertApi="dashboard-builder"
    updateApi="dashboard-builder/:id"
    getApi="dashboard-builder"
    title="Add/Update Dashboard Master"
    defaultObj={defaultObj}
    tableTitle={'Dashboard Master'}
    options={[linkData,roles,widgetType]}
    />)
}