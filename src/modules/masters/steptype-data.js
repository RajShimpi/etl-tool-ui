export const getSteptypeFields = (itemData) => {
    return [{
        col: 4,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [
        {
            type: "text",
            id: "inputStepType",
            label: "Step Type",
            name: "type",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["type"] : '',
        },{
            id: "inputDisplayStepName",
            label: "Step Name",
            name: "name",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["name"] : '',
        },{
            type: "text",
            id: "inputimg",
            label: "img",
            name: "img",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["img"] : '',
        },{
            type: "text",
            id: "inputStepGroup",
            label: "Group",
            name: "group",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["group"] : '',
        }, {
            type: "text",
            id: "inputParams",
            label: "Params",
            name: "params",
            control: "textarea",
            isRequired: false,
            itemVal: itemData.values ? itemData.values["params"] : '',
            span: itemData.message?.params,
            apiDataType: "json"
        }, 
        ]
    }];
}