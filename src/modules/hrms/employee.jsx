import { useEffect, useState } from "react";

import CommonFormWithList from "../components/common-form-with-list";
import axios from "../services/axios";
import config from "../config/config.json"
import { getEmployeeFields } from "./employee-data";

export const Employees = (props) => {

    const [branches, setBranches] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [genderState,] = useState([...config.GENDER])
    const [managerData, setManagerData] = useState([])

    let defaultObj = {
        emp_code: '', aadharCard: '', dateOfBirth: '', firstname: '',
        gender: "", jobTitle: '', joiningDate: '', lastname: '',
        middlename: '', mobilePhone: null, officialEmail: '',
        personalEmail: '', active: true,
        branchId:"", departmentId:"",
        manager: ''
    };

    useEffect(() => {
        axios.getWithCallback("department/?sort=name,ASC", (data) =>
            setDepartments(data.map(x => { return { value: x.id, label: x.name } })), null, "HRMS");
        axios.getWithCallback("branch/?sort=name,ASC", (data) => 
            setBranches(data.map(x => { return { value: x.id, label: x.name } }))
        , null, "HRMS");

        axios.getWithCallback("employee",
            (data) => setManagerData(data.map(x => {
                    return {
                        value: x.id,
                        label: `${x.emp_code}-${x.firstname}-${x.middlename}-${x.lastname}`, uniqueVal: x.emp_code
                    }
                })), null, "HRMS");
    }, [])

    return (<CommonFormWithList
        formDataAction={getEmployeeFields}
        columns={config.EMPLOYEE_COLUMNS}
        insertApi="employee"
        updateApi="employee/:id"
        getApi="employee"
        title="Add/Update Employees"
        defaultObj={defaultObj}
        apiCallerKey="HRMS"
        options={[branches, departments, genderState]}
        data={managerData}
        tableTitle='Employee Master'
    />)
}