import React, { useState } from 'react';
import CommonFormWithList from '../components/common-form-with-list';
import config from "../components/config/config.json"
import { getClientFields } from '../user/roles-data';

const Client = () => {
    const [formData, setFormData] = useState({
        id: null,
        profileId: null,
        profileImage: null,
        emp_code: '',
        firstname: '',
        middlename: '',
        lastname: '',
        email: '',
        manager: null,
        warehouse: null,
        binLocation: null,
        role: null,
        managerId: null,
        warehouseId: null,
        binLocationId: null,
        roleId: null,
        isActive: true,
    });

    let defaultObj = { active: true };

    return (
        <>
            <CommonFormWithList
                formDataAction={getClientFields}
                columns={config.EMPLOYEE_COLUMNS}
                insertApi="client"
                updateApi="client/:id"
                getApi="client"
                title="Client"
                defaultObj={defaultObj}
                tableTitle='client'
            />
        </>
    );
};

export default Client;
