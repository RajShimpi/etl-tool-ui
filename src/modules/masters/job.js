import React, { useEffect, useState } from 'react';
import config from "../components/config/config.json"
import axios from '../services/axios';
import { getJobFields } from './job-data';
import CommonModel from '../components/common-modal';

const Job = () => {

    const [job, setJob] = useState([]);
    const [projectFile, setProjectFile] = useState([]);
    const [project, setProject] = useState([]);
    const [client, setClient] = useState([]);

    useEffect(() => {
        axios.getWithCallback('job/', (data) => setJob(data.map(x => { return { value: x.id, label: x.name } })))
    }, []);

    useEffect(() => {
        axios.getWithCallback('project-files/', (data) => setProjectFile(data.map(y => ({ value: y.id, label: y.file_name }))))
    }, []);

    useEffect(() => {
        axios.getWithCallback('projects/', (data) => setProject(data.map(z => ({ value: z.id, label: z.project_name }))))
    }, []);

    useEffect(() => {
        axios.getWithCallback('clients/', (data) => setClient(data.map(c => ({ value: c.id, label: c.name }))))
    }, []);

    const defaultObj = { name: '', start_step: '', type: '', job_file_id: '', project_id: '', client_id: '' };

    return (
        <>
            <CommonModel
                formDataAction={getJobFields}
                columns={config.Job}
                insertApi="job"
                updateApi="job/:id"
                getApi="job"
                title="Job"
                defaultObj={defaultObj}
                options={[job, projectFile, project, client]}
                tableTitle='Job'
            />
        </>
    );
};

export default Job;