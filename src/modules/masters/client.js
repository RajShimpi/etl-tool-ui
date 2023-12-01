import React from 'react';
import CommonFormWithList from '../components/common-form-with-list';
import config from "../components/config/config.json"
import { getClientFields } from './client-data';

const Client = () => {
    // const [formData, setFormData] = useState({
    //     id: null,
    //     name:'',
    //     abbreviation:'',
    // });

    let defaultObj = {name:'',abbreviation:'', active: true };

    return (
        <>      
            <CommonFormWithList
                formDataAction={getClientFields}
                columns={config.CLIENT}
                insertApi="clients"
                updateApi="clients/:id"
                getApi="clients"
                title="Client"
                defaultObj={defaultObj}
                tableTitle='Client'
            />
        </>
    );
};

export default Client;
