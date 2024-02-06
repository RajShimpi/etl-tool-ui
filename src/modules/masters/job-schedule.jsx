import React, { useEffect, useState } from 'react';
import CommonFormWithList from '../components/common-form-with-list';
import config from "../components/config/config.json"
import axios from '../services/axios';
import { getJobScheduleFields } from './job-schedule-data';
import auth from '../user/auth';

const JobSchedule = () => {

    const [jobschedule, setJobschedule] = useState([]);
    const [project, setProject] = useState([]);
    const [job, setJob] = useState([]);

    const client_Id = auth.getStorageData("client_Id");

    useEffect(() => {
        axios.getWithCallback('job-schedule/', (data) => setJobschedule(data.map(x => { return { value: x.id, label: x.name } })))
    }, []);

    useEffect(() => {
        axios.getWithCallback(`projects/client/${client_Id}`, (data) => setProject(data.map(z => ({ value: z.id, label: z.project_name }))))
    }, []);

    useEffect(() => {
        axios.getWithCallback(`job/client/${client_Id}`, (data) => setJob(data.map(e => ({ value: e.id, label: e.name }))))
    }, []);

    const defaultObj = { client:parseInt(client_Id),project:'',job:'',name:'',description:'',scheduleCron:'',active:'' };

    return (
        <>
            <CommonFormWithList
                formDataAction={getJobScheduleFields}
                columns={config.Job_Schedule}
                insertApi="job-schedule"
                updateApi="job-schedule/:id"
                getApi={`job-schedule/client/${client_Id}`}
                title="Job Schedule"
                defaultObj={defaultObj}
                options={[project,job,jobschedule]}
                tableTitle='Job Schedule'
            />
        </>
    );
};

export default JobSchedule; 