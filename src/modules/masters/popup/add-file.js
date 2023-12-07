import React from 'react';
import config from "../../components/config/config.json"
import CommonModel from '../../components/common-modal';
import { getFileFields } from './add-file-data';

const AddFile = ({ projectID, parentID }) => {
    let defaultObj = { file_name: '', project_id: projectID, type: 'File', parent_id: parentID };

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
