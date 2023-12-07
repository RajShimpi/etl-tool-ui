import { useState } from "react";
import CommonFormWithList from "../components/common-form-with-list";
import config from "../config/config.json";
import { getTypeConfigMaster } from "./master-data";

const TypeConfigMaster = () => {
    const [validationMsgs, setValidationMessages] = useState({});
    const defaultObj = { isActive: false, category: '', value: '', params: '' };

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

    return (<CommonFormWithList
        formDataAction={getTypeConfigMaster}
        columns={config.TYPE_CONFIG}
        insertApi="type-config"
        updateApi="type-config/:id"
        getApi="type-config"
        title="Add/Update Type Config"
        defaultObj={defaultObj}
        tableTitle='Type Config Master'
        message={validationMsgs}
        validationCallback={triggerValidation}
        processListCallback={processListCallback}
        jsonParam='params'
    />)
}

export default TypeConfigMaster;