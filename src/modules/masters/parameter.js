import React, { useEffect, useState } from 'react';
import CommonFormWithList from '../components/common-form-with-list';
import config from "../components/config/config.json"
import axios from '../services/axios';
import { getParameterFields } from './parameter-data';

const Parameter = () => {

    const [parameter, setParameter] = useState([]);
    const [stepType, setStepType] = useState([]);

    useEffect(() => {
        axios.getWithCallback('parameter/', (data) => setParameter(data.map(x => { return { value: x.id, label: x.name } })))
    }, []);

    useEffect(() => {
        axios.getWithCallback('step-type/', (data) => setStepType(data.map(y => { return { value: y.id, label: y.name } })))
    }, []);

    const defaultObj = { name: '', context: '', display_name: '', description: '', type: '', resource: '' };

    return (
        <>
            <CommonFormWithList
                formDataAction={getParameterFields}
                columns={config.PARAMETER}
                insertApi="parameter"
                updateApi="parameter"
                getApi="parameter"
                title="Parameter"
                defaultObj={defaultObj}
                options={[stepType, parameter]}
                tableTitle='Parameter'
            />
        </>
    );
};

export default Parameter;