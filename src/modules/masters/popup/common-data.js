export const getCommonFields = (itemData) => {
    
    return [{
        col: 12,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [
            {
                type: "text",
                id: "inputFileName",
                label: (itemData.type === "Folder"?"Folder Name":"File Name"),
                name: "file_name",
                control: "input",
                isRequired: true,
                itemVal: itemData.values ? itemData.values["file_name"] : '',
            },
        ]
    }]
}