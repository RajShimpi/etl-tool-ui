export const getJobStepFields = (itemData) => {
    return [{
        col: 4,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [{
            type: "text",
            id: "inputParameterName",
            label: "Job",
            name: "job_id",
            control: "select",
            options: itemData.options[0],
            isRequired: true,
            itemVal: itemData.values ? itemData.values["job_id"] : '',
        }, {
            id: "inputParameterContext",
            label: "Step Type",
            name: "step_type_id",
            control: "select",
            options: itemData.options[1],
            isRequired: true,
            itemVal: itemData.values ? itemData.values["step_type_id"] : '',
        }, {
            type: "text",
            id: "inputParameterDisplay_name",
            label: "Step Name",
            name: "step_name",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["step_name"] : '',
        }, {
            id: "inputParameterDescription",
            label: "Ok",
            name: "ok_step",
            options: itemData.options[2],
            control: "select",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["ok_step"] : '',
        }, {
            id: "inputParameterType",
            label: "Error",
            name: "error_step",
            control: "select",
            options: itemData.options[3],
            isRequired: true,
            itemVal: itemData.values ? itemData.values["error_step"] : '',
        },
        ]
    }];
}