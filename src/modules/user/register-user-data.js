const getRegisterData = (itemData) => [{
    col: 4,
    callback: itemData.callback,
    disabled: itemData.disabled,
    groups:[{
        type: "text",
        name: "firstName",
        id: "inputUserFirstName",
        label: "First Name",
        control: "input",
        isRequired: true,
        itemVal: itemData.values ? itemData.values["firstName"] : '',
    }, {
        type: "text",
        name: "lastName",
        id: "inputUserLastName",
        label: "Last Name",
        control: "input",
        isRequired: false,
        itemVal: itemData.values ? itemData.values["lastName"] : '',
    },{
        type: "email",
        name: "email",
        id: "inputUserEmail",
        label: "Email Address",
        control: "input",
        isRequired: true,
        itemVal: itemData.values ? itemData.values["email"] : '',
    }]
},{
    col: 4,
    callback: itemData.callback,
    disabled: itemData.disabled,
    groups:[{
        control: "select",
        label: "Select Role",
        name: "role",
        id: "selectRole",                
        options: itemData.roles,
        isSubmit: itemData.isSubmit,
        isRequired: true,
        itemVal: itemData.values ? itemData.values["role"] : '',
    }, {
        type: "password",
        name: "password",
        id: "inputUserPassword",
        label: "Password",
        control: "input",
        isRequired: true,
        itemVal: itemData.values ? itemData.values["password"] : '',
    }]
}];

export default {
    getRegisterData
}