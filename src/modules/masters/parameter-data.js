export const getParameterFields = (itemData) => {
    return [{

        col: 4,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [ {
            type: "text",
            id: "inputDisplayparameterId",
            label: "parameter Name",
            name:"name",
            // options: itemData.options[0],
            control: "input",
            // isSubmit: itemData.isSubmit,
            isRequired: true,
            itemVal: itemData.values ? itemData.values["name"] : '',
        },
            
            {
            type: "text",
            id: "inputprojectName",
            label: "context",
            name:" context",
            control: "input",
            isRequired: true,             
            itemVal: itemData.values ? itemData.values["context"] : '',
        },
       
        {
            type: "text",
            id: "inputDisplaybase_location",
            label: "display_name",
            name:"display_name",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["display_name"] : '',
        },
         {
            type: "text",
            id: "inputDisplaybase_location",
            label: "descirption",
            name:"descirption",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["descirption"] : '',
        },
        {
            type: "text",
            id: "inputDisplaybase_location",
            label: "type",
            name:"type",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["type"] : '',
        },
        {
            type: "text",
            id: "inputDisplaybase_location",
            label: "resource",
            name:"resource",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["resource"] : '',
        }

    ]
    }   
    ];
}