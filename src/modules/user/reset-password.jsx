import React, { useEffect, useState } from 'react';
import FormCommon from '../components/form-common';
import axios from '../services/axios';
import Swal from "sweetalert2";

const getResetPasswordForm = (itemData) => {
    return [
        {
            col: 3,
            callback: itemData.callback,
            disabled: itemData.disabled,
            groups: [
                {
                    control: "select-react",
                    label: "Name",
                    name: "name",
                    id: "inputName",
                    options: itemData.options[0],
                    isRequired: true,
                    itemVal: itemData.values ? itemData.values["user"] : '',
                },
                {
                    type: "text",
                    id: "input-employee-code",
                    label: "Employee Code",
                    name: "emp_code",
                    control: "input",
                    disabled: true,
                    itemVal: itemData.values ? itemData.values["emp_code"] : '',
                },
                {
                    type: "text",
                    id: "input-manager",
                    label: "Manager",
                    name: "manager",
                    control: "input",
                    disabled: true,
                    itemVal: itemData.values ? itemData.values["manager"] : '',
                },
                {
                    type: "text",
                    id: "input-warehouse",
                    label: "Warehouse",
                    name: "warehouse",
                    control: "input",
                    disabled: true,
                    itemVal: itemData.values ? itemData.values["warehouse"] : '',
                },   
            ]
        }
    ]
}

const ResetPassword = () => {

    let defaultObj = {
        id: null, 
        name: null,
        managerId: null, 
        manager: null, 
        warehouseId: null, 
        warehouse: null, 
        emp_code: null,
        active: true,
    };

    const [data, setData] = useState({ ...defaultObj })
    const [isSubmit, setSubmit] = useState(false);
    const [users, setUsers] = useState([]);
    const [manager, setManagers] = useState([]);
    const [warehouse, setWarehouses] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {

        axios.getWithCallback("warehouse", (data) => setWarehouses(data.map(x =>({ value: x.id, label: x.WhsCode }))));

        axios.getWithCallback("user", (data) => {

            setAllUsers(data)

            setUsers(data.map((x, i) => ({
                value: x.id,
                label: `${x.userProfile?.fullName}`,
                index: i
            })))
        })

    },[])

    const getManager = (id = null) => {
        
        if (id !== null) {

            const filterItem = allUsers.filter(x => x.id === id)
            return filterItem[0]?.userProfile?.firstNameLastName;

        }

        return '';

    }

    const setValues = (e) => {

        if (!e) return;

        const index = e?.index;
        const selectedUser = allUsers[index]?.userProfile;

        setData((prevState) => ({
            id: e?.value,
            name: e?.label,
            emp_code: allUsers[index]?.employeeCode,
            managerId: selectedUser?.manager,
            manager: getManager(selectedUser?.manager),
            warehouseId: selectedUser?.warehouseId,
            warehouse: selectedUser?.warehouse,
            active: true,
        }))

    }

    const onSubmit = async (e) => {
        
        e.preventDefault();

        await axios.put(`auth/reset-password/${data.id}`)

        Swal.fire(
            `Password Reset Successfully for User: ${data.emp_code} - ${data.name}`,
            '',
            'success'
        )

    }

    return (
        <form onSubmit={onSubmit} className='needs-validation' noValidate>
            <FormCommon 
                data={getResetPasswordForm({
                    isSubmit,
                    // update: update,
                    callback: setValues,
                    values: data,
                    options: [users],
                    data: data,
                    // message: props.message,
                })}
            />
            <div className="col-md-12 d-flex justify-content-end" onClick={() => setSubmit(true)}>
                <button type='submit' style={{ marginRight: "1%" }} className='btn mx-2 btn-update w-xs waves-effect waves-light'>
                    <i className="fa fa-edit"></i> Update
                </button>
            </div>
        </form>
    )

}

export default ResetPassword