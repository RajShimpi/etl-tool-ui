export const getRoleFields = (itemData) => {
    return [{

        col: 4,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [{
            type: "text",
            id: "inputRoleName",
            label: "Role Name",
            name:"name",
            control: "input",
            isRequired: true,             
            itemVal: itemData.values ? itemData.values["name"] : '',
        },{
            type: "text",
            id: "inputRoleDisplayName",
            label: "Role Display Name",
            name:"displayname",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["displayname"] : '',

        }]
    }   
    ];
}
