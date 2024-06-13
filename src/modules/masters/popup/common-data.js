export const getCommonFields = (itemData) => {

    return [{
        col: 12,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [
            {
                type: "text",
                id: "inputFileName",
                label: (itemData.type === "Folder" ? "Folder Name" : "Job Name"),
                name: "file_name",
                control: "input",
                isRequired: true,
                itemVal: itemData.values ? itemData.values["file_name"] : '',
            },
            itemData.type === "File"||"Edit" && itemData.filetype === "File"? {
                id: "inputJobType",
                label: "Job Type",
                name: "jobtype",
                options: itemData.options[0],
                control: "select",
                isGeneric: true,
                isRequired: true,
                itemVal: itemData.values ? itemData.values['jobtype_id'] : '',
            } : []
        ]
    }];
}
