export const getTemplateType = (itemData) => {
    return [{

        col: 3,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [{
            type: "text",
            id: "inputTemplateName",
            label: "Template Name",
            name:"name",
            control: "input",
            isRequired: true,             
            itemVal: itemData.values ? itemData.values["name"] : '',
        },
        {
            type: "text",
            id: "inputTemplateDescription",
            label: "Description",
            name:"description",
            control: "input",
            isRequired: true,             
            itemVal: itemData.values ? itemData.values["description"] : '',
        },
        {
            
            id: "selectTemplateScope",
            label: "Scope",
            name:"scope",
            options: itemData.options[0],           
            isRequired: true,             
            itemVal: itemData.values ? itemData.values["scope"] : '',
            control: "select",

        },
        
        ]
    },
    {
        col: 3,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups:[{
            
            id: "selectTemplateReactionType",
            label: "Reaction Type",
            name:"reaction_type_id",
            options: itemData.options[1],           
            isRequired: true,             
            itemVal: itemData.values ? itemData.values["reaction_type_id"] : '',
            control: "select",

        }
        ,{
            type: "checkbox",
            id: "inputIsActive",
            label: "Active",
            name: "active",
            control: "input",
            update: !itemData.update,
            itemVal: itemData.values ? !!itemData.values["active"] : false,
        }  ]
    }];
};

export const getProtocolType = (itemData) => {
    return [{

        col: 6,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [{
            type: "text",
            id: "inputProtocolNameData",
            label: "Protocol Name",
            name:"ProtocolName",
            control: "input",
            isRequired: true,             
            itemVal: itemData.values ? itemData.values["ProtocolName"] : '',
        },{
            type: "checkbox",
            id: "inputIsActive",
            label: "Active",
            name: "active",
            control: "input",
            update: !itemData.update,
            itemVal: itemData.values ? !!itemData.values["active"] : false,
        }  
        ]
    }   
    ];
};

export const getTemplateItems = (itemData) => {
    return [{

        col: 12,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [{
            type: "text",
            id: "inputTemplateItemLine",
            label: "Template Line",
            name:"line",
            control: "input",
            isRequired: true,             
            itemVal: itemData.values ? itemData.values["line"] : '',
        },
        
        ]
    },{

        col: 4,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [{
            
            
                id: "selectProtocolTypeId",
                label: "Protocol Type",
                name:"protocol_type_id",
                options: itemData.options,           
                isRequired: true,             
                itemVal: itemData.values ? itemData.values["protocol_type_id"] : '',
                control: "select",
    
            },
            {
                type: "text",
                id: "inputTemplateIcon",
                label: "Template symbol",
                name:"symbol",
                control: "input",
                isRequired: false,             
                itemVal: itemData.values ? itemData.values["symbol"] : '',
            },
            {
                type: "checkbox",
                id: "inputIsActive",
                label: "Active",
                name: "active",
                control: "input",
                update: !itemData.update,
                itemVal: itemData.values ? !!itemData.values["active"] : false,
            }  
        ]  
    }
    ];
}

// export const getTemplateItemControls = (itemData) => {
//     return [{

//         col: 3,
//         callback: itemData.callback,
//         disabled: itemData.disabled,
//         groups: [
//             {
            
//                 id: "selectTemplateItem",
//                 label: "Template Name",
//                 name:"TemplateItemId",
//                 options: itemData.options[0],           
//                 isRequired: true,             
//                 itemVal: itemData.values ? itemData.values["TemplateItemId"] : '',
//                 control: "select",
    
//             },
//             {
            
//                 id: "selectControlName",
//                 label: "Control Name",
//                 name:"controlName",
//                 options: itemData.options[1],           
//                 isRequired: true,             
//                 itemVal: itemData.values ? itemData.values["controlName"] : '',
//                 control: "select",
    
//             },
//         {
//             type: "text",
//             id: "input",
//             label: "Resource Name",
//             name:"resourceName",
//             control: "input",
//             isRequired: false,             
//             itemVal: itemData.values ? itemData.values["resourceName"] : '',
//         },
//         {
//             type: "number",
//             id: "input",
//             label: "Order",
//             name:"order",
//             control: "input",
//             isRequired: true,             
//             itemVal: itemData.values ? itemData.values["order"] : '',
//         },    
//         {
//             type: "checkbox",
//             id: "inputIsActive",
//             label: "Active",
//             name: "active",
//             control: "input",
//             update: !itemData.update,
//             itemVal: itemData.values ? !!itemData.values["active"] : false,
//         }  
//         ]
//     }   
//     ];
// }

export const getTemplateStepControlData = (itemData) => {
        return [            
            {
                callback: itemData.callback,
                id: "selectTemplateControlcontrolType",
                // label: "Control Name",
                name:"controlType",
                options: itemData.options[1],         
                             
                
                itemVal: itemData.values ? itemData.values["controlType"] : '',
                control: "select",
                disabled: itemData.disabled
    
            }, 
            {
                callback: itemData.callback,
                type: "text",
                id: "inputTemplateControlresource",
                // label: "Resource Name",
                name:"resource",
                control: "input",
                // isRequired: false, 
                disabled: itemData.disabled,            
                itemVal: itemData.values ? itemData.values["resource"] : '',
            },            
            {
                callback: itemData.callback,
                type: "number",
                id: "inputTemplateControlOrder",                
                name:"order",
                control: "input",                
                disabled: itemData.disabled,            
                itemVal: itemData.values ? itemData.values["order"] : '',
            },
            {
                callback: itemData.callback,
                type: "text",
                id: "inputRemark",
                // label: "Resource Name",
                name:"remark",
                control: "input",              
                disabled: itemData.disabled,            
                itemVal: itemData.values ? itemData.values["remark"] : '',
            },    
        {
            callback: itemData.callback,
            type: "checkbox",
            id: "inputIsActive",
            label: "Active",
            name: "active",
            control: "input",
            update: !itemData.update,
            disabled: itemData.disabled,
            itemVal: itemData.values ? !!itemData.values["active"] : true,
        }  
        ];
}

