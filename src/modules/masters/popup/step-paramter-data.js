export const getstepparameterFields = (itemData) => {

    

    return [{
        col: 12,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [{
            id: "inputparameterFileid",
            label: "parameter_name",
            name: "parameter_name",
            options: itemData.options[0],
            control: "select",
            isSubmit: itemData.isSubmit,
            isRequired: !itemData?.values?.paramters,
            itemVal: itemData.values ? itemData.values["parameter_name"] : '',
        },
        // {    
        //     type: "text",     
        //     id: "inputDisplayType",
        //     label: "parameter_context",
        //     name: "parameter_context",
        //     control: "input",
        //     isRequired: true,
        //     itemVal: itemData.values ? itemData.values["parameter_context"] : '',
        // },
        // {
        //     type: "text",
        //     id: "inputDisplayFileName",
        //     label: "parameter_display_name",
        //     name: "parameter_display_name",
        //     control: "input",
        //     isRequired: true,
        //     itemVal: itemData.values ? itemData.values["parameter_display_name"] : '',
        // },
        // {
        //     id: "inputDisplayParentId",
        //     label: "parameter_descirption",
        //     name: "parameter_descirption",
        //     options: itemData.options[1],
        //     control: "input",
        //     isRequired: true,
        //     // isRequired: !itemData?.values?.parent_id,
        //     itemVal: itemData.values ? itemData.values["parameter_descirption"] : '',
        // },
        // {
        //     id: "inputDisplayParentId",
        //     label: "parameter_type",
        //     name: "parameter_type",
        //     options: itemData.options[1],
        //     control: "input",
        //     isRequired: true,
        //     // isRequired: !itemData?.values?.parent_id,
        //     itemVal: itemData.values ? itemData.values["parameter_type"] : '',
        // },
        // {
        //     id: "inputDisplayParentId",
        //     label: "parameter_resource",
        //     name: "parameter_resource",
        //     options: itemData.options[1],
        //     control: "input",
        //     isRequired: true,
        //     // isRequired: !itemData?.values?.parent_id,
        //     itemVal: itemData.values ? itemData.values["parameter_resource"] : '',
        // },
        ]
    } 
    ];
}