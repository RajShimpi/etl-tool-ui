import React, { useState, useEffect } from 'react';
import CommonFormWithList from '../components/common-form-with-list';
import config from "../components/config/config.json";
import { getProjectFields } from './project-data';
import axios from '../services/axios';
import { useProjectId } from '../../components/JobDataContext';

const Project = () => {
  const storedClientId = localStorage.getItem('clientId');
  // const storedrPojectId = localStorage.getItem('projectId');
  const [clientId, setClientId] = useState();
  const [project, setProject] = useState([]);
// const{setProjectId}=useProjectId()
  useEffect(() => {
    axios.getWithCallback(`clients/client/${storedClientId}`, (data) => {
      const clientData = { id: data.id };
      setClientId(clientData.id);
      // setProjectId(storedrPojectId);
    });
  }, [storedClientId]);

  useEffect(() => {
    if (clientId) {
      axios.getWithCallback(`projects/client/${clientId}`, (projectsData) => {
        setProject(projectsData);
      });
    }
  }, [clientId]);

  console.log("clientId:", clientId);
  console.log("projects:", project);

  useEffect(() => {
    if (clientId) {
      localStorage.setItem('client_Id', clientId);
    }
  }, [clientId]);
  let defaultObj = { project_name: '', client_id: '', base_location: '', active: true };

  return (
    <>
  {clientId !== undefined && (
    <CommonFormWithList
      formDataAction={getProjectFields}
      columns={config.PROJECT}
      insertApi="projects/"
      updateApi="projects/:id"
      getApi={`projects/client/${clientId}`}
      title="Project"
      defaultObj={defaultObj}
      options={[project]}
      tableTitle="Projects"
    />
  )}
</>

  );
};

export default Project;
