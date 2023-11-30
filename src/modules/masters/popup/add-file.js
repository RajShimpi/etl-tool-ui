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

    let defaultObj = { name: '', abbreviation: '', active: true };

    return (
        <>
            <CommonModel   // this file create copy from common-form-with-list and Datatable componet Remove from Comman Model componete
                formDataAction={getFileFields}
                columns={config.CLIENT}
                // insertApi="clients"
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
