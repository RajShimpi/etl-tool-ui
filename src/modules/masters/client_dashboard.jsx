import React, { useEffect, useState } from 'react';
import CommonFormWithList from '../components/common-form-with-list';
import config from "../components/config/config.json"
import { geClientDashboardFields } from './client_dashboard-data';
import axios from '../services/axios';

const Client_Dashboard = () => {
    const [client,setClient]=useState([])
    const [metabaseData,setMetabaseData]=useState([])

    useEffect(()=>{
        axios.getWithCallback("/clients",(data)=>setClient(data.map(x => { return { value: x.id, label: x.name } })))
        axios.getWithCallback("/metabase/json",(data)=>setMetabaseData(data.map(x => { return { value: x.id, label: x.name } })))
    },[])

    let defaultObj = { dashboard_id:"", client_id: "" }
    return (
        <>
            <CommonFormWithList
                formDataAction={geClientDashboardFields}
                columns={config.Metabase}
                insertApi="client-dashboard"
                updateApi="client-dashboard/:id"
                deleteApi="client-dashboard/:id"
                getApi="client-dashboard"
                options={[client,metabaseData]}
                title="Client Dashboard"
                defaultObj={defaultObj}
                tableTitle='Client Dashboard'
            />
        </>
    );
};

export default Client_Dashboard;