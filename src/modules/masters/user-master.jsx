import { useEffect, useState } from "react";
import CommonFormWithList from "../components/common-form-with-list";
import config from "../components/config/config.json";
import axios from "../services/axios";
// import { getUserMasterControl } from "./master-data";

const UserMaster = () => {

    let defaultObj = {
        id: null, profileId: null, profileImage: null,
        emp_code: '', firstname: '',middlename: '', lastname: '',
        email: '', manager: null, warehouse: null, binLocation: null, role: null,
        managerId: null, warehouseId: null, binLocationId: null, roleId: null,
        isActive: true,
    };

    const [manager, setManagers] = useState([]);
    const [warehouse, setWarehouses] = useState([]);
    const [binLocation, setBinLocations] = useState([]);
    const [role, setRoles] = useState([]);

    useEffect(() => {

        // axios.getWithCallback("warehouse", (data) => setWarehouses(data.map(x =>({ value: x.id, label: x.WhsCode }))));
        // axios.getWithCallback("BinLocation", (data) => setBinLocations(data.map(x => ({ value: x.id, label: x.BinName }))));
        axios.getWithCallback("user", (data) => setManagers(data.map(x => (
            {
                value: x.id,
                label: `${x.userProfile?.firstNameLastName}`,
            }
        ))));
        axios.getWithCallback("user-roles", (data) => setRoles(data.map(x => ({ value: x.id, label: x.name }))))


    },[])

    const processData=(data)=>{
        const newData = data.map(x => {
            return {
                id: x.id,
                profileId: x.userProfile?.id,
                emp_code: x.employeeCode,
                firstname: x.userProfile?.firstName,
                middlename: x.userProfile?.middleName,
                lastname: x.userProfile?.lastName,
                email: x.email,
                manager: x.userProfile?.manager,
                warehouse: x.userProfile?.warehouse,
                warehouseId: x.userProfile?.warehouseId,
                binLocation: x.userProfile?.binLocation,
                binLocationId: x.userProfile?.binLocationId,
                profileImage: x.userProfile?.image,
                role: x.usersToRoles[0]?.role?.displayname,
                roleId: x.usersToRoles[0]?.role_id,
                isActive: x.isActive,
            }
        });

        return newData;
    }

    const updateData = (item) => {
        return {
            id: item.id,
            profileId: item.profileId,
            manager: item.manager,
            email: item.email,
            firstName: item.firstname,
            middleName: item.middlename,
            lastName: item.lastname,
            warehouse: item.warehouse,
            binLocation: item.binLocation,
            warehouseId: item.warehouseId,
            binLocationId: item.binLocationId,
            profileImage: item.profileImage,
            roleId: item.roleId,
            isActive: item.isActive
        }

    }

    return (
<></>
    // <CommonFormWithList
    //     formDataAction={getUserMasterControl}
    //     columns={config.USER_MASTER_COLUMNS}
    //     insertApi="user/profile-update/:id"
    //     updateApi="user/profile-update"
    //     getApi="user"
    //     title="Update User-Profile"
    //     defaultObj={defaultObj}
    //     options={[ manager, warehouse, binLocation, role ]}
    //     tableTitle='User Master'
    //     data={[ manager, warehouse, binLocation, role ]}
    //     processListCallback={processData}
    //     updateApiCallback={updateData}
    //     disabledAdd={true}
    // />

    )

}

export default UserMaster;