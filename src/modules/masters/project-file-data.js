export const getProjectFileFields = (itemData) => {
    return [{
        col: 4,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [
        {
            id: "inputProjectFileid",
            label: "project Name",
            name: "project_id",
            options: itemData.options[0],
            control: "select",
            isSubmit: itemData.isSubmit,
            isRequired: !itemData?.values?.project_id,
            itemVal: itemData.values ? itemData.values["project_id"] : '',
        },{
            type: "text",
            id: "inputDisplayType",
            label: "Project File Display Type",
            name: "type",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["type"] : '',
        },{
            type: "text",
            id: "inputDisplayFileName",
            label: "Project File Display Name",
            name: "file_name",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["file_name"] : '',
        },{
            id: "inputDisplayParentId",
            label: "Parent Id",
            name: "parent_id",
            options: itemData.options[1],
            control: "select",
            isSubmit: itemData.isSubmit,
            itemVal: itemData.values ? itemData.values["parent_id"] : '',
        },
        ]
    }];
}