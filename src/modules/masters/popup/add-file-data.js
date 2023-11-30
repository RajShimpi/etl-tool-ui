export const getFileFields = (itemData) => {
    return [{
        col: 12,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [{
            type: "text",
            id: "inputFileName",
            label: "File Name",
            name: "name",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["name"] : '',
        },
        ]
    },
    {
        col: 12,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [
            {
                type: "text",
                id: "inputDisplayabbreviation",
                label: "Location",
                name: "location",
                control: "input",
                isRequired: true,
                itemVal: itemData.values ? itemData.values["location"] : '',
            }
        ]
    },
    {
        col: 12,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [
            {
                type: "text",
                id: "inputDisplaybase_location",
                label: "Active",
                name: "cache",
                control: "input",
                isRequired: true,
                itemVal: itemData.values ? itemData.values["base_location"] : '',
            }
        ]
    }
    ]
}
