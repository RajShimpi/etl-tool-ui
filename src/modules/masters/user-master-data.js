export const getUserMasterControl = (itemData) => {

    return [
        {
            col: 3,
            callback: itemData.callback,
            disabled: itemData.disabled,
            groups: [
                {
                    type: "text",
                    id: "inputUserMasterEmpCode",
                    label: "User Code",
                    name: "username",
                    control: "input",
                    isRequired: true,
                    itemVal: itemData.values ? itemData.values["username"] : '',
                },
                {
                    type: "text",
                    id: "inputFirstName",
                    label: "First Name",
                    name: "firstName",
                    control: "input",
                    isRequired: true,
                    itemVal: itemData.values ? itemData.values["firstName"] : '',
                },
                {
                    type: "text",
                    id: "inputMiddleName",
                    label: "Middle Name",
                    name: "middleName",
                    control: "input",
                    isRequired: true,
                    itemVal: itemData.values ? itemData.values["middleName"] : '',
                },
                {
                    type: "text",
                    id: "inputLastName",
                    label: "Last Name",
                    name: "lastName",
                    control: "input",
                    isRequired: true,
                    itemVal: itemData.values ? itemData.values["lastName"] : '',
                }
            ]
        },
        {
            col: 3,
            callback: itemData.callback,
            disabled: itemData.disabled,
            groups: [
                {
                    type: "text",
                    id: "inputUserMasterEmail",
                    label: "Email",
                    name: "email",
                    control: "input",
                    isRequired: true,
                    itemVal: itemData.values ? itemData.values["email"] : '',
                },
                {
                    type: "password",
                    id: "inputUserMasterPassword",
                    label: "password",
                    name: "password",
                    control: "input",
                    isRequired: true,
                    disabled: itemData.update,
                    itemVal: itemData.values ? itemData.values["password"] : '',
                },
                // {
                //     control: "select-react",
                //     label: "Manager",
                //     name: "manager-user",
                //     id: "inputUserMasterManager",
                //     options: itemData.options[0],
                //     isRequired: true,
                //     itemVal: itemData.values ? itemData.values["manager"] : '',
                //     //data: itemData.data[0]
                // },
                // {
                //     control: "select-react",
                //     label: "Warehouse",
                //     name: "warehouse",
                //     id: "inputUserMasterWarehouse",
                //     options: itemData.options[1],
                //     isRequired: false,
                //     itemVal: itemData.values ? itemData.values["warehouseId"] : '',
                //     //data: itemData.data[1]
                // },
                // {
                //     control: "select-react",
                //     label: "Bin Location",
                //     name: "binLocation",
                //     id: "inputUserMasterBinLocation",
                //     options: itemData.options[2],
                //     isRequired: false,
                //     itemVal: itemData.values ? itemData.values["binLocationId"] : '',
                //     //data: itemData.data[2]
                // },
                {
                    control: "select-react",
                    label: "Role",
                    name: "userRoles",
                    id: "inputUserMasterRole",
                    options: itemData.options[0],
                    isRequired: true,
                    itemVal: itemData.values ? itemData.values["userRoles"] : '',
                    multiple: true,
                    //data: itemData.data[2]
                },
                {
                    id: "inputUserMasterEmail",
                    label: "Client",
                    name: "client_id",
                    control: "select",
                    disabled: !itemData.isSuperAdmin,
                    isRequired: true,
                    options:itemData.options[1],
                    itemVal: itemData.values ? itemData.values["client_id"] : ''
                },
            ]
        },
        {
            col: 3,
            callback: itemData.callback,
            disabled: itemData.disabled,
            groups: [
                
                {
                    type: "checkbox",
                    id: "inputIsActive",
                    label: "Active",
                    name: "isActive",
                    control: "input",
                    isRequired: false,
                    itemVal: itemData.values ? itemData.values["isActive"] : ''
                }
                // {
                //     control: "select-react",
                //     label: "Manager",
                //     name: "manager-user",
                //     id: "inputUserMasterManager",
                //     options: itemData.options[0],
                //     isRequired: true,
                //     itemVal: itemData.values ? itemData.values["manager"] : '',
                //     //data: itemData.data[0]
                // },
                // {
                //     control: "select-react",
                //     label: "Warehouse",
                //     name: "warehouse",
                //     id: "inputUserMasterWarehouse",
                //     options: itemData.options[1],
                //     isRequired: false,
                //     itemVal: itemData.values ? itemData.values["warehouseId"] : '',
                //     //data: itemData.data[1]
                // },
                // {
                //     control: "select-react",
                //     label: "Bin Location",
                //     name: "binLocation",
                //     id: "inputUserMasterBinLocation",
                //     options: itemData.options[2],
                //     isRequired: false,
                //     itemVal: itemData.values ? itemData.values["binLocationId"] : '',
                //     //data: itemData.data[2]
                // },
              
            ]
        }
    ];
}
