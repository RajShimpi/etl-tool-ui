export const getProjectFields = (itemData) => {
    return [{
        col: 4,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [{
            type: "text",
            id: "inputprojectName",
            label: "Project_Name",
            name: "project_name",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["project_name"] : '',
        },
        {
            id: "inputDisplayclientId",
            label: "Client Name",
            name: "client_id",
            options: itemData.options[1],
            control: "select",
            isSubmit: itemData.isSubmit,
            isRequired: !itemData?.values?.client_id,
            itemVal: itemData.values ? itemData.values["client_id"] : '',
        },
        {
            type: "text",
            id: "inputDisplaybase_location",
            label: "Base Location",
            name: "base_location",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["base_location"] : '',
        },
        ]
    }];
}