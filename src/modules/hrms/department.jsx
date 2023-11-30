
import CommonFormWithList from "../components/common-form-with-list";
import { getDepartmentFields } from "./department-data";
import config from "../components/config/config.json"

//import baseApiCaller from "../services/baseApiCaller";
//import hrmsapis from "../services/hrmsapis";
export const Department = (props) => {

    // const [departments, setDepartments] = useState([]);
    
    let defaultObj = { name:'', active: true };

    // useEffect(() => {
    //     axios.getWithCallback("department/", (data) => setDepartments(data.map(x => { return { value: x.id, label: x.name  }})), null, "HRMS");
    // }, [])
    // const processList = (list) => {
    //     return list.map(x =>  { return { ...x, templateId: x.id}});
    // }
    return (<CommonFormWithList 
    formDataAction={getDepartmentFields}
    columns={config.DEPARTMENT_COLUMNS}
    insertApi="department"
    updateApi="department/:id"
    getApi="department"
    title="Add/Update Departments"
    defaultObj={defaultObj}
    // options={departments}
    //apiCaller={hrmsapis}
    apiCallerKey="HRMS"
    tableTitle='Department Master'
    />)
}