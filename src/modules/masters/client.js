import React from 'react';
import CommonFormWithList from '../components/common-form-with-list';
import config from "../components/config/config.json"
import { getClientFields } from './client-data';

const Client = () => {

    let defaultObj = { name: '', abbreviation: '', active: true, client_id: "" }

    return (
        <>
            <CommonFormWithList
                formDataAction={getClientFields}
                columns={config.CLIENT}
                insertApi="clients"
                updateApi="clients/:id"
                deleteApi="clients/:id"
                getApi="clients"
                title="Client"
                defaultObj={defaultObj}
                tableTitle='Client'
            />
        </>
    );
};

export default Client;