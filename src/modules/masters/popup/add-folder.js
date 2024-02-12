import React from 'react';
import config from "../../components/config/config.json"
import CommonModel from '../../components/common-modal';
import { getCommonFields } from './common-data';

const Folder = ({ project_id, id }) => {

    let defaultObj = { file_name: '', project_id: project_id, type: 'Folder', parent_id: id === 0 ? null : id };

    return (
        <>
            <CommonModel   // this file create copy from common-form-with-list and Datatable componet Remove from Comman Model componete
                formDataAction={getCommonFields}
                columns={config.PROJECT_FILE}
                insertApi="project-files"
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
