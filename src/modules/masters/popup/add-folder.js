import React from 'react';
import config from "../../components/config/config.json"
import CommonModel from '../../components/common-modal';
import { getFolderFields } from './add-folder-data';

const Folder = () => {
    // const [formData, setFormData] = useState({
    //     id: null,
    //     name:'',
    //     abbreviation:'',
    // });

    let defaultObj = { project_name: '', client_id:1, base_location: "true" };

    return ( 
        <>
            <CommonModel   // this file create copy from common-form-with-list and Datatable componet Remove from Comman Model componete
                formDataAction={getFolderFields}
                columns={config.PROJECT}
                insertApi="projects"
                // updateApi="clients/:id"
                // getApi="clients"
                title="Add Folder"
                defaultObj={defaultObj}
            // tableTitle='client'
            />
        </>
    );
};

export default Folder;
