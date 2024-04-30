export const geClientDashboardFields = (itemData) => {
    return [{
        col: 4,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [{
            id: "input Client Id",
            label: "Client Name",
            name: "client_id",
            options: itemData.options[0],
            control: "select",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["client_id"] : '',
        }, {
            id: "input Dashboard Name",
            label: "Dashboard Name",
            name: "dashboard_id",
            options: itemData.options[1],
            control: "select",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["dashboard_id"] : '',
        }
        ]
    }];
}