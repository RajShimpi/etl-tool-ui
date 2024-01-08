import React from 'react';
import CommonFormWithList from '../components/common-form-with-list';
import config from "../components/config/config.json"
import { getSteptypeFields } from './steptype-data';

const StepType = () => {

    let defaultObj = { type: '', name: '', img: '', group: '' };

    return (
        <>
            <CommonFormWithList
                formDataAction={getSteptypeFields}
                columns={config.STEPTYPE}
                insertApi="step-type"
                updateApi="step-type/:id/update"
                getApi="step-type"
                title="Step Type"
                defaultObj={defaultObj}
                tableTitle='Step Type'
            />
        </>
    );
};

export default StepType;