import React from 'react';
import CommonFormWithList from '../components/common-form-with-list';
import config from "../components/config/config.json"
import { getProjectFileFields } from './project-file-data';

const ProjectFile = () => {
    // const [formData, setFormData] = useState({
    //     id: null,
    //     project_id:'',
    //     type:'',
    //     file_name:'',
    //     parent_id:'',
    // });

    let defaultObj = {project_id:'',type:'',file_name:'',parent_id:'', active: true };

    return (
        <>
            <CommonFormWithList
                formDataAction={getProjectFileFields}
                columns={config.PROJECT_FILE}
                insertApi="project-files"
                updateApi="project-files/:id"
                getApi="project-files"
                title="Project-File"
                defaultObj={defaultObj}
                tableTitle='Project-File'
            />
        </>
    );
};

export default ProjectFile;
