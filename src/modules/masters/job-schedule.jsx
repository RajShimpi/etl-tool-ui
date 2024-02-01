import React, { useEffect, useState } from 'react';
import CommonFormWithList from '../components/common-form-with-list';
import config from "../components/config/config.json"
import axios from '../services/axios';
import { getJobScheduleFields } from './job-schedule-data';

const JobSchedule = () => {

    const [jobschedule, setJobschedule] = useState([]);
    const [clients, setClients] = useState([]);
    const [project, setProject] = useState([]);
    const [job, setJob] = useState([]);

    useEffect(() => {
        axios.getWithCallback('job-schedule/', (data) => setJobschedule(data.map(x => { return { value: x.id, label: x.name } })))
    }, []);

    useEffect(() => {
        axios.getWithCallback('clients/', (data) => setClients(data.map(y => ({ value: y.id, label: y.name }))))
    }, []);
    useEffect(() => {
        axios.getWithCallback('projects/', (data) => setProject(data.map(z => ({ value: z.id, label: z.project_name }))))
    }, []);
    useEffect(() => {
        axios.getWithCallback('job/', (data) => setJob(data.map(e => ({ value: e.id, label: e.name }))))
    }, []);

    const defaultObj = { client:'',project:'',job:'',name:'',description:'',scheduleCron:'',active:'' };

    return (
        <>
            <CommonFormWithList
                formDataAction={getJobScheduleFields}
                columns={config.Job_Schedule}
                insertApi="job-schedule"
                updateApi="job-schedule/:id"
                getApi="job-schedule"
                title="Job Schedule"
                defaultObj={defaultObj}
                options={[clients,project,job,jobschedule]}
                tableTitle='Job Schedule'
            />
        </>
    );
};

export default JobSchedule; 