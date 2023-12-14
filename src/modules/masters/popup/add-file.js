import React from 'react';
import config from "../../components/config/config.json"
import CommonModel from '../../components/common-modal';
import { getFileFields } from './add-file-data';

const AddFile = ({ project_id, id }) => {
    let defaultObj = { file_name: '', project_id: project_id, type: 'File', parent_id: id };

    return (
        <>
            <CommonModel
                formDataAction={getFileFields}
                columns={config.PROJECT_FILE}
                insertApi="project-files"
                title="Add File"
                defaultObj={defaultObj}
            />
        </>
    );
};

export default AddFile;
