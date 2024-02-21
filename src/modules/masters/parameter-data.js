export const getParameterFields = (itemData) => {
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
            isRequired: true,
            itemVal: itemData.values ? itemData.values["name"] : '',
        }, {
            type: "text",
            id: "inputParameterContext",
            label: "Context",
            name: "context",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["context"] : '',
        }, {
            type: "text",
            id: "inputParameterDisplay_name",
            label: "Display Name",
            name: "display_name",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["display_name"] : '',
        }, {
            type: "text",
            id: "inputParameterDescription",
            label: "Description",
            name: "description",
            control: "input",
            isSubmit: itemData.isSubmit,
            isRequired: true,
            itemVal: itemData.values ? itemData.values["description"] : '',
        }, {
            type: "text",
            id: "inputParameterType",
            label: "Type",
            name: "type",
            control: "input",
            isSubmit: itemData.isSubmit,
            isRequired: true,
            itemVal: itemData.values ? itemData.values["type"] : '',
        }, {
            type: "text",
            id: "inputParameterResource",
            label: "Resource",
            name: "resource",
            control: "input",
            isSubmit: itemData.isSubmit,
            isRequired: false,
            itemVal: itemData.values ? itemData.values["resource"] : '',
        }
        ]
    }];
}