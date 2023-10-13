


import { useEffect, useState } from "react";
import { confirmAlert, alertInfo } from "../config/alert";
import axios from "../services/axios";
import { TemplateItem } from "./template-item";
import $ from 'jquery';
import _, { template } from "lodash";

export const Template = ({ templates, experimentId, callback, deleteCallback, experiment, isRefresh }) => {

    const [templateData, setTemplateData] = useState([]);
    // const [value, setValue] = useState('');
    const [row, setRow] = useState(null);
    const [rowData, setRowData] = useState(null);

    useEffect(() => {
        var itms = _.differenceBy(templates, templateData, x => x.serialNum);
        setTemplateData((prevData) => [ ...prevData, ...itms]);
    }, [templates]);

    useEffect(() => {
    }, [isRefresh])
    // useEffect(() => {
    //     if(!!addedTemplates?.line) {
    //         setTemplateData(templates => [...templates, { ...addedTemplates, isEdit: false, order: templateData.length + 1, serialNum: templateData.length + 1  }]);
    //     }

    // }, [addedTemplates])

    // useEffect(() => {
    //     console.log(templateData);
    // }, [templateData])

    // const handleEdit = (id) => {
    //     if ((templateData.find(x => x.isEdit))) {
    //         alertInfo("one of the row is in edit state please save that and then edit another row.");
    //         return;
    //     }
    //     let itm = templateData.find(x => x.id === id);
    //     itm.isEdit = true;
    //     setValue(itm.line);
    // }

    // const textChange = (e) => {
    //     setValue(e.target.value);
    // }

    // const saveChange = (id, index) => {
    //     let itm = templateData.find(x => x.id === id);
    //     itm.isEdit = false;
    //     itm.line = value;
    //     templateData[index] = { ...itm };
    //     setTemplateData(template => [...template]);
    //     setValue('');
    // }

    // const cancel = (id) => {
    //     let itm = templateData.find(x => x.id === id);
    //     itm.isEdit = false;
    //     setValue('');
    // }

    const updateRow = (item, index, key, e) => {
        item[key] = e.target.value;
        templateData[index] = { ...item };
        setTemplateData(template => [...template]);
    }

    const handleDelete = (serialNum, id) => {
        confirmAlert("Are you sure you want to delete this ?", () => {
            let data = templateData.filter(y => y.serialNum !== serialNum);
            setTemplateData(data);
            if (!data?.length) {
                callback(data);
            }
            deleteCallback(id, serialNum)
        }, () => { return; });
    }

    useEffect(() => {
        callback(templateData);
        console.log(templateData);
    }, [templateData])

    // const contentStyle = {
    //     border: 0,
    //     outline: 0,
    //     background: 'transparent',
    //     borderBottom: '1px solid gray',
    //     width: "auto"
    // }

    const valueChanged = (serialNum, values) => {
        if (!values?.length)
            return;
        let itm = templateData.find(x => x.serialNum === serialNum);
        if (itm) {
            itm.values = values;
            setTemplateData(template => [...template]);
        }
    }

    const start = (e, index) => {
        setRow(e.target);
        setRowData(templateData[index]);
    }

    const dragover = (e, index, item) => {
        e.preventDefault();
        // e.stopPropagation();
        // let children= Array.from(e.target.parentNode.parentNode.children);
        // let parentNode = $(e.target).closest("tr");        
        // if(children.indexOf(parentNode) >= children.indexOf(row)) {
        //     parentNode.after(row);                        
        // }
        // else {
        // // console.log("before" + index);                
        //     parentNode.before(row);
        // }
        // console.log(templateData);
    }
    const onDrop = (e, index, item) => {
        e.preventDefault();
        //e.stopPropagation();

        let it = templateData.find(x => x.serialNum === rowData.serialNum);
        // let children= Array.from(e.target.parentNode.parentNode.children);
        // let parentNode = $(e.target).closest("tr")[0];
        // console.log(children.indexOf(row));
        // console.log(children.indexOf(parentNode));
        // if(children.indexOf(parentNode) >= children.indexOf(row)) {
        //     console.log("after" + index);              
        //parentNode.after(row); 
        // let ord = rowData.order;
        // it.order = item.order;
        // item.order = ord;

        if (rowData.order < item.order) {
            let or = it.order;
            it.order = item.order;
            let le = item.order - 1;
            for (var i = or; i <= le; i++) {
                templateData[i].order = i;
            }
        }
        else if (rowData.order > item.order) {

            let lowerOrder = item.order;
            let higherOrder = it.order;
            let loopCount = higherOrder - lowerOrder;

            //item.order = it.order;
            it.order = item.order;
            //let lee = it.order;
            for (var j = lowerOrder - 1; j < loopCount; j++) {
                templateData[j].order = j + 2;
            }
        }
        // }
        // else {
        //     console.log("before" + index);                
        //parentNode.before(row);
        // let ord = rowData.order;    
        // it.order = item.order;
        // item.order = ord;
        // }
        templateData.sort((a, b) => { return a.order - b.order });
        setTemplateData(template => [...template]);
    }

    const getTemplateControls = (item) => {
        let controls = item.templateStepControls;
        if(controls?.length) {
            controls.sort((a, b) => { return a.order - b.order });
            return controls;
        }
        return [];
    }
    // const addRow = () => {
    //     let itm = _.maxBy(templateData, x => x.serialNum);
    //     let val = itm ? itm.serialNum + 1 : 1;
    //     setTemplateData((prevData) => [...prevData, { isActive: true,
    //         templateStepId: 100,
    //         remark: '',
    //         temperature: '',
    //         time: '',
    //         experimentId: experiment?.id,
    //         order: prevData.length + 1,
    //         serialNum: val, isEdit: true }])
    // }


    return (<>
        {!!templateData?.length && <table className="mb-0 synthesis_protocol_table"> 
        <colgroup>
                                                           <col width="5%"></col>
                                                           <col width="10%"></col>
                                                           <col width="55%"></col>
                                                           <col width="10%"></col>
                                                           <col width="15%"></col>
                                                           <col width="5%"></col>


                                                        </colgroup>
        <thead className="table-light pb-2 pt-2">
        
            <tr>
                {/* <th className="th-custom-width">
                    <div className="btn-group dropup dropdown chemistry-menu">
                         <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => addRow()}>
                                <i class="fa fa-plus"></i>
                         </button>                                    
                    </div>
                </th> */}
                <th>No.</th>
                <th>Time</th>
                <th>Operations</th>
                <th>Temp.</th>
                <th>Remark</th>
                <th>Action</th>

            </tr>
        </thead><tbody>
                {templateData.map((item, index) => (

                    <tr key={'tr-template-' + index} id={'tr-id-' + item.id} draggable={true} onDragStart={(e) => start(e, index)} onDragOver={(e) => dragover(e, index, item)} onDrop={(e) => onDrop(e, index, item)}>
                        {/* <th></th> */}
                        <th scope="row">{index + 1}</th>
                        <td key={"td-time-" + index}>
                            <div key={"time" + index} className="row">
                                <div key={"div" + index} className="col-md-12">
                                    <input key={"time" + index} className="synthesis_protocol-form" type="time" value={item.time} id={"example-time-input" + index} onChange={(e) => updateRow(item, index, "time", e)}></input>
                                </div>
                            </div>
                        </td>
                        <td key={'td-template-' + item.id} style={{ color: '#05496f' }}
                        // style={{ padding: "0px", minWidth:'450px', maxWidth: '550px' }}
                        >
                            {/* {!item.isEdit ? */}
                            <TemplateItem experimentId={experimentId} content={item.line} serialNumber={item.serialNum} controls={getTemplateControls(item)} callback={valueChanged} controlValues={item.values} experiment={experiment} isRefresh={isRefresh} />
                            {/* :
                                <>
                                    <input key={'input' + item.id} className="synthesis_protocol-form" type="text" name="" value={value} onChange={(e) => textChange(e)}></input>
                                    <div key={'span' + item.id} className="info-text">do not delete 3-underscore lines in between sentance.</div>
                                </>
                             }  */}
                        </td>
                        <td key={"td-temperature" + index}>
                            <div key={"row-temperature" + index} className="row">
                                <div key={"col-temperature" + index} className="col-md-12">
                                    <div key={"input-group-temperature" + index} className="input-group" style={{ flexWrap: 'nowrap' }}>
                                        <input key={"input-temperature" + index} type="text" 
                                        // style={{ minWidth: '50px', maxWidth: '70px' }} 
                                        className="synthesis_protocol-form" id="specificSizeInputGroupUsername" value={item.temperature} onChange={(e) => updateRow(item, index, "temperature", e)} placeholder="°C"></input>
                                        <div key={"input-group-text-temperature" + index} className="input-group-text" style={{ paddingLeft: '3px', width:'30%' }}>°C</div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td key={"td-remark" + index}>
                            <div key={"row-remark" + index} className="row">
                                <div key={"col-remark" + index} className="col-md-12">
                                    <textarea key={"input-remark" + index} className="form-control" 
                                    // style={{ minWidth: '150px'}} 
                                    rows="1" value={item.remark} onChange={(e) => updateRow(item, index, "remark", e)}></textarea>
                                </div>
                            </div>
                        </td>
                        {/* {!item.isEdit ?  */}
                        <td>
                            {/* <button key={'btn-edit-' + item.id} type="button" className="btn btn-link" style={{ padding: "0px" }} onClick={() => handleEdit(item.id)}><img src="/assets/images/login/btn-edit.svg" alt="" width={20} height={20}></img></button> */}
                            {/* {item.isEdit && <button key={'btn-save-' + item.id} type="button" className="btn btn-link" style={{ padding: "0px" }} onClick={() => saveChange(item.id, index)}><img src="/assets/images/login/icons-save.png" alt="" width={20} height={20}></img></button> } */}
                            <button key={'btn-delete-' + item.id} type="button" className="btn btn-link" style={{ padding: "0px" }} onClick={() => handleDelete(item.serialNum, item.id)}><img src="/assets/images/login/btn-delete.svg" width={20} height={20} alt=""></img></button>
                            {/* <a key={'btn-delete-' + item.id} style={{ padding: "1px" }} onClick={() => handleDelete(item.id)}><img src="/assets/images/login/btn-delete.svg" alt=""></img></a> */}
                        </td>
                        {/* :
                            <td>
                                <button key={'btn-save-' + item.id} type="button" className="btn btn-link" style={{ padding: "0px" }} onClick={() => saveChange(item.id, index)}><img src="/assets/images/login/icons-save.png" alt="" width={20} height={20}></img></button>
                                <button key={'btn-cancel-' + item.id} type="button" className="btn btn-link" style={{ padding: "0px" }} onClick={() => cancel(item.id)}><img src="/assets/images/login/icons-cancel.png" alt="" width={20} height={20}></img></button>
                            </td>
                        } */}
                    </tr>
                ))}
            </tbody>
        </table>} </>
    )

}