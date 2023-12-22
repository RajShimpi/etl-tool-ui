export const getStepTypeParameter = (itemData) => {
    return [{
        col: 4,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [{
            id: "inputStepId",
            label: "Step Name",
            name: "step_id",
            options: itemData.options[0],
            control: "select",
            isSubmit: itemData.isSubmit,
            isRequired: !itemData?.values?.step_id,
            itemVal: itemData.values ? itemData.values["step_id"] : '',
        },
        {
            id: "inputParameterId",
            label: "Parameter Id",
            name: "parameter_id",
            options: itemData.options[1],
            control: "select",
            isSubmit: itemData.isSubmit,
            isRequired: !itemData?.values?.parameter_id,
            itemVal: itemData.values ? itemData.values["parameter_id"] : '',
        },
        {
            type: "checkbox",  
            id: "inputRequired",
            label: "Required",
            name: "required",
            control: "input",
            isRequired: false,
            itemVal: itemData.values ? itemData.values["required"] : '',
        }
    ]
    }];
}