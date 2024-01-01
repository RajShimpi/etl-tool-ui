import React, { useEffect, useState } from 'react';
import CommonFormWithList from '../components/common-form-with-list';
import config from "../components/config/config.json"
import axios from '../services/axios';
import { getStepTypeParameter } from './step-type-parameter-data';

const StepTypeParamete = () => {

    const [stepTypeParameter, setStepTypeParameter] = useState([]);
    const [stepType, setStepType] = useState([]);
    const [parameter, setParameter] = useState([]);
    

    useEffect(() => {
        axios.getWithCallback('step-type-parameter/', (data) => setStepTypeParameter(data.map(x => ({ value: x.id, label: x.required }))))
    }, []);

    useEffect(() => {
        axios.getWithCallback('step-type/', (data) => setStepType(data.map(y => ({ value: y.id, label: y.name }))))
    }, []);

    useEffect(() => {
        axios.getWithCallback('parameter/', (data) => setParameter(data.map(z => ({ value: z.id, label: z.name }))))
    }, []);


    const defaultObj = { step_id: '', parameter_id: '', active: true };

    return (
        <>
            <CommonFormWithList
                formDataAction={getStepTypeParameter}
                columns={config.STEP_TYPE_PARAMETERS}
                insertApi="step-type-parameter"
                // updateApi="step-type-parameter/:id"
                getApi="step-type-parameter"
                title="Step Type Parameter"
                defaultObj={defaultObj}
                options={[stepType, parameter, stepTypeParameter]}
                tableTitle='Step Type Parameter'
            />
        </>
    );
};

export default StepTypeParamete;