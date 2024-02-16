import { useEffect, useState } from "react";
import CommonFormWithList from "../components/common-form-with-list";
import config from "../components/config/config.json";
import axios from "../services/axios";
import { getUserMasterControl } from "./user-master-data";
import auth from "../user/auth";

const UserManagement = () => {

    let defaultObj = {
        id: null,
        username: '', firstname: '',middlename: '', lastname: '',
        email: '', role: null,
        roleId: null, client_id: auth.getStorageData("client_id")
        , isActive: true,
    };

    const [manager, setManagers] = useState([]);
    const [warehouse, setWarehouses] = useState([]);
    const [binLocation, setBinLocations] = useState([]);
    const [role, setRoles] = useState([]);
    const [clients, setClients] = useState([]);

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
        axios.getWithCallback("clients", (data) => setClients(data.map(x => ({ value: x.id, label: x.name }))))
        

    },[])
    const isSuperAdmin = auth.getStorageData("role") == "SUPERADMIN";
    // const processData=(data)=>{
    //     const newData = data.map(x => {
    //         return {
    //             ...x, userRoles: x.UsersToRoles.map(x => x.role_id)
    //         }
    //     });

    //     return newData;
    //   }

    // const updateData = (item) => {
    //     return {
    //         id: item.id,
    //         profileId: item.profileId,
    //         manager: item.manager,
    //         email: item.email,
    //         firstName: item.firstname,
    //         middleName: item.middlename,
    //         lastName: item.lastname,
    //         warehouse: item.warehouse,
    //         binLocation: item.binLocation,
    //         warehouseId: item.warehouseId,
    //         binLocationId: item.binLocationId,
    //         profileImage: item.profileImage,
    //         roleId: item.roleId,
    //         isActive: item.isActive
    //     }

    // }

    return (

    <CommonFormWithList
        formDataAction={getUserMasterControl}
        columns={config.USER_MASTER_COLUMNS}
        insertApi="user"
        updateApi="user"
        getApi="user"
        title="Add / Update User"
        defaultObj={defaultObj}
        options={[role,clients]}
        tableTitle='User Master'
        data={[role]}
        isSuperAdmin={isSuperAdmin}
        // processListCallback={processData}
        // updateApiCallback={updateData}
        // disabledAdd={true}
    />

    )

}

export default UserManagement;