export const getJobFields = (itemData) => {
    return [{
        col: 4,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [{
            type: "text",
            id: "inputParameterName",
            label: "Name",
            name: "name",
            control: "input",
            isSubmit: itemData.isSubmit,
            isRequired: true,
            itemVal: itemData.values ? itemData.values["name"] : '',
        },
        {
            type: "text",
            id: "inputParameterContext",
            label: "Start Step",
            name: "start_step",
            control: "input",
            isSubmit: itemData.isSubmit,
            isRequired: true,
            itemVal: itemData.values ? itemData.values["start_step"] : '',
        },
        {
            type: "text",
            id: "inputParameterDisplay_name",
            label: "Type",
            name: "type",
            control: "input",
            isSubmit: itemData.isSubmit,
            isRequired: true,
            itemVal: itemData.values ? itemData.values["type"] : '',
        },
        {
            // type: "text",/
            id: "inputParameterDescription",
            label: "File",
            name: "job_file_id",
            options: itemData.options[1],
            control: "select",
            isSubmit: itemData.isSubmit,
            isRequired: true,
            itemVal: itemData.values ? itemData.values["job_file_id"] : '',
        },
        {
            // type: "text",
            id: "inputParameterType",
            label: "Project",
            name: "project_id",
            control: "select",
            options: itemData.options[2],
            isSubmit: itemData.isSubmit,
            isRequired: true,
            itemVal: itemData.values ? itemData.values["project_id"] : '',
        },
        {
            // type: "text",
            id: "inputParameterResource",
            label: "Client",
            name: "client_id",
            control: "select",
            options: itemData.options[3],
            isSubmit: itemData.isSubmit,
            isRequired: true,
            itemVal: itemData.values ? itemData.values["client_id"] : '',
        },
        ]
    }];
}