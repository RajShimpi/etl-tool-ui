import { isNumber } from "lodash";
import { useCallback, useEffect, useState } from "react"
import axios from "../services/axios"

export const TemplateSelect = ({ id, content, resourceName, unitName, callback, experimentId, itemVal, experiment, remarks, isRefresh ,disable=false, experimentAccess}) => {

    const [fillData, setFillData] = useState([]);
    const [value, setValue] = useState('');

    var fieldMapping = JSON.parse(remarks);
    useEffect(() => {
        if (resourceName) {
            let resource = resourceName.replace("/", "").toLowerCase();
            axios.getWithCallback(resourceName.replace(":id", experiment.experimentId), (data) =>
               {
                 setFillData(data.map(x => {
                    return {
                        value: fieldMapping && fieldMapping.valueFieldName ? x[fieldMapping.valueFieldName] : x.id,
                        label: fieldMapping && fieldMapping.labelFieldName ? x[fieldMapping.labelFieldName] : x.Name
                    }
                }))})
        }
    }, [resourceName, isRefresh])

    //useEffect(() => {
    //    if(resourceName) {
    //    let resource = resourceName.replace("/", "").toLowerCase();
    //    axios.getWithCallback(resourceName.replace(":id", experimentId), (data) => setFillData(data.map(x => { return { value: x.id, label: window.SELECT_CONTROL_LABEL_MAPPING ? x[window.SELECT_CONTROL_LABEL_MAPPING[resource]] : x.Name } })));
    //    }
    //}, [resourceName])

    const contentStyle = {
        border: 0,
        outline: 0,
        background: 'transparent',
        borderBottom: '1px solid #ced4da',
        color: '#495057',
        width: "auto"
    }

    const changeVal = (e) => {
        callback({ templateControlId: id, value: e.target.value });
    }

    const containsOnlyNumbers = (str) => {
        return /^[0-9]+$/.test(str);
    }

    useEffect(() => {
        if (containsOnlyNumbers(itemVal)) {
            setValue(Number(itemVal));
        } else {
            setValue(itemVal);
        }
    }, [itemVal])

    return (<>
        {content}
        <select style={contentStyle} value={value} onChange={(e) => changeVal(e)} disabled={disable} className={experimentAccess === "VIEW" || experimentAccess === 'REVIEW' ? 'disabled-component-div' : ''}>
            <option key={0} value={0}>{"Select"}</option>
            {fillData.map((item, index) => (<option key={index} value={item.value}>{item.label}</option>))}
        </select>
        <b>{unitName}</b>
    </>)
}