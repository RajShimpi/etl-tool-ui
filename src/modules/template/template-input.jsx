import { useEffect, useState } from "react"


export const TemplateInput = ({ id, content, unitName, itemVal, callback, disable = false, experimentAccess }) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        setValue(itemVal || '');
    }, [itemVal])

    const textChange = (e) => {
        setValue(e.target.value);
        callback({ templateControlId: id, value: e.target.value });
    }

    const contentStyle = {
        border: 0,
        outline: 0,
        background: 'transparent',
        borderBottom: '1px solid #ced4da',
        color: '#495057',
        width: "100px"
    }

    return (<>
        {content}
        <input id={"templateControl" + id} style={contentStyle} type="text" title={value} name="" value={value} onChange={(e) => textChange(e)} disabled={disable} className={experimentAccess === "VIEW" || experimentAccess === 'REVIEW' ? 'disabled-component-div' : ''}></input>
        {unitName && <b>{unitName}</b>}
    </>)
}