import { useEffect, useState } from "react"


export const TemplateTextArea = ({ id, content, unitName, itemVal, callback,disable=false, experimentAccess }) => {

    const [value, setValue] = useState('');

    useEffect(() => {
        // console.log(itemVal);
        setValue(itemVal || '');
    }, [itemVal])

    const textChange = (e) => {
        setValue(e.target.value);
        callback({ templateControlId: id, value: e.target.value});
    }

    const contentStyle = {
        // border: 0,
        // outline: 0,
        // background: 'transparent',
        // borderBottom: '1px solid #ced4da',
        // color:'#495057',
        //minWidth: "300px"
    }

    return (<>
        {content}
        <textarea id={"templateControl" + id} className={experimentAccess === "VIEW" || experimentAccess === 'REVIEW' ? "form-control disable-component-div" : "form-control"} style={contentStyle} type="text" title={value} name="" value={value} onChange={(e) => textChange(e)} disabled={disable}>

        </textarea>
        {unitName && <b>{unitName}</b>}
    </>)
 }