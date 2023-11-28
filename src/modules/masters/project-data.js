export const getProjectFields = (itemData) => {
    return [{

        col: 4,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [{
            type: "text",
            id: "inputprojectName",
            label: "project_name",
            name:"project_name",
            control: "input",
            isRequired: true,             
            itemVal: itemData.values ? itemData.values["project_name"] : '',
        },
        {
            type: "number",
            id: "inputDisplayabbreviation",
            label: "Client Display Client_Id",
            name:"client_id",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["client_id"] : '',
        },
        {
            type: "text",
            id: "inputDisplaybase_location",
            label: "Client Display Base Location",
            name:"base_location",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["base_location"] : '',
        },
    ]
    }   
    ];
}