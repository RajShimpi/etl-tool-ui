export const getCommonFields = (itemData) => {
    return [{
        col: 3,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [
            {
                type: "text",
                id: "inputFileName",
                label: "File Name",
                name: "file_name",
                control: "input",
                isRequired: true,
                itemVal: itemData.values ? itemData.values["file_name"] : '',
            },
            {
                type: "text",
                id: "inputFileName",
                label: "File Name",
                name: "file_name",
                control: "input",
                isRequired: true,
                itemVal: itemData.values ? itemData.values["file_name"] : '',
            },
            {
                type: "text",
                id: "inputFileName",
                label: "File Name",
                name: "file_name",
                control: "input",
                isRequired: true,
                itemVal: itemData.values ? itemData.values["file_name"] : '',
            },
            {
                type: "text",
                id: "inputFileName",
                label: "File Name",
                name: "file_name",
                control: "input",
                isRequired: true,
                itemVal: itemData.values ? itemData.values["file_name"] : '',
            },
            {
                type: "text",
                id: "inputFileName",
                label: "File Name",
                name: "file_name",
                control: "input",
                isRequired: true,
                itemVal: itemData.values ? itemData.values["file_name"] : '',
            },
        ]
    }]
}