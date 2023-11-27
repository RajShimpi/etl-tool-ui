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
export const getClientFields = (itemData) => {
    return [{

        col: 4,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [{
            type: "text",
            id: "inputclientName",
            label: "Emp_Code",
            name:"emp_code",
            control: "input",
            isRequired: true,             
            itemVal: itemData.values ? itemData.values["emp_code"] : '',
        },
        {
            type: "text",
            id: "inputDisplayFirstname",
            label: "Client Display Firstname",
            name:"firstname",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["firstname"] : '',
        },
        {
            type: "text",
            id: "inputDisplayMiddlename",
            label: "Client Display MiddleName",
            name:"middlename",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["middlename"] : '',
        },
        {
            type: "text",
            id: "inputDisplayLastname",
            label: "Client Display Lastname",
            name:"lastname",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["lastname"] : '',
        },
        {
            type: "text",
            id: "inputDisplayEmail",
            label: "Client Display email",
            name:"email",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["email"] : '',
        }
    ]
    }   
    ];
}