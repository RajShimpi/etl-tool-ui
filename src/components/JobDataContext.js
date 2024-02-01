import { createContext, useContext, useState } from "react";

const JobDataContext = createContext();
const ClientIdContext = createContext();
const ProjectIdContext = createContext();
const ProjectContext = createContext();
const ProjectIDContext = createContext();

export const JobDataProvider = ({ children }) => {
  const [jobDataId, setJobDataId] = useState(null);

  const setJobDataIdValue = (id) => {
    setJobDataId(id);
  };

  return (
    <JobDataContext.Provider value={{ jobDataId, setJobDataId: setJobDataIdValue }}>
      {children}
    </JobDataContext.Provider>
  );
};

export const useJobData = () => {
  const context = useContext(JobDataContext);
  if (!context) {
    throw new Error("useJobData must be used within a JobDataProvider");
  }
  return context;
};

export const ClientIdProvider = ({ children }) => {
  const [clientId, setClientId] = useState(null);

  const setClientIdValue = (client_id) => {
    setClientId(client_id);
  };

  return (
    <ClientIdContext.Provider value={{ clientId, setClientId: setClientIdValue }}>
      {children}
    </ClientIdContext.Provider>
  );
};

export const useClientId = () => {
  const context = useContext(ClientIdContext);
  if (!context) {
    throw new Error("useJobData must be used within a JobDataProvider");
  }
  return context;
};
export const ProjectIdProvider = ({ children }) => {
  const [projectId, setProjectId] = useState(null);

  const setProjectIdValue = (Project_id) => {
    setProjectId(Project_id);
  };

  return (
    <ProjectIdContext.Provider value={{ projectId, setProjectId: setProjectIdValue }}>
      {children}
    </ProjectIdContext.Provider>
  );
};

export const useProjectId = () => {
  const context = useContext(ProjectIdContext);
  if (!context) {
    throw new Error("useProjectId must be used within a JobDataProvider");
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const [project_Id, setProject_Id] = useState(null);

  const setProjectValue = (id) => {
    setProject_Id(id);
  };

  return (
    <ProjectContext.Provider value={{ project_Id, setProject_Id: setProjectValue }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectId must be used within a JobDataProvider");
  }
  return context;
};

export const ProjectidProvider = ({ children }) => {
  const [projectID, setProjectID] = useState(null);

  const setProjectIDValue = (id) => {
    setProjectID(id);
  };

  return (
    <ProjectIDContext.Provider value={{ projectID, setProjectID: setProjectIDValue }}>
      {children}
    </ProjectIDContext.Provider>
  );
};

export const useProjectid = () => {
  const context = useContext(ProjectIDContext);
  if (!context) {
    throw new Error("useProjectId must be used within a JobDataProvider");
  }
  return context;
};
