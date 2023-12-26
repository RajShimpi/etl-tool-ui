import React, { useState, useEffect } from 'react';
import CommonFormWithList from '../components/common-form-with-list';
import config from "../components/config/config.json"
import { getProjectFields } from './project-data';
import axios from '../services/axios';

const Project = () => {

    const [clientId, setClientId] = useState([])

    useEffect(() => {
        axios.getWithCallback('clients/', (data) => setClientId(data.map(x => { return { label: x.name, value: x.id } })))
    }, [])

    let defaultObj = { project_name: '', client_id: '', base_location: '', active: true };

    return (
        <>
            <CommonFormWithList
                formDataAction={getProjectFields}
                columns={config.PROJECT}
                insertApi="projects"
                updateApi="projects/:id"
                getApi="projects"
                title="Project"
                defaultObj={defaultObj}
                options={[clientId]}
                tableTitle='Projects'
            />
        </>
    );
};

export default Project;