
import CommonFormWithList from "../components/common-form-with-list";
import { getTemplateItems, getTemplateStepControlData } from "./template-data";
import config from "../config/config.json"
import { useEffect, useState } from "react";
import axios from "../services/axios";
import EditableTable from "../components/editable-table";
import DataTable from "../components/data-table";
import FormCommon from "../components/form-common";
import $ from 'jquery';
import utils from "../components/utils";
import _ from "lodash";
export const AddTemplateItem = (props) => {

    let defaultObj = { TemplateContent: '', active: true };
    let defaultTableObj = { controlType: null, order: 1, active: true }
    const [templateTypes, setTemplateTypes] = useState([]);
    const [templateItems, setTemplateItems] = useState([]);
    const [data, setData] = useState(defaultObj);
    const [keys, setKeys] = useState([]);
    const [update, setUpdate] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [dataTableData, setDataTableData] = useState({ data: [], columns: [], filterColumnName: [], tableTitle: 'Template Item Master' });
    const [list, setList] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [editableData, setEditableData] = useState([]);
    const [disabled, setDisabled] = useState(true);

    const setValues = (e, name) => {
        if (!e) return;
        switch (name) {
            case "input":
                setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
                if (e.target.name === 'line') {
                    processTableData(e.target.value);
                }
                break;
            case 'checkbox':
                setData((prevState) => ({ ...prevState, [e.target.name]: e.target.checked }));
                break;
            case "protocol_type_id":
                setData((prevState) => ({ ...prevState, [name]: parseInt(e.value) }));
                break;
            case "controlType":
                setData((prevState) => ({ ...prevState, [name]: e.value }));
                break;
            default:
                break;

        }
    }

    const processTableData = (value) => {
        if (!value && !value.includes("___"))
            return;
        let controlArr = value.split("___");
        let tableArr = [];
        for (let i = 1; i < controlArr.length; i++) {
            if (tableData?.length && !!tableData[i - 1]) {
                tableArr.push({ ...tableData[i - 1], order: i })
            } else {
                tableArr.push({ ...defaultTableObj, order: i })
            }
        }
        setTableData(tableArr);
    }

    useEffect(() => {
        setDisabled(_.every(tableData, x => !!x.controlType));
    }, [tableData, editableData])

    const onReset = (e) => {
        resetData();

        let form = $(e.target).closest('form');
        form[0].classList.remove('was-validated');

    }

    let controls = [{ value: config.PROTOCOL_CONTROL_TYPE.SELECT, label: "Drop-down" }, 
    { value: config.PROTOCOL_CONTROL_TYPE.TEXT, label: "Text" },
    { value: config.PROTOCOL_CONTROL_TYPE.TEXT_AREA, label: "TextArea" },
    { value: config.PROTOCOL_CONTROL_TYPE.TLC_SELECTION, label: "TLC Selection" }];

    const TableDataCallback = (data) => {
        setEditableData(data);
    }

    const resetData = () => {
        setData({ ...props.defaultObj });
        setTableData([]);
        setUpdate(true);
        setUpdate(false);
        setIsSubmit(false);
    }

    const editCallBack = (item) => {
        setUpdate(true);
        setData(item);
        setTableData(item.templateStepControls);
    }

    const apiCall = () => {
        axios.getWithCallback('templateStep/', (resp) => {
            setList(resp);
            let keies = utils.extractColumns(resp[0], config.TEMPLATE_ITEM_COLUMNS);
            setKeys(keies);
        });
    }

    useEffect(() => {
        setDataTableData({
            ...dataTableData,
            data: list,
            columns: keys,
            filterColumnName: keys,
            editCallBack,
            isEdit: true, isDelete: true
        });
    }, [list, keys]);


    useEffect(() => {
        apiCall();
        axios.getWithCallback("type-config/category?category=protocolType", (data) => setTemplateTypes(data));
    }, [])
    // const processList = (list) => {
    //     return list.map(x =>  { return { ...x, templateId: x.id}});
    // }

    const onsubmit = (e) => {
        e.preventDefault();
        let request = { ...data, templateStepControls: editableData }
        if (update) {
            axios.putWithCallback('templateStep/' + data.id, request, (resp) => {
                resetData();
                apiCall();
                // axios.putWithCallback('templateStep/templateStepControls', editableData, (dt) => {
                //     resetData();
                // })
            });


        } else {
            axios.postWithCallback('templateStep/', request, (resp) => {
                resetData();
                apiCall();
                // let tableDt = editableData.map(x => { return { ...x, template_steps_id: resp.id  }})
                // axios.postWithCallback('templateStep/templateStepControls', tableDt, (dt) => {
                //     resetData();
                // })
            });
        }
    }

    return (<>
        <div className='row'>
            <div className="col-xl-12">
                <div className="card">
                    <form onSubmit={(e) => onsubmit(e)} className="needs-validation" noValidate>
                        <div className="accordion" id={"common-form-" + props.title}>

                            <div className="accordion-item" style={{ margin: "0px" }}>
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        {update ? 'Update' : 'Add'} Template Step Master
                                    </button>
                                </h2>

                            </div>
                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent={"common-form-" + props.title}>
                                <div className="accordion-body text-muted">
                                    <div className="card-body">
                                        <FormCommon data={getTemplateItems({
                                            isSubmit,
                                            update: update,
                                            callback: setValues,
                                            values: data,
                                            options: templateTypes
                                        })} />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <EditableTable
                            options={[templateItems, controls]}
                            callback={TableDataCallback}
                            data={tableData}
                            update={false}
                            columns={config.TEMPLATE_CONTROL_TABLE_COLUMNS.map(key => { return { columnId: key, columnName: key.includes('.') ? (key.charAt(0).toUpperCase() + key.slice(1).trim().replace("_", " ").split('.')[0]) : (key.charAt(0).toUpperCase() + key.slice(1).trim().replace("_", " ")), } })}
                            controlDataFunc={getTemplateStepControlData}
                        />

                        <div className=" col-md-12 d-flex justify-content-end">
                            <button type="submit" onClick={() => setIsSubmit(true)} style={{ marginRight: '1%' }} className={update ? "btn mx-2 btn-update w-xs waves-effect waves-light" : "btn mx-1 btn-add w-xs waves-effect waves-light"}>
                                {update ? <i className="fa fa-edit"></i> : <i className="fa fa-plus"></i>}
                                {update ? ' Update' : ' Add'}
                            </button>
                            <button type="button" onClick={(e) => onReset(e)} className="btn btn-warning w-xs waves-effect waves-light"><i className="fa fa-undo"></i><span className="custom-ml-1">Reset</span></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div className="col-md-12">
            <DataTable {...dataTableData} />
        </div>

    </>)
}