const getTypeConfigMaster = (itemData) => {
    return [{

        col: 3,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [{
            type: "text",
            id: "inputCategory",
            label: "Category",
            name: "category",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["category"] : '',
        }, {
            type: "text",
            id: "inputValue",
            label: "Value",
            name: "value",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["value"] : '',
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

        }, {
            type: "checkbox",
            id: "inputIsActive",
            label: "Active",
            name: "isActive",
            control: "input",
            isRequired: false,
            itemVal: itemData.values ? itemData.values["isActive"] : ''
        }]
    }];
}

export {
    getTypeConfigMaster
}