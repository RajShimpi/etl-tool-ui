import React from 'react';
import CommonFormWithList from '../components/common-form-with-list';
import config from "../components/config/config.json"
import { getProjectFields } from './project-data';

const Project = () => {
    // const [formData, setFormData] = useState({
    //     id: null,
    //     project_name:'',
    //     client_id:'',
    //     base_location:'',
    // });

    let defaultObj = {project_name:'',client_id:'',base_location:'', active: true };

    return (
        <>
            <CommonFormWithList
                formDataAction={getProjectFields}
                columns={config.PROJECT}
                insertApi="projects"
                updateApi="projects/:id"
                getApi="projects"
                title="Project"
                defaultObj={defaultObj}
                tableTitle='projects'
            />
        </>
    );
};

export default Project;
