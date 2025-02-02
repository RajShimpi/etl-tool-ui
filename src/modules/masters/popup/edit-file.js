import React from 'react';
import config from "../../components/config/config.json"
import CommonModel from '../../components/common-modal';
import { getCommonFields } from './common-data';

const Edit = () => {

    let defaultObj = { file_name: ''};

    return (
        <>
            <CommonModel   // this file create copy from common-form-with-list and Datatable componet Remove from Comman Model componete
                formDataAction={getCommonFields}
                columns={config.PROJECT_FILE}
                // insertApi="clients"
                // updateApi={`project-files/${id}`}
                // getApi="clients"
                title="Edit"
                defaultObj={defaultObj}
                // tableTitle='client'
            />
        </>
    );
};

export default Edit;