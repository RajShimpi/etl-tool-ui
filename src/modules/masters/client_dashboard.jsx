import React, { useEffect, useState } from 'react';
import CommonFormWithList from '../components/common-form-with-list';
import config from "../components/config/config.json"
import { geClientDashboardFields } from './client_dashboard-data';
import axios from '../services/axios';

const Client_Dashboard = () => {
    const [client,setClient]=useState([])
    const [metabaseData,setMetabaseData]=useState([])
    const [questionData,setQuestionData]=useState([])

    useEffect(()=>{
        axios.getWithCallback("/clients",(data)=>setClient(data.map(x => { return { value: x.id, label: x.name } })))
        axios.getWithCallback("/client-dashboard/dashboard",(data)=>setMetabaseData(data.map(x => { return { value: x.id, label: x.name } })))
        axios.getWithCallback("/client-dashboard/question",(data)=>setQuestionData(data.map(x => { return { value: x.id, label: x.name } })))
    },[])

    let defaultObj = { dashboard_id:null, client_id: "", question_id:null }
    return (
        <>
            <CommonFormWithList
                formDataAction={geClientDashboardFields}
                columns={config.Metabase}
                insertApi="client-dashboard"
                updateApi="client-dashboard/:id"
                deleteApi="client-dashboard/:id"
                getApi="client-dashboard"
                options={[client,metabaseData,questionData]}
                title="Client Dashboard"
                defaultObj={defaultObj}
                tableTitle='Client Dashboard'
            />
        </>
    );
};

export default Client_Dashboard;