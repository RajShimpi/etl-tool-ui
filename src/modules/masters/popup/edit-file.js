import React from 'react';
import config from "../../components/config/config.json"
import CommonModel from '../../components/common-modal';
import { getCommonFields } from './common-data';

const Edit = ({ project_id, id }) => {

    let defaultObj = { file_name: '', project_id: project_id, type: 'File', parent_id: id };

    return (
        <>
            <CommonModel   // this file create copy from common-form-with-list and Datatable componet Remove from Comman Model componete
                formDataAction={getCommonFields}
                columns={config.PROJECT_FILE}
                // insertApi="clients"
                updateApi={`project-files/${id}`}
                // getApi="clients"
                title="Edit"
                defaultObj={defaultObj}
            // tableTitle='client'
            />
        </>
    );
};

export default Edit;