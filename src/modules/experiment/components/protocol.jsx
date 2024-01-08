import axios from "../../services/axios";
import { Template } from "../../template/template";
import auth from "../../user/auth";
import config from '../../config/config.json';
import { useContext, useEffect, useState } from "react";
import Modal from "../../components/modal-popup";
import DataTable from "../../components/data-table";
import utils from "../../components/utils";
import { getTemplateType } from "../../template/template-data";
import FormCommon from "../../components/form-common";

import _ from "lodash";
import { confirmAlert, successAlert } from "../../config/alert";


const Protocol = (props) => {

    let defaultObj = { active: true };
    const [templateData, setTemplateData] = useState([]);
    const [transactionTemplates, setTransactionTemplates] = useState([]);
    const [templateSteps, setTemplateSteps] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [show, setShow] = useState(false);
    const [saveShow, setSaveShow] = useState(false);
    const [keys, setKeys] = useState([]);
    const [template, setTemplate] = useState(defaultObj);
    const [reactionType, setReactionType] = useState([]);
    const [update, setUpdate] = useState(false);
    const [updateExp, setUpdateExp] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [dataTable, setDataTable] = useState({ data: [], columns: [], filterColumnName: [], isRowSelect: true });

    const experimentaccess = props?.experimentAccess?.accessType

    const expeerimentProtocilValuesJoin = {
        REACTION_MONITORING: 'REACTION_MONITORING'
    }
    const editCallBack = (item) => {
        setShow(false);
        setTemplate(item);
        setUpdate(true);
        let ids = item.templateStepsMap.map(x => { return { templateStepId: x.template_steps_id, templateStepMapId: x.id } });
        let temps = [];
        ids.forEach((x, index) => {
            let itm = templateSteps.find(y => y.id === x.templateStepId);
            if (itm?.line)
                temps.push({ ...itm, templateId: item.id, templateStepMapId: x.templateStepMapId, isEdit: false, order: index + 1, serialNum: index + 1 });
        })
        setTemplateData(temps);
    }

    useEffect(() => { }, [props?.protocolRefresh])

    useEffect(() => {
        setDataTable({
            data: templates,
            columns: keys,
            filterColumnName: config.TEMPLATE_LIBRARY_COLUMNS,
            editCallBack,
            tableTitle: "Template Library"
        });
    }, [templates, keys])

    const setValues = (e, name) => {
        if (!e) return;
        switch (name) {
            case "input":
                setTemplate((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

                break;
            case 'checkbox':
                setTemplate((prevState) => ({ ...prevState, [e.target.name]: e.target.checked }));
                break;
            case "reaction_type_id":
                template[name] = parseInt(e.value);
                //setTemplate((prevState) => ({ ...prevState, [name]: parseInt(e.value) }));
                break;
            case "scope":
                template[name] = e.value;
                //setTemplate((prevState) => ({ ...prevState, [name]: e.value }));
                break;
            default:
                break;

        }
    }

    const getExperimentProtocol = () => {
        setTemplateData([]);
        axios.getWithCallback(`templateStep/experiment-protocol/${props.protocol?.value}/${props.experiment.id}`, async (data) => {
            setUpdateExp(data?.length);
            let index = 0
            const dt = []
            for await (const dataEle of data) {
                const newArr = []
                for await (const ele of dataEle.experimentProtocolValues) {
                    if (ele.joinWith === expeerimentProtocilValuesJoin.REACTION_MONITORING) {
                        axios.getWithCallback(`/experiment/reaction-monitor/${ele.value}`, (data) => {
                            const reactionMonitorSpots = config.SPOT_NAMES.map((ele, index) => {
                                return {
                                    spotTypeId: data.reactionMonitorSpotType[index]?.spotTypeId?.id ? data.reactionMonitorSpotType[index]?.spotTypeId?.id : null, spotName: ele
                                }
                            })
                            newArr.push({
                                ...ele, value:
                                {
                                    id: data.id, isActive: data.isActive, time: data.time, image: data.image, reactionMonitorSpots,
                                    modifier: data?.modifier?.id, sprayAgent: data?.sprayAgent?.id, remark: data?.remark,
                                    mobilePhaseId: data?.mobilePhase?.id,
                                    type: 'TLC'
                                },
                            })
                        })
                    } else {
                        newArr.push(ele)
                    }
                }
                index = index + 1
                dt.push({
                    ...dataEle.templateSteps, isActive: dataEle.isActive, remark: dataEle.remark, experimentProtocolId: dataEle.id,
                    temperature: dataEle.temperature,
                    time: dataEle.time, values: [...newArr], order: dataEle.order, isEdit: false, serialNum: index + 1
                })
            }

            dt.sort((a, b) => { return a.order - b.order })
            setTemplateData([...dt]);
        });
    }


    useEffect(() => {

        if (props.protocol?.value) {
            axios.getWithCallback("templateStep/" + props.protocol?.value, (data) => {
                // const checkImage = (item, isLoaded) => {        
                //     var itm = data.find(x => x.id == item);
                //     if(itm) {
                //         itm.isLoaded = isLoaded;
                //     }
                //     setTemplateSteps(data);
                // }
                // data.map(x => {
                //     // checkIfImageExists(x, checkImage);
                //     return x;
                // });
                 setTemplateSteps(data)              
            });

            getTemplates();
            if (props.experiment?.id && props.multipleProtocolId) {
                axios.getWithCallback(`templateStep/experiment-protocol/${props.protocol?.value}/${props.experiment.id}?multipleProtocolId=${props.multipleProtocolId}`, (data) => {

                    setUpdateExp(data?.length);
                    let dt = data.map((x, index) => {

                        return {
                            ...x.templateSteps, remark: x.remark, experimentProtocolId: x.id,
                            temperature: x.temperature,
                            time: x.time, values: x.experimentProtocolValues, order: x.order, isEdit: false, serialNum: index + 1
                        }
                    });
                    dt.sort((a, b) => { return a.order - b.order })
                    setTemplateData(dt);
                });
            }

            else if (props.experiment?.id) {
                getExperimentProtocol()
            }
            setTemplate((prevData) => ({ ...prevData, protocol_type_id: props.protocol?.value }))
        }

    }, [props.protocol])

    useEffect(() => {
        axios.getWithCallback('/reactiontype', (data) => setReactionType(data.map(x => { return { value: x.id, label: x.reactionName } })));
    }, [])

    const getTemplates = () => {
        axios.getWithCallback(`templateStep/template-master?scope=${''}&protocolTypeId=${props.protocol?.value}`, (data) => {
            setTemplates(data);
            let keies = utils.extractColumns(data[0], config.TEMPLATE_LIBRARY_COLUMNS);
            setKeys(keies);
        });
    }

    const addRow = (obj) => {
        // setSelectedTemplate({...obj});
        let itm = _.maxBy(templateData, x => x.serialNum);
        let val = itm ? itm.serialNum + 1 : 1;
        setTemplateData((prevData) => [...prevData, { ...obj, isEdit: false, order: val, serialNum: val, isActive: true }]);
    }

    const saveTemplateData = (templates) => {
        let id = auth.getStorageData("id");
        
        setTransactionTemplates(templates.map(x => {
            return {
                isActive: true,
                templateId: x.templateId,
                templateStepId: x.id,
                id: x.experimentProtocolId,
                experimentProtocolValues: !!x.experimentProtocolId ? x.values.map(y => ({ ...y, experimentProtocolId: x.experimentProtocolId })) : x.values,
                remark: x.remark,
                temperature: !x.temperature?.length ? null : x.temperature,
                time: x.time,
                protocolTypeId: props.protocol?.value,
                experimentId: props.experiment?.id,
                multipleProtocolId: props.multipleProtocolId,
                createdBy: id,
                lastChangedBy: updateExp ? id : 0,
                order: x.order,
                serialNum: x.serialNum
            }
        }));
    }

    const onReset = (e) => {
        setTemplate({ ...defaultObj, protocol_type_id: props.protocol?.value });
        setSaveShow(false);
        setUpdate(false);
        setTemplateData([]);
    }

    const getTemplateData = () => {
        return templateData.map((x, index) => {
            let tranTemp = transactionTemplates.find(y => y.serialNum === x.serialNum);
            let order = index + 1;
            if (tranTemp) {
                order = tranTemp.order;
            }
            return {
                id: x.templateStepMapId,
                template_steps_id: x.id,
                order: order
            }
        });
    }

    const deleteItem = (id, serialNum) => {
        setTemplateData(templateData.filter(x => serialNum !== x.serialNum));
    }

    const deleteMultipleProtocol = (e) => {

        confirmAlert("Are you sure you want to delete this protocol ?", () => {
            e.stopPropagation();
            axios.getWithCallback(`/templateStep/remove-multiple-protocol/${props.protocol?.value}/${props.experiment?.id}?multipleProtocolId=${props.multipleProtocolId}`, (data) => {

                props.deleteCallback(e, props.multipleProtocolId);
                successAlert("Protocol deleted Successfully.");
            });

        }, () => { return; });

    }

    const saveProtocol = (e) => {
        e.preventDefault();

        if (updateExp) {
            if (!transactionTemplates?.length) {
                deleteMultipleProtocol(e);
            } else {
                axios.putWithCallback('/templateStep/experiment-protocol/update-experiment-protocol', transactionTemplates, (data) => {
                    getExperimentProtocol();
                    props?.reactionMonitorPageRefresh()
                    
                });
            }
        }
        else {
            axios.postWithCallback('/templateStep/experiment-protocol/save-experiment-protocol', transactionTemplates, (data) => {
                setUpdateExp(data.data?.saveResult?.length)
                getExperimentProtocol();
                props?.reactionMonitorPageRefresh()
                
            });
        }
    }

    const onsubmit = (e) => {
        e.preventDefault();

        template.templateStepControls = getTemplateData();
        if (update) {
            axios.putWithCallback('/templateStep/template-master/create-template/' + template.id, template, (data) => {
                setSaveShow(false);
                setTemplate({ ...defaultObj, protocol_type_id: props.protocol?.value });
                setUpdate(false);
                getTemplates();
            });
        }
        else {
            axios.postWithCallback('/templateStep/template-master/create-template', template, (data) => {
                setSaveShow(false);
                setTemplate({ ...defaultObj, protocol_type_id: props.protocol?.value });
                getTemplates();
            });
        }
    }

   

    const checkIfImageExists = (item, callback) => {
        const img = new Image();
        img.src = `/assets/images/${props.folder}/${item.img}`;
        
        if (img.complete) {
          callback(item.id, true);
        } else {
          img.onload = () => {
             callback(item.id,true);
          };
          
          img.onerror = () => {
            callback(item.id,false);
          };
        }
      }

    return (
        <div className="card">
            <div className="card-body">
                <div className="accordion" id={`${props.id}-accordion`}>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id={`${props.id}-heading`}>
                            <button className="accordion-button inner-sm-tab" type="button" data-bs-toggle="collapse" data-bs-target={`#${props.id}`} aria-expanded="true" aria-controls="collapseOne">

                                <div className="info-details">
                                    <span style={{ paddingTop: '3px' }}>{props.title}</span>
                                    <span>
                                        {props.multipleProtocolId && <button key={'btn-delete'}
                                            type="button" className={experimentaccess === "VIEW" || experimentaccess === "REVIEW" ?  "btn btn-link disabled-button" : "btn btn-link"} style={{ padding: "0px", margin: '0px' }}
                                            onClick={(e) => deleteMultipleProtocol(e)}>
                                            <img src="/assets/images/login/btn-delete.svg" width={20}
                                                height={20} alt=""></img>
                                        </button>}
                                    </span>
                                </div>


                            </button>

                        </h2>
                        <div id={`${props.id}`} className={experimentaccess === 'VIEW' || experimentaccess === "REVIEW" ? 'accordion-collapse collapse show disabled-component-div' :"accordion-collapse collapse show"} aria-labelledby={`${props.id}-heading`} data-bs-parent={`#${props.id}-accordion`}>
                            <div className="accordion-body text-muted">
                                <div className="synthesis_protocol_icon">
                                    <ul>
                                        {templateSteps?.map((item, index) => (
                                            <button key={item.id} className={"btn"} style={{ padding: '0px' }} onClick={() => addRow(item)} title={item.img}>
                                           {/* {item.isLoaded ?  */}
                                           <img key={'img' + item.id} className="img-fluid" alt={item.img} src={`/assets/images/${props.folder}/${item.img}`}></img> 
                                               {/* : <span className="img-fluid"> {item.img}</span> } */}
                                            </button>
                                        ))}
                                    </ul>
                                    <div className="synthesis_protocol_btn">
                                        <a href="" onClick={(e) => { e.preventDefault(); setShow(true); }} >Template Library</a>
                                        <Modal show={show} modalTitle={"Template Library"} handleClose={() => setShow(false)} maxWidth={'75%'}>
                                            <DataTable {...dataTable} />
                                        </Modal>
                                    </div>


                                </div>

                                <div className="row">
                                    <div className="col-lg-12 table-responsive">
                                        {(!!templateData?.length) &&
                                            // !!templateData.length && <>

                                            <Template templates={templateData} callback={saveTemplateData} deleteCallback={deleteItem} experimentId={props.experiment?.id} experiment={props.experiment} isRefresh={props?.protocolRefresh} />

                                        }

                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="">
                                            {/* <button className="btn btn-primary">Save as Template</button> */}
                                            {/* <a href=""  onClick={(e) => { e.preventDefault();  setSaveShow(true); } } >Save as Template</a> */}
                                            <div className=" col-md-12 d-flex justify-content-end">
                                                <button type="submit" onClick={(e) => saveProtocol(e)} style={{ marginRight: '1%' }} className={updateExp ? "btn mx-2 btn-update w-xs waves-effect waves-light" : "btn mx-1 btn-add w-xs waves-effect waves-light"}>
                                                    {updateExp ? <i className="fa fa-edit"></i> : <i className="fa fa-plus"></i>}
                                                    {updateExp ? ' Update ' : ' Save'}
                                                </button>

                                                <div className="dropdown" style={{ marginRight: '1%' }}>
                                                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Save/Update Template <i className="fa fa-solid fa-chevron-down"></i>
                                                    </button>
                                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <button className="dropdown-item" defaultChecked={true} onClick={(e) => { e.preventDefault(); setUpdate(false); setSaveShow(true); }}>Save As Template</button>
                                                        <button className="dropdown-item" disabled={!update} onClick={(e) => { e.preventDefault(); setSaveShow(true); }}>Update Template</button>
                                                    </div>
                                                </div>
                                                {/* : <button type="submit"  onClick={(e) => { e.preventDefault();  setSaveShow(true); } } style={{ marginRight: '1%' }} className={update ? "btn mx-2 btn-update w-xs waves-effect waves-light" : "btn mx-1 btn-add w-xs waves-effect waves-light"}>
                                                        {update ? <i className="fa fa-edit"></i> : <i className="fa fa-plus"></i>}
                                                        {update ? ' Update Template' : ' Save as Template'}
                                                    </button>} */}
                                                <button type="button" onClick={(e) => onReset(e)} className="btn btn-warning w-xs waves-effect waves-light"><i className="fa fa-undo"></i><span className="custom-ml-1">Reset</span></button>
                                            </div>

                                            <Modal show={saveShow} modalTitle={"Template Detail"} handleClose={() => { setSaveShow(false); }} maxWidth={'75%'}>
                                                <form onSubmit={(e) => onsubmit(e)} className="needs-validation" noValidate>
                                                    <FormCommon data={getTemplateType({
                                                        isSubmit: false,
                                                        update: update,
                                                        callback: setValues,
                                                        values: template,
                                                        options: [[{ value: 'global', label: 'Global' }, { value: 'user', label: 'User' }], reactionType]
                                                    })} />
                                                    <div className=" col-md-12 d-flex justify-content-end">
                                                        <button type="submit" onClick={() => setIsSubmit(true)} style={{ marginRight: '1%' }} className={update ? "btn mx-2 btn-update w-xs waves-effect waves-light" : "btn mx-1 btn-add w-xs waves-effect waves-light"}>
                                                            {update ? <i className="fa fa-edit"></i> : <i className="fa fa-plus"></i>}
                                                            {update ? ' Update' : ' Add'}
                                                        </button>
                                                        <button type="button" onClick={(e) => onReset(e)} className="btn btn-warning w-xs waves-effect waves-light"><i className="fa fa-undo"></i><span className="custom-ml-1">Reset</span></button>
                                                    </div>
                                                </form>
                                            </Modal>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Protocol;