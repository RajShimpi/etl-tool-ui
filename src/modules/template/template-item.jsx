import _ from "lodash";
import { useEffect, useState } from "react";
import ReactionMonitoringModal from "../experiment/components/chemistry/reaction-monitoring/reaction-monitoring-modal";
import axios from "../services/axios";
import { TemplateInput } from "./template-input";
import { TemplateTextArea } from "./template-textarea";
import { TemplateSelect } from "./template-select";
import { TemplateTLC } from "./template-tlc";
import config from '../config/config.json'
export const TemplateItem = ({ serialNumber, content, controls, callback, experimentId, controlValues, experiment, isRefresh, experimentAccess }) => {

    const [contentData, setContentData] = useState([]);
    const [vals, setVals] = useState([]);

    useEffect(() => {
        if (!content)
            return;
        let array = content.split("___");
        setContentData(array);


    }, [content])

    useEffect(() => {
    }, [isRefresh])

    const valueChanged = (val) => {
        let itm = vals.find(x => x.templateControlId === val.templateControlId);
        let controlVal = controlValues?.find(x => x.templateControlId === val.templateControlId);
        let remainingItems = controlValues?.filter(x => x.templateControlId !== val.templateControlId);
        let remainingItems1 = _.differenceBy(remainingItems, vals, x => x.templateControlId);

        if (!!itm) {
            itm.value = val.value;
            itm.id = controlVal?.id;
            itm.experimentProtocolId = controlVal?.experimentProtocolId;
            setVals(x => [...x]);
        } else if (!!controlVal) {
            controlVal.value = val.value;
            setVals(x => [...x, { ...controlVal }, ...remainingItems]);
        } else {
            setVals(x => [...x, ...remainingItems1, { ...val, id: controlVal?.id, experimentProtocolId: controlVal?.experimentProtocolId }]);
        }
    }

    useEffect(() => {
        callback(serialNumber, vals);
    }, [serialNumber, vals])

    const findValue = (item) => {
        if (controlValues?.length) {
            let controlVal = controlValues.find(x => x.templateControlId === item.id);
            if (item.controlType === config.PROTOCOL_CONTROL_TYPE.TLC_SELECTION) {
                return !!controlVal ? { ...controlVal?.value, type: controlVal?.type } : '';
            } else {
                return !!controlVal ? controlVal?.value : '';
            }
        }
        return '';
    }

    return (
        <>
            {!!controls?.length && controls.map((item, index) => (
                <div key={"div-controltype-" + index} style={{ display: "inline" }}>
                    {
                        item.controlType === config.PROTOCOL_CONTROL_TYPE.TEXT && <TemplateInput content={contentData[index]}
                            id={item.id}
                            unitName={item.unitName}
                            callback={valueChanged}
                            itemVal={findValue(item)}
                            disable={item?.disable}
                            experimentAccess={experimentAccess}
                        />
                    }
                    {
                        item.controlType === config.PROTOCOL_CONTROL_TYPE.TEXT_AREA && <TemplateTextArea content={contentData[index]}
                            id={item.id}
                            unitName={item.unitName}
                            callback={valueChanged}
                            itemVal={findValue(item)}
                            disable={item?.disable}
                            experimentAccess={experimentAccess}
                        />
                    }
                    {
                        item.controlType === config.PROTOCOL_CONTROL_TYPE.SELECT && <TemplateSelect content={contentData[index]}
                            id={item.id}
                            unitName={item.unitName}
                            resourceName={item.resource}
                            experimentId={experimentId}
                            callback={valueChanged} itemVal={findValue(item)}
                            experiment={experiment}
                            remarks={item.remark}
                            isRefresh={isRefresh}
                            disable={item?.disable}
                            experimentAccess={experimentAccess} />
                    }
                    {
                        item.controlType === config.PROTOCOL_CONTROL_TYPE.TLC_SELECTION &&
                        <TemplateTLC content={contentData[index]}
                            id={item.id}
                            unitName={item.unitName}
                            callback={valueChanged}
                            itemVal={findValue(item)}
                            experimentAccess={experimentAccess} />
                    }
                </div>
            ))}
            {(contentData?.length > controls?.length) && !!controls.length && contentData[controls.length]}
        </>
    );
}