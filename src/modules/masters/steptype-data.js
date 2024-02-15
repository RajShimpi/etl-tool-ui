export const getSteptypeFields = (itemData) => {
    return [{
        col: 4,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [
        {
            type: "text",
            id: "inputprojectName",
            label: "Step_Type",
            name: "type",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["type"] : '',
        },{
            id: "inputDisplayclientId",
            label: "Step Name",
            name: "name",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["name"] : '',
        },{
            type: "text",
            id: "inputDisplaybase_location",
            label: "img",
            name: "img",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["img"] : '',
        },{
            type: "text",
            id: "inputDisplaybase_location",
            label: "Group",
            name: "group",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["group"] : '',
        },
        ]
    }];
}