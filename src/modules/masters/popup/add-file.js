import React from 'react';
import config from "../../components/config/config.json"
import CommonModel from '../../components/common-modal';
import { getFileFields } from './add-file-data';

const AddFile = () => {
    // const [formData, setFormData] = useState({
    //     id: null,
    //     name:'',
    //     abbreviation:'', 
    // });
    let defaultObj =  {  file_name:'',project_id:1, type: 'File',parent_id:1};

    return (
        <>
            <CommonModel   // this file create copy from common-form-with-list and Datatable componet Remove from Comman Model componete
                formDataAction={getFileFields}
                columns={config.PROJECT_FILE}
                insertApi="project-files"
                // updateApi="clients/:id"
                // getApi="clients"
                title="Add File"
                defaultObj={defaultObj}
            // tableTitle='client'
            />
        </>
    );
};

export default AddFile;
