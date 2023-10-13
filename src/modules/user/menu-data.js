export const getMenuData = (itemData) => {
    return [{
        col: 3,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [{
            type: "text",
            id: "inputMenuMasterMenuName",
            label: "Menu Name",
            name:"menuName",
            control: "input",
            isRequired: true,                    
            itemVal: itemData.values ? itemData.values["menuName"] : ''
        },
        {
            type: "text",
            id: "inputMenuMasterRoute",
            label: "Route",
            name:"route",
            control: "input",
            isRequired: !itemData?.values?.menuHasChild,                    
            itemVal: itemData.values ? itemData.values["route"] : ''
        },
        {
            type: "text",
            id: "inputMenuMasterMenuIcon",
            label: "Menu Icon",
            name:"menuIcon",
            control: "input",
            isRequired: false,                    
            itemVal: itemData.values ? itemData.values["menuIcon"] : ''
        },
        {
            type: "checkbox",
            id: "inputMenuMasterMenuHasChild",
            label: "Menu Has Child",
            name:"menuHasChild",
            control: "input",
            isRequired: false,                    
            itemVal: itemData.values ? itemData.values["menuHasChild"] : ''
        }
    ]
    },{
        col: 3,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [
            {
                control: "select",
                label: "Parent Menu",
                name: "menuParentId",
                id: "selectMenuMasterMenuParentId",
                options: itemData.options[0],
                isSubmit: itemData.isSubmit,
                isRequired: !itemData?.values?.menuHasChild,
                itemVal: itemData.values ? itemData.values["menuParentId"] : '',
            },
        {
            type: "text",
            id: "inputMenuMastermenuLiClass",
            label: "menu Li Class",
            name:"menuLiClass",
            control: "input",
            isRequired: false,                    
            itemVal: itemData.values ? itemData.values["menuLiClass"] : ''
        },
        {
            control: "select-react",
            label: "User Roles",
            name: "userRoles",
            id: "selectMenuMasterUserRoles",
            options: itemData.options[1],
            isSubmit: itemData.isSubmit,
            multiple: true,
            isRequired: true,
            itemVal: itemData.values ? itemData.values["userRoles"] : '',
        }
    ]
    }];
}

