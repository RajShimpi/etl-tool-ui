import React, { useState } from 'react';
import CommonFormWithList from '../components/common-form-with-list';
import config from "../components/config/config.json"
import { getSteptypeFields } from './steptype-data';

const StepType = () => {

    const [validationMsgs, setValidationMessages] = useState({});
    const triggerValidation = (propsName, msg) => {
        if (propsName) {
            setValidationMessages((prevState) => ({ ...prevState, [propsName]: msg }));
        } else {
            setValidationMessages({});
        }
    }

    const processListCallback = (data) => {
        return data.map(x => { return { ...x, params: JSON.stringify(x.params) } })
    }

    let defaultObj = { type: '', name: '', img: '', group: ''};

    return (
        <>
            <CommonFormWithList
                formDataAction={getSteptypeFields}
                columns={config.STEPTYPE}
                insertApi="step-type"
                updateApi="step-type/:id"
                getApi="step-type"
                title="Step Type"
                defaultObj={defaultObj}
                tableTitle='Step Type'
                message={validationMsgs}
                validationCallback={triggerValidation}
                processListCallback={processListCallback}
                jsonParam='params'
            />
        </>
    );
};

export default StepType;