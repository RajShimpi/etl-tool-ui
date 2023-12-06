export const getFolderFields = (itemData) => {
    return [{

        col: 12,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [{
            type: "text",
            id: "inputprojectName",
            label: "Folder Name",
            name: "file_name",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["file_name"] : '',
        },
        ]
    }
    ]
}
