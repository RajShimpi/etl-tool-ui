import React from 'react';
import config from "../../components/config/config.json"
import CommonModel from '../../components/common-modal';
import { getEditFields } from './edit-file-data';

const Edit = () => {
    // const [formData, setFormData] = useState({
    //     id: null,
    //     name:'',
    //     abbreviation:'',
    // });

    let defaultObj = { project_name: '', client_id: 1, base_location: "true" };

    return (
        <>
            <CommonModel   // this file create copy from common-form-with-list and Datatable componet Remove from Comman Model componete
                formDataAction={getEditFields}
                columns={config.PROJECT}
                // insertApi="clients"
                updateApi="projects/:id"
                // getApi="clients"
                title="Edit"
                defaultObj={defaultObj}
                // tableTitle='client'
            />
        </>
    );
};

export default Edit;
