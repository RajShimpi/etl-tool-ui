export const getFolderFields = (itemData) => {
    return [{

        col: 12,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [{
            type: "text",
            id: "inputprojectName",
            label: "Folder Name",
            name: "name",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["type"] : '',
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
                label: "Cache?",
                name: "cache",
                control: "input",
                isRequired: true,
                itemVal: itemData.values ? itemData.values["base_location"] : '',
            }
        ]
    }
    ]
}
