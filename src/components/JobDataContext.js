import { createContext, useContext, useState } from "react";

const JobDataContext = createContext();
const ClientIdContext = createContext();
const ProjectIDContext = createContext();
const DashboardMetabaseDataContext = createContext();
const DashboardIdContext = createContext();

export const JobDataProvider = ({ children }) => {
  const [jobDataId, setJobDataId] = useState(null);
  const [jobFolder, setJobFolder] = useState(null);

  const setJobDataIdValue = (id) => {
    setJobDataId(id);
  };
  const setJobFolderValue = (data) => {
    setJobFolder(data);
  };

  return (
    <JobDataContext.Provider value={{ jobDataId,jobFolder, setJobDataId: setJobDataIdValue ,setJobFolder:setJobFolderValue}}>
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
    throw new Error("useClientId must be used within a JobDataProvider");
  }
  return context;
};

export const ProjectidProvider = ({ children }) => {
  const [projectid, setProjectid] = useState(null);

  const setProjectIDValue = (id) => {
    setProjectid(id);
  };

  return (
    <ProjectIDContext.Provider value={{ projectid, setProjectid: setProjectIDValue }}>
      {children}
    </ProjectIDContext.Provider>
  );
};

export const useProjectid = () => {
  const context = useContext(ProjectIDContext);
  if (!context) {
    throw new Error("useProjectid must be used within a JobDataProvider");
  }
  return context;
};

export const DashboardMetabaseDataProvider = ({ children }) => {
  const [metabaseData, setMetabaseData] = useState(null);

  const setMetabaseDataValue = (data) => {
    setMetabaseData(data);
  };

  return (
    <DashboardMetabaseDataContext.Provider value={{ metabaseData, setMetabaseData: setMetabaseDataValue }}>
      {children}
    </DashboardMetabaseDataContext.Provider>
  );
};

export const useDashboardMetabaseData = () => {
  const context = useContext(DashboardMetabaseDataContext);
  if (!context) {
    throw new Error("Dashboard Metabase Data must be used within a Dashboard Metabase Data");
  }
  return context;
};

export const DashboardIdProvider = ({ children }) => {
  const [dashboadId, setDashboardId] = useState(null);

  const setDashboardIdValue = (id) => {
    setDashboardId(id);
  };

  return (
    <DashboardIdContext.Provider value={{ dashboadId, setDashboardId: setDashboardIdValue }}>
      {children}
    </DashboardIdContext.Provider>
  );
};

export const useDashboardId = () => {
  const context = useContext(DashboardIdContext);
  if (!context) {
    throw new Error("Dashboard Metabase Data must be used within a Dashboard Metabase Data");
  }
  return context;
};
