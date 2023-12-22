import React from 'react';
import CommonFormWithList from '../../components/common-form-with-list';
import config from "../../components/config/config.json"
// import { getClientFields } from './client-data';
// import { getReadFields } from './read-data';
import CommonModel from '../../components/common-modal';
import { getReadFields } from './read-data';

const Read = () => {

    let defaultObj = { name: '', abbreviation: '', active: true };

    return (
        <>
            <CommonModel   // this file create copy from common-form-with-list and Datatable componet Remove from Comman Model componete
                formDataAction={getReadFields}
                columns={config.CLIENT}
                // insertApi="clients"
                // updateApi="clients/:id"
                // getApi="clients"
                title="Read"
                defaultObj={defaultObj}
                tableTitle='client'
            />
        </>
    );
};

export default Read;