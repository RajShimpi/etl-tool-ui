import React, { useEffect, useState } from 'react';
import CommonFormWithList from '../components/common-form-with-list';
import config from "../components/config/config.json"
import axios from '../services/axios';
import { getJobStepFields } from './job-step-data';
import CommonModel from '../components/common-modal';

const JobStep = () => {

    const [job, setJob] = useState([]);
    const [stepType, setStepType] = useState([]);
    const [ok, setOk] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        axios.getWithCallback('job/', (data) => setJob(data.map(x => { return { value: x.id, label: x.name } })))
    }, []);

    useEffect(() => {
        axios.getWithCallback('step-type/', (data) => setStepType(data.map(y => ({ value: y.id, label: y.name }))))
    }, []);
    useEffect(() => {
        axios.getWithCallback('job-steps/', (data) => setOk(data.map(z => ({ value: z.id, label: z.ok_step }))))
    }, []);
    useEffect(() => {
        axios.getWithCallback('job-steps/', (data) => setError(data.map(e => ({ value: e.id, label: e.error_step }))))
    }, []);

    const defaultObj = { job_id: '', step_type_id: '', step_name: '', ok_step: '', error_step: '' };

    return (
        <>
            <CommonModel
                formDataAction={getJobStepFields}
                columns={config.JOB_STEP}
                insertApi="job-steps"
                updateApi="job-steps/:id"
                getApi="job-steps"
                title="Job Step"
                defaultObj={defaultObj}
                options={[job, stepType, ok, error]}
                tableTitle='Job Step'
            />
        </>
    );
};

export default JobStep; 