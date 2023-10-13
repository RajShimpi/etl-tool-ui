export const getBranchFields = (itemData) => {
    return [{

        col: 12,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [{
            type: "text",
            id: "inputBranchName",
            label: "Branch Name",
            name:"name",
            control: "input",
            isRequired: true,             
            itemVal: itemData.values ? itemData.values["name"] : '',
        }]
    }   
    ];
}
