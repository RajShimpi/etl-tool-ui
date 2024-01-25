export const getClientFields = (itemData) => {
    return [{
        col: 4,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [{
            type: "text",
            id: "inputclientName",
            label: "Name",
            name: "name",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["name"] : '',
        }, {
            type: "text",
            id: "inputDisplayabbreviation",
            label: "Client Display abbreviation",
            name: "abbreviation",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["abbreviation"] : '',
        },
         {
            type: "text",
            id: "inputDisplayabbreviation",
            label: "Client ID",
            name: "client_id",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["client_id"] : '',
        },
        ]
    }];
}