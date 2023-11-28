export const getProjectFileFields = (itemData) => {
    return [{

        col: 4,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [{
            type: "text",
            id: "inputProjectFileid",
            label: "project_id",
            name:"project_id",
            control: "input",
            isRequired: true,             
            itemVal: itemData.values ? itemData.values["project_id"] : '',
        },
        {
            type: "text",
            id: "inputDisplayType",
            label: "Project File Display Type",
            name:"type",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["type"] : '',
        },
        {
            type: "text",
            id: "inputDisplayFileName",
            label: "Project File Display Name",
            name:"file_name",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["file_name"] : '',
        },
        {
            type: "text",
            id: "inputDisplayParentId",
            label: "Project File Display Parent Id",
            name:"parent_id",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["parent_id"] : '',
        },
    ]
    }   
    ];
}