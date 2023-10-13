
import CommonFormWithList from "../components/common-form-with-list";
import { getProtocolType } from "./template-data";

import config from "../config/config.json"
export const ProtolcolType = (props) => {
    
    let defaultObj = { active: true };

    // const processList = (list) => {
    //     return list.map(x =>  { return { ...x, templateId: x.id}});
    // }

    return (<CommonFormWithList 
    formDataAction={getProtocolType}
    columns={config.PROTOCOL_TYPE_COLUMNS}
    insertApi="templateStep/save-protocol"
    updateApi="templateStep/update-protocol/:id"
    getApi="templateStep/get-protocol"
    title="Add/Update Protocol"
    defaultObj={defaultObj}
    tableTitle='Protocol Master'
    // processListCallback={processList}
    />)
}