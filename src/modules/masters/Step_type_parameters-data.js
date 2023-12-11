export const  getStep_type_parametersFields = (itemData) => {
    return [{

        col: 4,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [ {
            type: "text",
            id: "inputDisstep_type_parametersId",
            label: "step_id",
            name:"step_id",
            // options: itemData.options[0],
            control: "input",
            // isSubmit: itemData.isSubmit,
            isRequired: true,
            itemVal: itemData.values ? itemData.values["step_id"] : '',
        },
            
            {
            type: "text",
            id: "inputprojectName",
            label: "parameter_id",
            name:" parameter_id",
            control: "input",
            isRequired: true,             
            itemVal: itemData.values ? itemData.values["parameter_id"] : '',
        },
       
        {
            type: "text",
            id: "inputDisplaybase_location",
            label: "required",
            name:"required",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["required"] : '',
        }
        
    ]
    }   
    ];
}