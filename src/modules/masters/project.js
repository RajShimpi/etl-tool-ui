import React, { useState, useEffect } from 'react';
import CommonFormWithList from '../components/common-form-with-list';
import config from "../components/config/config.json";
import { getProjectFields } from './project-data';
import axios from '../services/axios';
import auth from '../user/auth';

const Project = () => {
  
  const clientid = auth.getStorageData("client");

  const [clientId, setClientId] = useState();
  const [client, setClient] = useState([])

  useEffect(() => {
    axios.getWithCallback('clients/', (data) => setClient(data.map(x => { return { label: x.name, value: x.id } })))
  }, [])

  useEffect(() => {
    axios.getWithCallback(`clients/client/${clientid.client_id}`, (data) => {
      const clientData = { id: data.id };
      setClientId(clientData.id);
    });
  }, [clientid]);

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
          options={[client]}
          tableTitle="Projects"
        />
      )}
    </>
  );
};

export default Project;
