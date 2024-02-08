
import CommonFormWithList from "../components/common-form-with-list";
import config from "../components/config/config.json"



export const SystemConfig = (props) => {

    //const [systemconfigs, setSystemConfigs] = useState([]);
    
    let defaultObj = { parameter:'', description:'', value:'', active: true };

    
    return (<CommonFormWithList 
    formDataAction={getSystemConfigFields}
    columns={config.SYSTEM_CONFIG}
    insertApi="system-config"
    updateApi="system-config/:id"
    getApi="system-config"
    title="Add/Update System Configurations"
    defaultObj={defaultObj}
    tableTitle={'System Config Master'}
    //options={branches}
    //apiCaller={hrmsapis}
    //apiCallerKey="HRMS"
    />)
}

const getSystemConfigFields = (itemData) => {
    return [{

        col: 4,
        callback: itemData.callback,
        disabled: itemData.disabled,
        groups: [
        {
            type: "text",
            id: "inputParameter",
            label: "Parameter",
            name:"parameter",
            control: "input",
            isRequired: true,             
            itemVal: itemData.values ? itemData.values["parameter"] : '',
        },
        {
            type: "text",
            id: "inputDescription",
            label: "Description",
            name:"description",
            control: "input",
            isRequired: false,
            itemVal: itemData.values ? itemData.values["description"] : '',
        },
        {
            type: "text",
            id: "inputValue",
            label: "Value",
            name:"value",
            control: "input",
            isRequired: true,
            itemVal: itemData.values ? itemData.values["value"] : '',
        },
        ]
    }   
    ];
}
