
import CommonFormWithList from "../components/common-form-with-list";
import { getTemplateType } from "./template-data";

import config from "../config/config.json"
export const TemplateMaster = (props) => {
    
    let defaultObj = { active: true };

    const processList = (list) => {
        return list.map(x =>  { return { ...x, templateId: x.id}});
    }

    return (<CommonFormWithList 
    formDataAction={getTemplateType}
    columns={config.TEMPLATE_TYPE_COLUMNS}
    insertApi="template/save"
    updateApi="template/update/:id"
    getApi="template/get"
    title="Add/Update Template"
    defaultObj={defaultObj}
    processListCallback={processList}
    tableTitle='Template Type Master'
    />)
}