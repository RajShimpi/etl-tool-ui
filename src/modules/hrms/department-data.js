export const getDepartmentFields = (itemData) => {
    return [{

        col: 12,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [{
            type: "text",
            id: "inputDepartmentName",
            label: "Department Name",
            name:"name",
            control: "input",
            isRequired: true,             
            itemVal: itemData.values ? itemData.values["name"] : '',
        }]
    }   
    ];
}
