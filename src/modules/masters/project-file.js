import React, { useEffect, useState } from 'react';
import CommonFormWithList from '../components/common-form-with-list';
import config from "../components/config/config.json"
import { getProjectFileFields } from './project-file-data';
import axios from '../services/axios';

const ProjectFile = () => {

    const [projectId, setProjectId] = useState([]);
    const [parentId, setParentId] = useState([]);

    useEffect(() => {
        axios.getWithCallback('projects/', (data) => setProjectId(data.map(x => ({ value: x.id, label: x.project_name }))))
    }, []);

    useEffect(() => {
        axios.getWithCallback('project-files/', (data) => setParentId(data.map(y => ({ value: y.id, label: y.file_name }))))
    }, []);

    const defaultObj = { project_id: '', type: '', file_name: '', parent_id: null };


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
                options={[projectId, parentId]}
                tableTitle='Project-File'
            />
        </>
    );
};

export default ProjectFile;